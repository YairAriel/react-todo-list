import * as actionTypes from '../actions/actionTypes';

const initialState = {};

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TODOS:
            return state = action.fetchedTodos;
        case actionTypes.TOGGLE_TODO: 
            const updatedState = [...state];
            updatedState[action.itemId].completed = !updatedState[action.itemId].completed;
            return state = updatedState;
        default: 
            return state;
    }
}

export default todosReducer;