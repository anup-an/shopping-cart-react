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
                <div className="w-full flex justify-center items-center mt-20">
                    <Body />
                </div>
            </Route>
            <Route path="/search">
                <div className="w-full flex justify-center items-center mt-20">
                    <Body />
                </div>
            </Route>
            <Route path="/user">
                <div className="w-full flex justify-center items-center mt-20">
                    <Body />
                </div>
            </Route>
            <Route path="/login">
                <div className="w-full flex justify-center items-center">
                    <Login />
                </div>
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/cart">
                <div className="w-full flex justify-center items-center mt-20">
                    <CartPage />
                </div>
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
