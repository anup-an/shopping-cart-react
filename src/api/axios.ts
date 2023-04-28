import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { assert } from 'superstruct';

import { Failure, MapData, Success } from '../types/mapDataTypes';

export class ApiError {
    public title: string;
    public description: string | object[];
    public statusCode?: number;

    constructor(title: string, description: string | object[], statusCode?: number) {
        if (statusCode) {
            this.statusCode = statusCode;
        }
        this.title = title;
        this.description = description;
    }
}

const makeRequest = async <T, E>(fetchFunc: () => Promise<AxiosResponse<T>>, decoder: any) => {
    try {
        const { data } = await fetchFunc();
        assert(data, decoder);
        return Success<T>(data);
    } catch (error: unknown) {
        return parseError<T>(error as AxiosError);
    }
};

export const parseError = <T>(error: AxiosError): MapData<T, ApiError> => {
    const title = error.response?.data.title || 'UnknownError';
    const description = error.response?.data.description || 'Something went wrong';
    const status = error.response?.status;
    return Failure(new ApiError(title, description, status));
};

export default {
    get: async <T, E>(url: string, decoder: any, config?: AxiosRequestConfig) => {
        return makeRequest<T, E>(() => axios.get(url, config), decoder);
    },
};
