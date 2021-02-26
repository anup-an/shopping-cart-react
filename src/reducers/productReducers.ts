/* eslint-disable no-console */
import {
    FETCH_PRODUCTS,
    FILTER_PRODUCTS_SIZE,
    IProduct,
    ProductsActionTypes,
    SORT_PRODUCTS_PRICE,
    SEARCH_PRODUCTS,
} from '../ActionTypes';

export type ActionStates = {
    items: IProduct[];
    sort: string;
    sortedItems: IProduct[];
    filteredItems: IProduct[];
    size: string;
};
const productsDefaultState: ActionStates = {
    items: [],
    sort: 'Newest',
    size: 'ALL',
    sortedItems: [],
    filteredItems: [],
};

const productsReducer = (state = productsDefaultState, action: ProductsActionTypes): ActionStates => {
    console.log(action.type);
    switch (action.type) {
        case FETCH_PRODUCTS:
            return { ...state, items: action.payload.items, filteredItems: action.payload.items };
        case SORT_PRODUCTS_PRICE:
            return {
                ...state,

                sort: action.payload.sort,
                filteredItems: action.payload.items,
            };
        case FILTER_PRODUCTS_SIZE:
            return {
                ...state,
                size: action.payload.size,
                filteredItems: action.payload.items,
            };
        case SEARCH_PRODUCTS:
            return {
                ...state,
                filteredItems: action.payload.items,
            }
        default:
            return state;
    }
};

export default productsReducer;
