import { EDIT_PROFILE_USER, REMOVE_PRODUCTS_CART_USER, ADD_TO_CART_USER, REMOVE_FROM_CART_USER, GET_USER_FROM_TOKEN, ADD_TO_WISHLIST_USER, IUser, UserActionTypes, LOG_IN_USER } from '../ActionTypes';
type IUserActionStates = {
    user: IUser;
};

const userDefaultState: IUserActionStates = {   
    user : {
    "_id": '',
    "email": '',
    "password": '',
    "firstName": '',
    "lastName": '',
    "address": '',
    "postcode": '',
    "phone": '',
    "city": '',
    "country": '',
    "refreshToken": '',
    "wishList": [],
    "cart": [],
}
}

const userReducer = (state = userDefaultState, action: UserActionTypes): IUserActionStates => {
    switch (action.type) {
        case LOG_IN_USER:
            return { ...state, user: { ...action.payload.user } };
        case GET_USER_FROM_TOKEN:
            return { ...state, user: { ...action.payload.user } };
        case ADD_TO_CART_USER:
            return { ...state, user: { ...action.payload.user } };
        case REMOVE_FROM_CART_USER:
            return { ...state, user: { ...action.payload.user } };
        case REMOVE_PRODUCTS_CART_USER:
            return { ...state, user: { ...action.payload.user } };
        case ADD_TO_WISHLIST_USER:
            return { ...state, user: { ...action.payload.user } };
        case EDIT_PROFILE_USER:
            return { ...state, user: { ...action.payload.user } };                                                            
        default:
            return { ...state };
    }
    
}
export default userReducer;

