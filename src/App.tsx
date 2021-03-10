import React from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header';
import { Router } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

// import Footer from './components/Footer';
import Routers from './components/Router';
import store from './store';

const App = (): JSX.Element => {
    return (
        <Provider store={store}>
            <BrowserRouter>

            <div className="flex flex-col">
                <div className="fixed w-full z-10">
                    <Header />
                </div>
                <div className="mt-16">
                    <Routers />
                </div>
            </div>
            </BrowserRouter>
        </Provider>
    );
};
export default App;
