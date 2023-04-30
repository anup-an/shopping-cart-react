import { IOrder } from '../ActionTypes';
import { baseUrl } from '../constants';
import { OrdersListDecoder } from '../decoders/order';
import axios, { ApiError } from './axios';

export const fetchOrder = async () => {
    return await axios.get<{ data: IOrder[] }, ApiError>(`${baseUrl}/api/orders/`, OrdersListDecoder);
};
