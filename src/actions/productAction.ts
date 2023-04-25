import { Dispatch } from 'redux';

import { FILTER_PRODUCTS, SORT_PRODUCTS, IProduct, SEARCH_PRODUCTS } from '../types/products/ActionTypes';
import { AppActions, SortState } from '../types/common';

export const filterProducts =
    (filterObj: { [x: string]: any }) =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        dispatch({
            type: FILTER_PRODUCTS,
            payload: {
                filter: filterObj,
            },
        });
    };

export const sortProducts =
    (sortObject: SortState<IProduct>) =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        console.log(sortObject);
        dispatch({
            type: SORT_PRODUCTS,
            payload: {
                sort: sortObject,
            },
        });
    };

export const searchProducts =
    (searchObj: { [x: string]: any }) =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        dispatch({
            type: SEARCH_PRODUCTS,
            payload: {
                search: searchObj,
            },
        });
    };
