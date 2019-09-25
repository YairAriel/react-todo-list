import React, { useState } from 'react';
import Card from '../UI/Card/Card';
import Spinner from '../UI/Spinner/Spinner';
import classes from './TodoItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const todoItem = props => {
    const [edit, setEdit] = useState(false);
    const [newValue, setNewValue] = useState(props.task)

    const submitValue = () => {
        props.onSubmitNewValue(newValue);
        setEdit(false);
    }

    const editValueHandler = (event) => {
        setNewValue(event.target.value);
    }

    const setEditHandler = () => {
        setEdit(!edit);
    }


    const item = !edit ? <span onClick={props.onToggleItem}>{props.task}</span> : 
        (<span>
            <input type="text" className={classes.InlineInput} value={newValue} onChange={(e) => editValueHandler(e)} />
            <button className={classes.InlineButton} onClick={submitValue}>Done</button>
        </span>);

    return (
        <Card>
            {props.isLoading ? <Spinner /> : null}
            <p className={!props.completed ? classes.Text : [classes.Text, classes.Done].join(' ')} >
                {item}
            </p>
            {!edit ? <FontAwesomeIcon icon="pen" className={classes.Edit} onClick={setEditHandler} /> : null}
            <FontAwesomeIcon icon="trash" className={classes.Delete} onClick={props.onDeleteItem} />
        </Card>
    )
}

export default todoItem;