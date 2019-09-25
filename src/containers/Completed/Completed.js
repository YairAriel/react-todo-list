import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTodos } from '../../store/actions/todos';
import Card from '../../components/UI/Card/Card';
import Spinner from '../../components/UI/Spinner/Spinner';
import API from '../../api'
import classes from './Completed.css';

const completed = props => {
    const allTasks = useSelector(state => state);
    const completedTodos = {};

    for (let task in allTasks) {
        if (allTasks[task].completed) {
            completedTodos[task] = allTasks[task];
        }
    }

    const [editedId, setEditedId] = useState(null);
    const [removeAll, setRemoveAll] = useState(false);

    const dispatch = useDispatch();
    const onUnchangeTodos = todos => dispatch(setTodos(todos));

    const uncheckTodo = itemId => {
        setEditedId(itemId);
        const list = {...allTasks};
        const updatedTodo = list[itemId];
        updatedTodo.completed = false;
        list[itemId] = updatedTodo;

        API.put('/todos/' + itemId + '.json', updatedTodo)
        .then(response => { 
            onUnchangeTodos(list);
            setEditedId(null);
        });
    }

    const uncheckTodoHandler = (itemId) => {
        uncheckTodo(itemId);
    }

    const goToTasksHandler = () => {
        props.history.push('/');
    }

    const uncompleteAllHandler = () => {
        setRemoveAll(true);
        const allTasksUpdated = {...allTasks};
        for (let task in allTasksUpdated) {
            allTasksUpdated[task].completed = false;
        }
        API.put('/todos.json', allTasksUpdated)
        .then(response => { 
            onUnchangeTodos(allTasksUpdated);
            setRemoveAll(false);
        });
    }

    const deleteAllHandler = () => {
        setRemoveAll(true);
        let allTasksUpdated = {...allTasks};
        for (let task in allTasksUpdated) {
            if(allTasksUpdated[task].completed) {
                delete allTasksUpdated[task];
            }
        }

        API.put('/todos.json', allTasksUpdated)
        .then(response => { 
            onUnchangeTodos(allTasksUpdated);
            setRemoveAll(false);
        });
    }

    const completed = [];

    for (let todo in completedTodos) {
        completed.push(
            <Card key={todo} comp>
                {editedId === todo || removeAll ? <Spinner /> : null}
                <p onClick={() => uncheckTodoHandler(todo)} style={{margin: '0'}}>{completedTodos[todo].task}</p>
            </Card>)
    }

    let content = <p className={classes.Plain}>Let's complete some <span onClick={goToTasksHandler}>tasks!</span></p>
    if (!(Object.entries(completedTodos).length === 0 && completedTodos.constructor === Object)) {
        content = (<div>
            <p className={classes.Plain}>Tap any task to make it uncompleted. <span onClick={uncompleteAllHandler}>Uncomplete all</span></p>
            <p className={[classes.Plain, classes.Delete].join(' ')} onClick={deleteAllHandler}>Delete all completed tasks</p>
            {completed}
        </div>);
    }

    return (
        <div className={classes.Completed}>
           {content}
        </div>
    )
}

export default completed;