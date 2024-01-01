import { FilterState, SearchState, SortState } from '../common';

export const SORT_PRODUCTS = 'SORT_PRODUCTS';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const FILTER_PRODUCTS = 'FILTER_PROCUTS';

export type IProduct = {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
};

export type SearchProductsAction = {
    type: typeof SEARCH_PRODUCTS;
    payload: {
        search: SearchState<IProduct> | null;
    };
};

export type FilterProductsAction = {
    type: typeof FILTER_PRODUCTS;
    payload: {
        filter: FilterState<IProduct> | null;
    };
};

export type SortProductsAction = {
    type: typeof SORT_PRODUCTS;
    payload: {
        sort: SortState<IProduct> | null;
    };
};

export type ProductsActionTypes = SearchProductsAction | FilterProductsAction | SortProductsAction;
