import React from 'react';
import { Provider } from 'react-redux';
import Body from './components/Body';
// import Footer from './components/Footer';
import Header from './components/Header';
import store from './store';

const App = (): JSX.Element => {
    return (
        <Provider store={store}>
            <div className="flex flex-col">
                <div>
                    <Header />
                </div>
                <div>
                    <Body />
                </div>
            </div>
        </Provider>
    );
};
export default App;
