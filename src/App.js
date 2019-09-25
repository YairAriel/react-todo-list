import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Todos from './containers/Todos/Todos';
import Completed from './containers/Completed/Completed';
import Navigation from './components/Navigation/Navigation';
import logo from './logo.svg';
import classes from './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faPen);

const app = props => {

    return (
      <div className={classes.App}>
        <header  className={classes.AppHeader}>
          <img src={logo} className={classes.AppLogo} alt="logo" />
          <h1 className={classes.AppTitle}>TODO APP</h1>
          <Navigation />
        </header>
        <Switch>
          <Route path="/completed" component={Completed} />
          <Route path="/" component={Todos} />
        </Switch>
      </div>
    );
}

export default withRouter(app);
