import { IUser } from '../ActionTypes';
import { baseUrl } from '../constants';
import { UserDecoder } from '../decoders/user';
import axios, { ApiError } from './axios';

export const updateUser = async (payload: any) => {
    return await axios.post<{ data: IUser }, ApiError>(`${baseUrl}/api/users/`, payload, UserDecoder);
};

export const fetchUser = async () => {
    return await axios.get<{ data: IUser }, ApiError>(`${baseUrl}/api/users/`, UserDecoder);
};
