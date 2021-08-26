import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Body from '../Body';
import Login from '../Header/login';
import Register from '../Header/register';
import CartPage from '../CartPage'

const Routers = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Body />
            </Route>
            <Route path="/search">
                <Body />
            </Route>
            <Route path="/user">
                <Body />
            </Route>
            <Route path="/login">
                <div className="flex justify-center items-center">
                    <Login />
                </div>
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/cart">
                <CartPage />
            </Route>
            <Route>
                <div>
                    Error 404. Page not found.
                </div>
            </Route>
        </Switch>
    );
};

export default Routers;
