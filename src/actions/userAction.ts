import axios from 'axios';
import { Dispatch } from 'redux';

import {
    AppActions,
    EDIT_PROFILE_USER,
    GET_ORDERS,
    GET_USER_FROM_TOKEN,
    IProduct,
    IUser,
    LOG_IN_USER,
    UPDATE_LOGGED_USER_CART,
} from '../ActionTypes';
import { fetchOrder } from '../api/order';
import { fetchUser, updateUser } from '../api/user';
import { baseUrl } from '../constants';
import { guestUser } from '../reducers/userReducers';
import { extractData, isSuccess } from '../types/mapDataTypes';
import { addProductsToCart, removeProductsFromCart } from './cartAction';
axios.defaults.withCredentials = true;

export type ICart = {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    count: number;
};

const reIssueAccessToken = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/reissue-token`);
        if (response.status === 200) {
            runInLoop();
        }
    } catch (error) {
        console.log(error);
    }
};

const runInLoop = () => {
    setTimeout(() => {
        reIssueAccessToken();
    }, 60000);
};

const dispatchUserAction = (payload: any, actionType: any) => async (dispatch: Dispatch<AppActions>) => {
    const result = await updateUser(payload);
    if (isSuccess(result)) {
        dispatch({
            type: actionType,
            payload: {
                user: extractData(result, 'data', guestUser),
            },
        });
    }
};

const mergeCart = (cart1: ICart[], cart2: ICart[]) => {
    const ids = [...cart1, ...cart2].map((item) => item._id);
    const uniqIds = ids.filter((x, i, a) => a.indexOf(x) === i);
    let mergedCart: ICart[] = [];
    for (let i = 0; i < uniqIds.length; i++) {
        const items = [...cart1, ...cart2].filter((item) => item._id === uniqIds[i]);
        const count = items.map((item) => item.count).reduce((acc, value) => acc + value);
        mergedCart = [...mergedCart, { ...items[0], count: count }];
    }
    return mergedCart;
};

export const logInUser =
    (email: string, password: string, cartItems: ICart[]) =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            console.log('login');
            const response = await axios.post(`${baseUrl}/api/login`, { email, password }, { withCredentials: true });
            const user = response.data.data;
            const updatedUser = cartItems.length ? { ...user, cart: mergeCart(user.cart, cartItems) } : user;
            if (response.status === 200) {
                dispatch({
                    type: LOG_IN_USER,
                    payload: {
                        user: updatedUser,
                    },
                });
                setTimeout(() => {
                    reIssueAccessToken();
                }, 60000);
            }
        } catch (error) {
            console.log(error);
        }
    };

export const logOutUser =
    () =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            const response = await axios.post(`${baseUrl}/api/logout`);
            if (response.status == 200) {
                const user: IUser = {
                    _id: '',
                    email: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    postcode: '',
                    phone: '',
                    city: '',
                    country: '',
                    wishList: [],
                    cart: [],
                };
                dispatch({
                    type: LOG_IN_USER,
                    payload: {
                        user,
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

export const addToUserCart = (loggedUser: IUser, product: IProduct) => async (dispatch: Dispatch<AppActions>) => {
    const cartItems: ICart[] = loggedUser.cart || [];
    const updatedCart = addProductsToCart(cartItems, product);
    const result = await updateUser({ cart: updatedCart });
    if (isSuccess(result)) {
        dispatch({
            type: UPDATE_LOGGED_USER_CART,
            payload: {
                user: extractData(result, 'data', guestUser),
            },
        });
    }
};

export const removeItemsFromUserCart =
    (loggedUser: IUser, product: IProduct) =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            const cartItems: ICart[] = loggedUser.cart || [];
            const updatedCart = removeProductsFromCart(cartItems, product);
            const result = await updateUser({ cart: updatedCart });
            if (isSuccess(result)) {
                dispatch({
                    type: UPDATE_LOGGED_USER_CART,
                    payload: {
                        user: extractData(result, 'data', guestUser),
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

export const removeFromUserCart =
    (loggedUser: IUser, selectedCart: ICart) => async (dispatch: Dispatch<AppActions>) => {
        try {
            const updatedCart = [...loggedUser.cart].filter((item) => item._id !== selectedCart._id);
            const result = await updateUser({ cart: updatedCart });
            if (isSuccess(result)) {
                dispatch({
                    type: UPDATE_LOGGED_USER_CART,
                    payload: {
                        user: extractData(result, 'data', guestUser),
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

export const removeAllFromUserCart = () => async (dispatch: Dispatch<AppActions>) => {
    try {
        const result = await updateUser({ cart: [] });
        if (isSuccess(result)) {
            dispatch({
                type: UPDATE_LOGGED_USER_CART,
                payload: {
                    user: extractData(result, 'data', guestUser),
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const getUserFromToken = () => async (dispatch: Dispatch<AppActions>) => {
    try {
        const result = await fetchUser();
        if (isSuccess(result)) {
            const user = extractData(result, 'data', guestUser);
            dispatch({
                type: GET_USER_FROM_TOKEN,
                payload: {
                    user,
                },
            });
            if (user._id) {
                setTimeout(() => {
                    reIssueAccessToken();
                }, 60000);
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export const editUserProfile = (loggedUser: IUser) => async (dispatch: Dispatch<AppActions>) => {
    try {
        const result = await updateUser(loggedUser);
        if (isSuccess(result)) {
            dispatch({
                type: EDIT_PROFILE_USER,
                payload: {
                    user: extractData(result, 'data', guestUser),
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const getOrdersByUserId = () => async (dispatch: Dispatch<AppActions>) => {
    try {
        const result = await fetchOrder();
        if (isSuccess(result)) {
            dispatch({
                type: GET_ORDERS,
                payload: {
                    orders: extractData(result, 'data', []),
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
};
