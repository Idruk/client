import React, { useState } from "react";

import {Redirect, } from "react-router-dom";
import { useQuery , useMutation} from "@apollo/client";
import {GET_TODO_LIST} from './../gql/query/query'
import {UPDATE_TODO_STATUS_BY_ID} from './../gql/mutation/mutation'

import { css } from '@emotion/css'


function DisplayTodo() {

    const Ordering = {
        DATE_DESC: 'DATE_DESC',
        DATE_ASC: 'DATE_ASC'
    }

    const [todoList, setTodoList] = useState([])
    const [goToDetails, setGoToDetails] = useState(false)
    const [detailId, setDetailId] = useState()

    const [isFiltered, setIsfiltered] = useState(false)
    const [creationFilter, setCreationFilter] = useState('DATE_DESC')
    const [typeFilter, setTypeFilter] = useState('RH')
    const [isDoneFilter, setIsDoneFilter] = useState('true')
    const [filteredTodo, setFilteredTodo] = useState()

    const {loading, data } = useQuery(GET_TODO_LIST, {
		variables: { orderBy: Ordering.DATE_ASC},
		fetchPolicy: "network-only",
            onCompleted(data) {
                setTodoList(data.getTodoList)
                setFilteredTodo(data.getTodoList)
            }
	    });

        const [updateStatus, {loading: mutationLoading, error: mutationError}] = useMutation(UPDATE_TODO_STATUS_BY_ID, {
            onCompleted(data) {
            },
            onError(err) {
                console.log(err)
            }
        })

        function onUpdateStatus(id, isDone, index) {

            const newArray = todoList.map((v, i) => {
                if (i === index) {
                    let ret
                    if (v.isDone === false)
                        ret = true
                    if (v.isDone === true)
                        ret = false
                    var newNode = {
                        id: v.id,
                        createdAt: v.createdAt,
                        type: v.type,
                        isDone: ret,
                        text: v.text,
                        title: v.title
                    }
                    return newNode;
                }
                return v;
              });
            setTodoList(newArray)
            updateStatus({variables: { id: id, isDone: isDone}})
        }
    

    function goToTodoDetails() {
        return (
            <Redirect
                to={{
                    pathname: "/detail/" + detailId,
                    state: {id: detailId},

                }}
            />
        )
    }

    function todoCardDisplay(title, date, type, id, isDone, index) {
        return (
            <div className={css`
                border: solid;
                width: 40%;
                margin: 16px;
            `} key={id}
            
            >

                <h4>{title} 
                    <div>
                        done:
                        <input type="checkbox" checked={todoList[index].isDone} onChange={() => {onUpdateStatus(id, !isDone, index)}}></input>
                        
                    </div>
                </h4>
                <div>
                    <p>{date}</p>
                </div>
                <div>{type}</div>
                <button onClick={()=> {setDetailId(id); setGoToDetails(true)}}>Details</button>
            </div>
        )
    }

    function onFilter(isF) {
        setIsfiltered(isF)
        console.log(creationFilter , typeFilter , isDoneFilter)
    }

    function fullfilter() {

        let finalList = todoList
        let donefilter = false
        if (isDoneFilter === 'false')
            donefilter = false
        if (isDoneFilter === 'true')
            donefilter = true
        console.log(donefilter)
        setFilteredTodo(
            finalList.filter(todo => todo.isDone === donefilter).map((elem) => {
                return(elem)
            }).filter(todo => todo.type === typeFilter).map((elem) => {
                return(elem)
            })
        )
        console.log(filteredTodo)
    }

    if (goToDetails)
        return (
            goToTodoDetails()
        )
    if (todoList)
        return (
            <div>
                <div>
                    <p>filters: </p>
                <select 
                    value={creationFilter}
                    onChange={(e) => { setCreationFilter(e.target.value);}} 
                >
                    <option value="DATE_DESC">Dessending Order</option>
                    <option value="DATE_ASC">Assending Order</option>
                </select>

                <select 
                    value={typeFilter}
                    onChange={(e) => { setTypeFilter(e.target.value); }} 
                >
                    <option value="RH">RH</option>
                    <option value="Tech">Tech</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Communication">Communication</option>
                </select>

                <select 
                    value={isDoneFilter}
                    onChange={(e) => { setIsDoneFilter(e.target.value); }} 
                >
                    <option value='true'>Is Done</option>
                    <option value='false'>Is Not Done</option>
                </select>

                <button onClick={() => {onFilter(true); fullfilter()}}>Filter</button>
                <button onClick={() => onFilter(false)}>Reset Filter</button>
                </div>
                {
                    isFiltered ?
                    filteredTodo.map((elem, index) => {
                        return(
                            todoCardDisplay(
                                elem.title,
                                elem.createdAt,
                                elem.type,
                                elem.id,
                                elem.isDone,
                                index
                            )
                        )
                    })
                    :
                    todoList.map((elem, index) => {
                        return(
                            todoCardDisplay(
                                elem.title,
                                elem.createdAt,
                                elem.type,
                                elem.id,
                                elem.isDone,
                                index
                            )
                        )
                    })
                    
                }
            </div>
        )
    else
        return(
            <div>Loading</div>
        )
}

export default DisplayTodo;