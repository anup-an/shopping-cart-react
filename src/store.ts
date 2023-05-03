import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import cartReducer from './reducers/cartReducers';
import notificationReducer from './reducers/notificationReducer';
import productsReducer from './reducers/productReducers';
import userReducer from './reducers/userReducers';

export const rootReducer = combineReducers({
    products: productsReducer,
    cartProducts: cartReducer,
    user: userReducer,
    notifications: notificationReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const composeEnhancer = composeWithDevTools || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
export default store;
