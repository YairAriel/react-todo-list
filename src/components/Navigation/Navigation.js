import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './Navigation.css';

const navigation = props => {
    return (
        <ul className={classes.NavigationList}>
            <NavigationItem link="/" exact>HOME</NavigationItem>
            <NavigationItem link="/completed">COMPLETED</NavigationItem>
        </ul>
    )
}

export default navigation;