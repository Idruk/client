import { gql } from "@apollo/client";

//updateTodoStatusById
const UPDATE_TODO_STATUS_BY_ID = gql `
    mutation updateTodoStatusById($id: ID!, $isDone: Boolean!) {
        updateTodoStatusById(id: $id, isDone: $isDone) {
            id
            isDone
        }
    }
`

export {
    UPDATE_TODO_STATUS_BY_ID
}