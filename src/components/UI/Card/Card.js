import React from 'react';
import classes from './Card.css';

const card = props => {
    return (
        <div className={props.comp ? [classes.Card, classes.CompletedCard].join(' ') : classes.Card} onClick={props.clicked}>
            {props.children}
        </div>
    )
}

export default card;