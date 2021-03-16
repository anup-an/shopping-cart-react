import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Body from '../Body';
import Login from '../Header/login';
import Register from '../Header/register';

const Routers = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Body />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/cart">Cart page coming soon...</Route>
        </Switch>
    );
};

export default Routers;
