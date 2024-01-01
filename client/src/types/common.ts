import { CartActionTypes, UserActionTypes } from '../ActionTypes';
import { NotificationActionTypes } from './notifications/ActionTypes';
import { ProductsActionTypes } from './products/ActionTypes';

export type SortState<T extends Object> = { [key in keyof T]?: 'asc' | 'desc' };
export type FilterState<T extends Object> = { [key in keyof T]?: any };
export type SearchState<T extends Object> = { [key in keyof T]?: string };

export type AppActions = ProductsActionTypes | CartActionTypes | UserActionTypes | NotificationActionTypes;
