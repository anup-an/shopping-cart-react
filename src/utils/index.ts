import _ from 'lodash';

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
