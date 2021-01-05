import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import cartReducer from './reducers/cartReducers';
import productsReducer from './reducers/productReducers';

export const rootReducer = combineReducers({
    products: productsReducer,
    cartProducts: cartReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const composeEnhancer = composeWithDevTools || compose;
const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk)),
);
export default store;
