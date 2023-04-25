import axios, { AxiosResponse } from 'axios';

import { IProduct } from '../ActionTypes';
import { baseUrl } from '../constants';
import { FilterState, SearchState, SortState } from '../types/common';
import { buildQueryString } from '../utils';

export const fetchProducts = async (
    sort?: SortState<IProduct> | null,
    search?: SearchState<IProduct> | null,
    filter?: FilterState<IProduct> | null,
) => {
    const queryString = buildQueryString({
        search: search || null,
        sort: sort || null,
        filter: filter || null,
    });
    const result: AxiosResponse<{ data: IProduct[] }> = await axios.get(`${baseUrl}/api/products?${queryString}`);
    return result;
};
