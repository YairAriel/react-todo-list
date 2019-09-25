import * as actionTypes from './actionTypes';

export const setTodos = todosList => {
    return {type: actionTypes.SET_TODOS, fetchedTodos: todosList}
}

export const toggleTodo = itemId => {
    return {type: actionTypes.TOGGLE_TODO, itemId: itemId}
}