import React, { useState } from "react";

import { useQuery } from "@apollo/client";

import { css } from '@emotion/css'

import {GET_TODO_BY_ID} from './../gql/query/query'
import {Redirect, } from "react-router-dom";

function TodoDetails(props) {
    
    const [todo, setTodo] = useState()

    const {loading, data } = useQuery(GET_TODO_BY_ID, {
		variables: { id: props.location.state ? props.location.state.id : 0},
		fetchPolicy: "network-only",
            onCompleted(data) {
                console.log(data.getTodoById)
                setTodo(data.getTodoById)
            }
	    });
    if (props.location.state === undefined || !props.location.state.id)
        return (
            <Redirect
                to={{
                    pathname: "/"
                }}
            />
        )

    if (!todo)
        return (
            <div>Loading</div>
        )
    return (
        <div className={css`
                border: solid;
                width: 40%;
                margin: 16px;
            `}
            >
                <h2>{todo.title}
                </h2>
                <h4>{todo.text}</h4>
                <div>
                    <p>Created: {todo.createdAt}</p>
                </div>
                <div>Type: {todo.type}</div>
                {
                    todo.isDone ? <div>Done</div> : <div>Not done</div>
                }
            </div>
    )
}

export default TodoDetails;