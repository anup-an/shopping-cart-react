/* eslint-disable no-console */
import { IProduct, SortState, FilterState, SEARCH_PRODUCTS } from '../ActionTypes';
import { SearchState } from '../types/common';
import { FILTER_PRODUCTS, ProductsActionTypes, SORT_PRODUCTS } from '../types/products/ActionTypes';

export type ActionStates = {
    sort: SortState<IProduct> | null;
    search: SearchState<IProduct> | null;
    filter: FilterState<IProduct> | null;
    isLoading: boolean;
};
const productsDefaultState: ActionStates = {
    sort: null,
    filter: null,
    search: null,
    isLoading: true,
};

const productsReducer = (state = productsDefaultState, action: ProductsActionTypes): ActionStates => {
    switch (action.type) {
        case SORT_PRODUCTS:
            return {
                ...state,
                sort: action.payload.sort,
            };
        case FILTER_PRODUCTS:
            return {
                ...state,
                filter: state.filter
                    ? action.payload.filter
                    : { ...(state.filter as unknown as object), ...action.payload.filter },
            };
        case SEARCH_PRODUCTS:
            return {
                ...state,
                search: state.search
                    ? action.payload.search
                    : { ...(state.search as unknown as object), ...action.payload.search },
            };
        default:
            return state;
    }
};

export default productsReducer;
