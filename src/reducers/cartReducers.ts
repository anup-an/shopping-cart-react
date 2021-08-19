/* eslint-disable no-underscore-dangle */
import { ADD_PRODUCTS_CART, CartActionTypes, ICart, REMOVE_PRODUCTS_CART, REMOVE_CART } from '../ActionTypes';

type ICartActionStates = {
    cartItems: ICart[];
    count: number;
};
const cartDefaultState: ICartActionStates = {
    cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
    count: 0,
};

const cartReducer = (state = cartDefaultState, action: CartActionTypes): ICartActionStates => {
    switch (action.type) {
        case ADD_PRODUCTS_CART:
            return { ...state, cartItems: [ ...action.payload.items ] };
        case REMOVE_PRODUCTS_CART:
            return { ...state, cartItems: [ ...action.payload.items ] };
        case REMOVE_CART:
            return { ...state, cartItems: [ ...action.payload.items ] };
        default:
            return { ...state };
    }
};

export default cartReducer;
