import { IUser } from '../ActionTypes';
import { baseUrl } from '../constants';
import { IgnoreResponseDecoder } from '../decoders/common';
import { UserDecoder } from '../decoders/user';
import axios, { ApiError } from './axios';

export const updateUser = async (payload: any) => {
    return await axios.post<{ data: IUser }, ApiError>(`${baseUrl}/api/users/`, UserDecoder, payload);
};

export const fetchUser = async () => {
    return await axios.get<{ data: IUser }, ApiError>(`${baseUrl}/api/users/`, UserDecoder);
};

export const signupUser = async (payload: { email: string; password: string; firstName: string; lastName: string }) => {
    return await axios.post<unknown, ApiError>(`${baseUrl}/api/signup`, IgnoreResponseDecoder, payload);
};

export const loginUser = async (payload: { email: string; password: string }) => {
    return await axios.post<{ data: IUser }, ApiError>(`${baseUrl}/api/login`, UserDecoder, payload, {
        withCredentials: true,
    });
};

export const logoutUser = async () => {
    return await axios.post<unknown, ApiError>(`${baseUrl}/api/logout`, IgnoreResponseDecoder);
};

export const reissueToken = async () => {
    return await axios.post<unknown, ApiError>(`${baseUrl}/api/reissue-token`, IgnoreResponseDecoder);
};

export const sendPasswordResetLink = async (payload: { email: string }) => {
    return await axios.post<unknown, ApiError>(`${baseUrl}/api/reset-link`, IgnoreResponseDecoder, payload);
};

export const resetPassword = async (payload: { password: string; resetToken: string }) => {
    return await axios.post<unknown, ApiError>(`${baseUrl}/api/reset-password`, IgnoreResponseDecoder, payload);
};
