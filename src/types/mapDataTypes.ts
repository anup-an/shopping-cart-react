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

export const pickFieldOrDefault = <T, E, O>(mapData: MapData<T, E>, prop: keyof T, defaultValue: O): O => {
    return isSuccess(mapData) ? (_.get((mapData as Success<T>).data, prop) as O) : defaultValue;
};

export const extractDataOrNull = <T, E>(mapData: MapData<T, E>): T | null =>
    isSuccess(mapData) ? (mapData as Success<T>).data : null;

export const extractError = <T, E>(mapData: MapData<T, E>) =>
    isFailure(mapData) ? _.get(mapData as Failure<E>, 'error') : null;

export const useMapData = <T, E>(
    mapData: MapData<T, E>,
    onSuccess: (value: T) => void,
    onError: (value: E) => void,
): void => {
    if (isSuccess(mapData)) {
        const data = extractDataOrNull<T, E>(mapData);
        if (data !== null) onSuccess(data);
    } else {
        const error = extractError(mapData);
        if (error !== null) onError(error);
    }
};
