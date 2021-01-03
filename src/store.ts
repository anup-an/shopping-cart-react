import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { AppActions } from './ActionTypes';
import productsReducer from './reducers/productReducers';

export const rootReducer = combineReducers({
    products: productsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

/* const initialState: ActionStates = {
    items: [],
    sort: '',
    size: '',
    sortedItems: [],
    filteredItems: [],
};
 */
const composeEnhancer = composeWithDevTools || compose;
const store = createStore(
    rootReducer,
    /*     initialState,
     */

    composeEnhancer(applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)),
);
export default store;
