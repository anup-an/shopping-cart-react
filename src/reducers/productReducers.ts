import {
    FETCH_PRODUCTS,
    FILTER_PRODUCTS_SIZE,
    IProduct,
    ProductsActionTypes,
    SORT_PRODUCTS_PRICE,
} from '../ActionTypes';

export interface ActionStates {
    items: IProduct[];
    sort: string;
    sortedItems: IProduct[];
    filteredItems: IProduct[];
    size: string;
}
const productsDefaultState: ActionStates = {
    items: [],
    sort: '',
    size: '',
    sortedItems: [],
    filteredItems: [],
};

const productsReducer = (state = productsDefaultState, action: ProductsActionTypes): ActionStates => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return { ...state, items: action.payload.items, filteredItems: action.payload.items };
        case SORT_PRODUCTS_PRICE:
            return {
                ...state,

                sort: action.payload.sort,
                filteredItems: action.payload.items,
            };
        case FILTER_PRODUCTS_SIZE:
            return {
                ...state,
                size: action.payload.size,
                filteredItems: action.payload.items,
            };
        default:
            return state;
    }
};

export default productsReducer;
