import { IOrder } from '../ActionTypes';
import { baseUrl } from '../constants';
import { OrderDecoder, OrdersListDecoder } from '../decoders/order';
import axios, { ApiError } from './axios';

export const fetchOrder = async () => {
    return await axios.get<{ data: IOrder[] }, ApiError>(`${baseUrl}/api/orders/`, OrdersListDecoder);
};

export const makeOrder = async (payload: Omit<IOrder, '_id'>) => {
    return await axios.post<{ data: IOrder }, ApiError>(`${baseUrl}/api/orders`, OrderDecoder, payload, {
        withCredentials: true,
    });
};
