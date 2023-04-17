import _ from 'lodash';
import { NextFunction, Request, Response } from 'express';

import { IModel } from '../models/model';
import { ErrorCode, ErrorException } from '../utils';

export const getAll =
    <T>(model: IModel<T>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await model.find(
                _.mapValues(req.query, (val) => {
                    return { $regex: val, $options: 'i' };
                }),
            );
            handleResponse(result, res, 'find');
        } catch (error) {
            next(error);
        }
    };

export const getById =
    <T>(model: IModel<T>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await model.findById(req.params.id, { password: false, refreshToken: false });
            handleResponse(result, res, 'find');
        } catch (error) {
            next(error);
        }
    };

export const create =
    <T>(model: IModel<T>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await new model(req.body).save();
            handleResponse(result, res, 'create');
        } catch (error) {
            next(error);
        }
    };

export const deleteById =
    <T>(model: IModel<T>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await model.findByIdAndDelete(req.params.id, { password: false, refreshToken: false });
            handleResponse(result, res, 'delete');
        } catch (error) {
            next(error);
        }
    };

export const updateById =
    <T>(model: IModel<T>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await model.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                password: false,
                refreshToken: false,
                runValidators: true,
            });
            handleResponse(result, res, 'update');
        } catch (error) {
            next(error);
        }
    };

const handleResponse = (queryResult: any, res: Response, method: string) => {
    if (queryResult) {
        _.isArray(queryResult) || !_.isEmpty(queryResult)
            ? res.status(200).json({
                  data: queryResult,
              })
            : res.status(500).send(`Failed to ${method}`);
    } else if (_.isNull(queryResult)) {
        throw new ErrorException(ErrorCode.NotFoundError, 'Not found');
    } else {
        throw new ErrorException(ErrorCode.ServerError, `Failed to ${method}`);
    }
};
