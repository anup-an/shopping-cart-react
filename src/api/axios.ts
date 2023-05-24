import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { assert, StructError } from 'superstruct';

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
        return parseError<T>(error);
    }
};

export const parseError = <T>(error: any): MapData<T, ApiError> => {
    let title;
    let description;
    let status;
    if (error instanceof StructError) {
        title = 'DecoderError';
        description = `${error.failures()[0].message} for ${error.failures()[0].key} field`;
    } else {
        title = error.response?.data.title || 'UnknownError';
        description = error.response?.data.description || 'Something went wrong';
        status = error.response?.status;
    }
    return Failure(new ApiError(title, description, status));
};

export default {
    get: async <T, E>(url: string, decoder: any, config?: AxiosRequestConfig) => {
        return makeRequest<T, E>(() => axios.get(url, config), decoder);
    },
    post: async <T, E>(url: string, decoder: any, payload?: any, config?: AxiosRequestConfig) => {
        return makeRequest<T, E>(() => axios.post(url, payload, config), decoder);
    },
};
