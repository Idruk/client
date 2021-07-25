import { gql } from "@apollo/client";

const GET_TODO_LIST = gql `
    query getTodoList ($orderBy: Ordering, $filters: TodoFiltersInput) {
        getTodoList(orderBy: $orderBy, filters: $filters) {
            id
            createdAt
            type
            isDone
            text
            title
        }
    }
`
// getTodoById
const GET_TODO_BY_ID = gql `
    query getTodoById($id: ID!) {
        getTodoById(id: $id) {
            id
            createdAt
            type
            isDone
            text
            title
        }
    }
`
export {
    GET_TODO_LIST,
    GET_TODO_BY_ID
}