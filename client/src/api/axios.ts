import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { assert, StructError } from 'superstruct';

import { Failure, MapData, Success, isSuccess } from '../types/mapDataTypes';
import { IgnoreResponseDecoder } from '../decoders/common';
import { baseUrl, frontendUrl } from '../constants';

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

const axiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      try {
        const tokenResponse = await makeRequest<unknown, ApiError>(
          () => axios.post(`${baseUrl}/api/reissue-token`),
          IgnoreResponseDecoder,
        );
        if (isSuccess(tokenResponse)) {
          return await axios.request(error.config);
        }
        window.location.pathname !== '/login' ? window.location.replace(`${frontendUrl}/login`) : '';
      } catch (error) {
        throw error;
      }
    }
    throw error;
  },
);

export default {
  get: async <T, E>(url: string, decoder: any, config?: AxiosRequestConfig) => {
    return makeRequest<T, E>(() => axiosInstance.get(url, config), decoder);
  },
  post: async <T, E>(url: string, decoder: any, payload?: any, config?: AxiosRequestConfig) => {
    return makeRequest<T, E>(() => axiosInstance.post(url, payload, config), decoder);
  },
};
