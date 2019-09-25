import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos } from '../../store/actions/todos';
import TodoItem from '../../components/TodoItem/TodoItem';
import Input from '../../components/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import classes from './Todos.css';
import API from '../../api';

const todos = props => {
    const [loading, setLoading] = useState(false);
    const [idToUpdate, setIdToUpdate] = useState(null);
    const [error, setError] = useState(null);

    const allTodos = useSelector(state => state);

    const dispatch = useDispatch();

    const onTodosLoaded = todos => dispatch(setTodos(todos));

    useEffect(() => {
        setLoading(true);
        setError(null);
        API.get('/todos.json')
        .then(response => {
            // console.log(response.data);
            // const fetchedTodos = [];
            // for (let todo in response.data) {
            //     fetchedTodos.push({[todo]: {...response.data[todo]}});
            // }
            onTodosLoaded(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }, []);

    const itemAddedHandler = itemText => {
        const newTodo = {
            task: itemText,
            completed: false
        }
        API.post('/todos.json', newTodo)
        .then(res => {
            const updatedTodos = {...allTodos};
            updatedTodos[res.data.name] = newTodo;
            onTodosLoaded(updatedTodos);
        })
        .catch(error => setError(error.message));
    }

    const toggleItemHandler = itemId => {
        setIdToUpdate(itemId);
        const updatedTodos = {...allTodos};
        const todoToUpdate = updatedTodos[itemId];
        todoToUpdate.completed = !todoToUpdate.completed;
        updatedTodos[itemId] = todoToUpdate;
        
        API.put('/todos/' + itemId + '.json', todoToUpdate)
        .then(response => updateTodos(updatedTodos))
        .catch(error => showError(error.message));
    }

    const changeTaskNameHandler = (itemId, newValue) => {
        setIdToUpdate(itemId);
        const updatedTodos = {...allTodos};
        const todoToUpdate = updatedTodos[itemId];
        todoToUpdate.task = newValue;
        updatedTodos[itemId] = todoToUpdate;
        API.put('/todos/' + itemId + '.json', todoToUpdate)
        .then(response => updateTodos(updatedTodos))
        .catch(error => showError(error.message));
    }

    const deleteItemHandler = itemId => {
        setIdToUpdate(itemId);
        const updatedTodos = {...allTodos};
        delete updatedTodos[itemId];
        API.delete('/todos/' + itemId + '.json')
        .then(response => updateTodos(updatedTodos))
        .catch(error => showError(error.message));
    }

    const showError = msg => {
        setError(msg);
        setIdToUpdate(null);
    }

    const updateTodos = updatedTodos => {
        onTodosLoaded(updatedTodos);
        setIdToUpdate(null);
    }

    const modalClosedHandler = () => {
        setError(null);
    }

    let todoList = [];
    for (let todo in allTodos) {
        todoList.push(<TodoItem 
            key={todo} 
            task={allTodos[todo].task} 
            completed={allTodos[todo].completed}
            isLoading={idToUpdate === todo}
            onToggleItem={() => toggleItemHandler(todo)}
            onSubmitNewValue={(newValue) => changeTaskNameHandler(todo, newValue)}
            onDeleteItem={() => deleteItemHandler(todo)} />);
    }


    return (
        <div className={classes.Todos}>
            <Input onItemAdded={(text) => itemAddedHandler(text)} />
            {loading ? <Spinner large /> : <div>{todoList}</div>}
            <Modal show={error} modalClosed={modalClosedHandler}>{error}</Modal>
        </div>
    );
}

export default todos;