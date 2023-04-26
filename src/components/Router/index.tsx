import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Body from '../Body';
import Login from '../Header/login';
import Register from '../Header/register';
import CartPage from '../CartPage';
import Error from './Error';
import Profile from '../Profile';
import Address from '../Profile/Address';
import Details from '../Profile/Details';
import Orders from '../Profile/Orders';
import Header from '../Header';
import Footer from '../Footer';
import ProductsPage from '../../views/ProductsPage';
import LoginPage from '../../views/LoginPage';

const Routers = () => {
    return (
        <Switch>
            <Route exact path="/">
                <div className="fixed w-full z-10">
                    <Header focus="home" />
                </div>
                <ProductsPage />
                <div className="fixed bottom-0 lg:hidden w-full">
                    <Footer focus="" />
                </div>
            </Route>
            <Route path="/search">
                <div className="fixed w-full z-10">
                    <Header focus="home" />
                </div>
                <Body />
                <div className="fixed bottom-0 lg:hidden w-full">
                    <Footer focus="" />
                </div>
            </Route>
            <Route exact path="/user">
                <div className="fixed w-full z-10">
                    <Header focus="" />
                </div>
                <Body />
                <div className="fixed bottom-0 lg:hidden w-full">
                    <Footer focus="" />
                </div>
            </Route>
            <Route path="/user/profile">
                <div className="fixed w-full z-10">
                    <Header focus="profile" />
                </div>
                <div className="flex flex-col lg:flex-row lg:mt-20 mt-24">
                    <div className="lg:w-1/3 flex justify-center mx-10">
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <Profile focus="details" />
                        </div>
                    </div>
                    <div className="mt-10 lg:mt-20 lg:w-full mx-10">
                        <Details />
                    </div>
                </div>
                <div className="fixed bottom-0 lg:hidden w-full">
                    <Footer focus="" />
                </div>
            </Route>
            <Route path="/user/address">
                <div className="fixed w-full z-10">
                    <Header focus="profile" />
                </div>
                <div className="flex flex-col lg:flex-row lg:mt-20 mt-24">
                    <div className="lg:w-1/3 flex justify-center mx-10">
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <Profile focus="address" />
                        </div>
                    </div>
                    <div className="mt-10 lg:mt-20 lg:w-full mx-10">
                        <Address />
                    </div>
                </div>
                <div className="fixed bottom-0 lg:hidden w-full">
                    <Footer focus="" />
                </div>
            </Route>
            <Route path="/user/orders">
                <div className="fixed w-full z-10">
                    <Header focus="profile" />
                </div>
                <div className="flex flex-col lg:flex-row lg:mt-20 mt-24">
                    <div className="lg:w-1/3 flex justify-center mx-10">
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <Profile focus="orders" />
                        </div>
                    </div>
                    <div className="mt-10 lg:mt-20 lg:w-full mx-10">
                        <Orders />
                    </div>
                </div>
                <div className="fixed bottom-0 lg:hidden w-full">
                    <Footer focus="" />
                </div>
            </Route>
            <Route path="/login">
                <div className="h-screen">
                    <div className="fixed w-full z-10">
                        <Header focus="login" />
                    </div>
                    <LoginPage />
                    <div className="fixed bottom-0 lg:hidden w-full">
                        <Footer focus="login" />
                    </div>
                </div>
            </Route>
            <Route path="/register">
                <div className="h-screen">
                    <div className="fixed w-full z-10">
                        <Header focus="register" />
                    </div>
                    <Register />
                    <div className="fixed bottom-0 lg:hidden w-full">
                        <Footer focus="register" />
                    </div>
                </div>
            </Route>
            <Route path="/cart">
                <div className="fixed w-full z-10">
                    <Header focus="cart" />
                </div>
                <CartPage />
                <div className="fixed bottom-0 lg:hidden w-full">
                    <Footer focus="" />
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
