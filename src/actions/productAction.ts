/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { Dispatch } from 'redux';
import { FETCH_PRODUCTS, AppActions, FILTER_PRODUCTS_SIZE, IProduct, SORT_PRODUCTS_PRICE } from '../ActionTypes';

export const fetchProducts = () => async (dispatch: Dispatch<AppActions>): Promise<void> => {
    await axios.get('/api/products').then((response) => {
        dispatch({
            type: FETCH_PRODUCTS,
            payload: { items: response.data.data },
        });
    });
};

export const filterFunction = (size: string, products: IProduct[]|undefined) => {
    if (products){

        if (size === 'ALL'){
           return products;
        }
        console.log(size);
        return [...products].filter((product) => product.availableSizes.find((e) => e === size));
    }
}

export const sortFunction = (sort: string, products: IProduct[]|undefined) => {
    if (products && sort === 'Lowest') {
        return [...products].slice().sort((a, b) => (a.price > b.price ? 1 : -1));
    }
    if (products && sort === 'Highest') {
        return [...products].slice().sort((a, b) => (a.price < b.price ? 1 : -1));
    }
    if (products && sort === 'Newest') {
        return [...products].slice().sort((a, b) => (a._id > b._id ? 1 : -1));
    }
}

export const filterProducts = (size: string, sort: string, products: IProduct[]|undefined) => async (
    dispatch: Dispatch<AppActions>,
): Promise<void> => {
    const filteredProducts = filterFunction(size,sortFunction(sort, products));
    filteredProducts ?

    dispatch({
        type: FILTER_PRODUCTS_SIZE,
        payload: {
            size,
            items: filteredProducts,
        },
    }): '';
};

export const sortProducts = (sort: string, size: string, products: IProduct[]|undefined) => async (
    dispatch: Dispatch<AppActions>,
): Promise<void> => {
    const sortedProducts = sortFunction(sort, filterFunction(size, products)); 
    sortedProducts ?
    dispatch({
        type: SORT_PRODUCTS_PRICE,
        payload: {
            sort,
            items: sortedProducts,
        },
    }): '';
};
