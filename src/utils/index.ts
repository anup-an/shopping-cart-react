import _ from 'lodash';

import { ApiError } from '../api/axios';

type QueryObject = {
    [x: string]: { [x: string]: string } | null;
};

export const buildQueryString = (queryObject: QueryObject) => {
    const mappedObject = _.mapValues(queryObject, (val) => {
        return val
            ? _.keys(val)
                  .map((key) => `${key}:${val[key]}`)
                  .join(';')
            : '';
    });
    return _.keys(mappedObject)
        .map((val) => `${val}=${mappedObject[val]}`)
        .join('&');
};

export const getErrorMessage = (error: ApiError): string => {
    const reasons = error.description;
    if (_.isString(reasons)) return reasons;
    const messages = (reasons as object[]).map((reason: object) => _.values(reason));
    return _.flatMap(messages)[0];
};
