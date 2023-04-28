import _ from 'lodash';

interface Loading {
    status: 'Loading';
}
interface Failure<E> {
    status: 'Failure';
    error: E;
}
interface Success<T> {
    status: 'Success';
    data: T;
}

export type MapData<T, E> = Loading | Failure<E> | Success<T>;

export const Loading: Loading = { status: 'Loading' };

export const Failure = <T, E>(error: E): Failure<E> => ({
    status: 'Failure',
    error,
});

export const Success = <T>(data: T): Success<T> => ({ status: 'Success', data });
export const isLoading = <T, E>(mapData: MapData<T, E>) => mapData.status === 'Loading';
export const isSuccess = <T, E>(mapData: MapData<T, E>) => mapData.status === 'Success';
export const isFailure = <T, E>(mapData: MapData<T, E>) => mapData.status === 'Failure';

export const extractData = <T, E, O>(mapData: MapData<T, E>, prop: keyof T, defaultValue: O): O => {
    return isSuccess(mapData) ? (_.get((mapData as Success<T>).data, prop) as O) : defaultValue;
};
