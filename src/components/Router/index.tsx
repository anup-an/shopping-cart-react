import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Body from '../Body';
import Login from '../Header/login';
import Register from '../Header/register';
import CartPage from '../CartPage'
import Error from './Error';
import Profile from '../Profile';
import Address from '../Profile/Address';
import Details from '../Profile/Details';
import Orders from '../Profile/Orders';
import Header from '../Header';
import Footer from '../Footer';

const Routers = () => {
    return (
        <Switch>
            <Route exact path="/">
                <div className="fixed w-full z-10">
                    <Header focus="home"/>
                </div>
                <Body />
                <div className="fixed bottom-0 lg:hidden w-full">
                    <Footer focus=""/>
                </div>
            </Route>
            <Route path="/search">
                <div className="fixed w-full z-10">
                    <Header focus="home"/>
                </div>
                <Body />
                <div className="fixed bottom-0 lg:hidden w-full">
                    <Footer focus=""/>
                </div>
            </Route>
            <Route exact path="/user">
                <div className="fixed w-full z-10">
                    <Header focus=""/>
                </div>
                <Body />
                <div className="fixed bottom-0 lg:hidden w-full">
                    <Footer focus=""/>
                </div>
            </Route>
            <Route path="/user/profile">
                <div className="fixed w-full z-10">
                    <Header focus="profile"/>
                </div>
                <div className="flex flex-row items-start mt-20">
                    <div className="w-1/3 flex justify-center">
                        <div className="w-1/2">
                            <Profile focus="details"/>
                        </div>
                    </div>
                    <div className="mt-20 w-full mx-10">
                        <Details />
                    </div>
                </div>
                <div className="fixed bottom-0 lg:hidden w-full">
                    <Footer focus=""/>
                </div>
            </Route>
            <Route path="/user/address">
                <div className="fixed w-full z-10">
                    <Header focus="profile"/>
                </div>
                <div className="flex flex-row items-start mt-20">
                    <div className="w-1/3 flex justify-center">
                        <div className="w-1/2">
                            <Profile focus="address"/>
                        </div>
                    </div>
                    <div className="mt-20 w-full mx-10">
                        <Address />
                    </div>
                </div>
                <div className="fixed bottom-0 lg:hidden w-full">
                    <Footer focus=""/>
                </div>
            </Route>
            <Route path="/user/orders">
                <div className="fixed w-full z-10">
                    <Header focus="profile"/>
                </div>
                <div className="flex flex-row items-start mt-20">
                    <div className="w-1/3 flex justify-center">
                        <div className="w-1/2">
                            <Profile focus="orders"/>
                        </div>
                    </div>
                    <div className="mt-20 w-full mx-10">
                        <Orders />
                    </div>
                </div>
                <div className="fixed bottom-0 lg:hidden w-full">
                    <Footer focus=""/>
                </div>
            </Route>
            <Route path="/login">
                <div className="fixed w-full z-10">
                    <Header focus="login" />
                </div>
                <div className="fixed bottom-1/4 w-full">
                    <Login />
                </div>
                <div className="fixed bottom-0 lg:hidden w-full">
                    <Footer focus="login"/>
                </div>
            </Route>
            <Route path="/register">
                <div className="fixed w-full z-10">
                    <Header focus="register"/>
                </div>
                <div className="fixed bottom-1/4 w-full">
                    <Register />
                </div>
                <div className="fixed bottom-0 lg:hidden w-full">
                    <Footer focus="register"/>
                </div>
            </Route>
            <Route path="/cart">
                <div className="fixed w-full z-10">
                    <Header focus="cart"/>
                </div>
                <CartPage />
                <div className="fixed bottom-0 lg:hidden w-full">
                    <Footer focus=""/>
                </div>
            </Route>
            <Route>
                <div className="fixed top-1/3 w-full">
                    <Error />
                </div>
            </Route>
        </Switch>
    );
};

export default Routers;
