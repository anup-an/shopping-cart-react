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

export const filterProducts = (size: string, products: IProduct[]) => async (
    dispatch: Dispatch<AppActions>,
): Promise<void> => {
    dispatch({
        type: FILTER_PRODUCTS_SIZE,
        payload: {
            size,
            items:
                size === 'ALL'
                    ? products
                    : products.filter((product) => product.availableSizes.find((e) => e === size)),
        },
    });
};

export const sortProducts = (sort: string, products: IProduct[]) => async (
    dispatch: Dispatch<AppActions>,
): Promise<void> => {
    const arrangeProducts = (condition: string, array: IProduct[]) => {
        if (condition === 'Lowest') {
            return [...array].slice().sort((a, b) => (a.price > b.price ? 1 : -1));
        }
        if (condition === 'Highest') {
            return [...array].slice().sort((a, b) => (a.price < b.price ? 1 : -1));
        }
        if (condition === 'Newest') {
            return [...array].slice().sort((a, b) => (a._id > b._id ? 1 : -1));
        }
        return products;
    };
    dispatch({
        type: SORT_PRODUCTS_PRICE,
        payload: {
            sort,
            items: arrangeProducts(sort, products),
        },
    });
};
