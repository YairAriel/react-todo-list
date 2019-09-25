import React from 'react';
import classes from './Input.css';

const input = props => {
    let textInput = React.createRef();

    const itemAddedHandler = () => {
        props.onItemAdded(textInput.current.value);
        textInput.current.value = '';
        textInput.current.focus();
    }
    
    return (
        <div className={classes.InputContainer}>
            <input type="text" className={classes.Input} ref={textInput} />
            <button className={classes.GoButton} onClick={itemAddedHandler}>GO!</button>
        </div>
    )
}

export default input;