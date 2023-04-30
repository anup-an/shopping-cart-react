import {
    EDIT_PROFILE_USER,
    GET_ORDERS,
    GET_USER_FROM_TOKEN,
    ADD_TO_WISHLIST_USER,
    IUser,
    IOrder,
    UserActionTypes,
    LOG_IN_USER,
    UPDATE_LOGGED_USER_CART,
} from '../ActionTypes';
type IUserActionStates = {
    user: IUser;
    orders: IOrder[];
};

export const guestUser = {
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

const userDefaultState: IUserActionStates = {
    orders: [],
    user: guestUser,
};

const userReducer = (state = userDefaultState, action: UserActionTypes): IUserActionStates => {
    switch (action.type) {
        case LOG_IN_USER:
            return { ...state, user: { ...action.payload.user } };
        case GET_USER_FROM_TOKEN:
            return { ...state, user: { ...action.payload.user } };
        case UPDATE_LOGGED_USER_CART:
            return { ...state, user: { ...action.payload.user } };
        case ADD_TO_WISHLIST_USER:
            return { ...state, user: { ...action.payload.user } };
        case EDIT_PROFILE_USER:
            return { ...state, user: { ...action.payload.user } };
        case GET_ORDERS:
            return { ...state, orders: [...action.payload.orders] };
        default:
            return { ...state };
    }
};
export default userReducer;
