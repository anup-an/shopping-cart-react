import axios from 'axios';
import { Dispatch } from 'redux';
import { uuid } from 'uuidv4';

import {
    EDIT_PROFILE_USER,
    GET_ORDERS,
    GET_USER_FROM_TOKEN,
    IProduct,
    IUser,
    LOG_IN_USER,
    UPDATE_LOGGED_USER_CART,
} from '../ActionTypes';
import { fetchOrder } from '../api/order';
import { fetchUser, loginUser, logoutUser, reissueToken, updateUser } from '../api/user';
import { guestUser } from '../reducers/userReducers';
import { pickFieldOrDefault, isSuccess, useMapData } from '../types/mapDataTypes';
import { addProductsToCart, removeProductsFromCart } from './cartAction';
import { ApiError } from '../api/axios';
import { DISPLAY_NOTIFICATION } from '../types/notifications/ActionTypes';
import { AppActions } from '../types/common';
import { getErrorMessage } from '../utils';
import { LogInActionPayload } from '../types/user/ActionTypes';
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
        const response = await reissueToken();
        if (isSuccess(response)) {
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
    (payload: LogInActionPayload) =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            const result = await loginUser({ email: payload.email, password: payload.password });
            useMapData(
                result,
                (data) => {
                    const user = data.data;

                    const updatedUser = payload.cartItems.length
                        ? { ...user, cart: mergeCart(user.cart, payload.cartItems) }
                        : user;
                    dispatch({
                        type: LOG_IN_USER,
                        payload: {
                            user: updatedUser,
                        },
                    });
                    setTimeout(() => {
                        reIssueAccessToken();
                    }, 60000);
                },
                (error: ApiError) => {
                    dispatch({
                        type: DISPLAY_NOTIFICATION,
                        payload: {
                            notification: {
                                id: uuid(),
                                title: 'Login failed',
                                description: getErrorMessage(error),
                                type: 'failure',
                            },
                        },
                    });
                },
            );
        } catch (error) {
            console.log(error);
        }
    };

export const logOutUser =
    () =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            const result = await logoutUser();
            useMapData(
                result,
                (data) => {
                    dispatch({
                        type: LOG_IN_USER,
                        payload: {
                            user: guestUser,
                        },
                    });
                    dispatch({
                        type: DISPLAY_NOTIFICATION,
                        payload: {
                            notification: {
                                id: uuid(),
                                title: 'Logout successful',
                                description: 'You have successfully logged out from your account.',
                                type: 'success',
                            },
                        },
                    });
                },
                (error: ApiError) => {
                    dispatch({
                        type: DISPLAY_NOTIFICATION,
                        payload: {
                            notification: {
                                id: uuid(),
                                title: 'Logout failed',
                                description: getErrorMessage(error),
                                type: 'failure',
                            },
                        },
                    });
                },
            );
        } catch (error) {
            console.log(error);
        }
    };

export const addToUserCart = (loggedUser: IUser, product: IProduct) => async (dispatch: Dispatch<AppActions>) => {
    const cartItems: ICart[] = loggedUser.cart || [];
    const updatedCart = addProductsToCart(cartItems, product);
    const result = await updateUser({ cart: updatedCart });
    useMapData(
        result,
        (data) => {
            dispatch({
                type: UPDATE_LOGGED_USER_CART,
                payload: {
                    user: data.data,
                },
            });
        },
        (error: ApiError) => {
            dispatch({
                type: DISPLAY_NOTIFICATION,
                payload: {
                    notification: {
                        id: uuid(),
                        title: 'Cart update failed',
                        description: 'Could not add product to cart. Please try again',
                        type: 'failure',
                    },
                },
            });
        },
    );
};

export const removeItemsFromUserCart =
    (loggedUser: IUser, product: IProduct) =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            const cartItems: ICart[] = loggedUser.cart || [];
            const updatedCart = removeProductsFromCart(cartItems, product);
            const result = await updateUser({ cart: updatedCart });
            useMapData(
                result,
                (data) => {
                    dispatch({
                        type: UPDATE_LOGGED_USER_CART,
                        payload: {
                            user: data.data,
                        },
                    });
                },
                (error) => {
                    dispatch({
                        type: DISPLAY_NOTIFICATION,
                        payload: {
                            notification: {
                                id: uuid(),
                                title: 'Cart update failed',
                                description: 'Could not remove product from cart. Please try again',
                                type: 'failure',
                            },
                        },
                    });
                },
            );
        } catch (error) {
            console.log(error);
        }
    };

export const removeFromUserCart =
    (loggedUser: IUser, selectedCart: ICart) => async (dispatch: Dispatch<AppActions>) => {
        try {
            const updatedCart = [...loggedUser.cart].filter((item) => item._id !== selectedCart._id);
            const result = await updateUser({ cart: updatedCart });
            useMapData(
                result,
                (data) => {
                    dispatch({
                        type: UPDATE_LOGGED_USER_CART,
                        payload: {
                            user: data.data,
                        },
                    });
                },
                (error) => {
                    dispatch({
                        type: DISPLAY_NOTIFICATION,
                        payload: {
                            notification: {
                                id: uuid(),
                                title: 'Cart update failed',
                                description: 'Could not remove product from cart. Please try again',
                                type: 'failure',
                            },
                        },
                    });
                },
            );
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
                    user: pickFieldOrDefault(result, 'data', guestUser),
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
            const user = pickFieldOrDefault(result, 'data', guestUser);
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

export const editUserProfile = (userData: Partial<IUser>) => async (dispatch: Dispatch<AppActions>) => {
    try {
        const result = await updateUser(userData);
        useMapData(
            result,
            (data) => {
                dispatch({
                    type: EDIT_PROFILE_USER,
                    payload: {
                        user: data.data,
                    },
                });
                dispatch({
                    type: DISPLAY_NOTIFICATION,
                    payload: {
                        notification: {
                            id: uuid(),
                            title: 'Profile saved',
                            description: 'Your changes have been successfully saved',
                            type: 'success',
                        },
                    },
                });
            },
            (error) => {
                dispatch({
                    type: DISPLAY_NOTIFICATION,
                    payload: {
                        notification: {
                            id: uuid(),
                            title: 'Failed to update profile',
                            description: getErrorMessage(error),
                            type: 'failure',
                        },
                    },
                });
            },
        );
        if (isSuccess(result)) {
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
                    orders: pickFieldOrDefault(result, 'data', []),
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
};
