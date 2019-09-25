import React from 'react';
import classes from './Spinner.css';

const spinner = props => {
    return (<div 
            className={classes.Loader} 
            style={props.large? {width: '20em', height: '20em', margin: '2em auto'} : null}>
                Loading...
        </div>)
}

export default spinner;