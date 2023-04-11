import _ from 'lodash';
import { Request, Response } from 'express';

import { IModel } from '../models/model';

export const getAll =
    <T>(model: IModel<T>) =>
    async (req: Request, res: Response) => {
        try {
            const result = await model.find(
                _.mapValues(req.query, (val) => {
                    return { $regex: val, $options: 'i' };
                }),
            );
            handleResponse(result, res, 'find');
        } catch (error) {
            res.status(500).send(error);
        }
    };

export const getById =
    <T>(model: IModel<T>) =>
    async (req: Request, res: Response) => {
        try {
            const result = await model.findById(req.params.id, { password: false, refreshToken: false });
            handleResponse(result, res, 'find');
        } catch (error) {
            res.status(500).send(error);
        }
    };

export const create =
    <T>(model: IModel<T>) =>
    async (req: Request, res: Response) => {
        try {
            const result = await new model(req.body).save();
            handleResponse(result, res, 'create');
        } catch (error) {
            res.status(500).send(error);
        }
    };

export const deleteById =
    <T>(model: IModel<T>) =>
    async (req: Request, res: Response) => {
        try {
            const result = await model.findByIdAndDelete(req.params.id, { password: false, refreshToken: false });
            handleResponse(result, res, 'delete');
        } catch (error) {
            res.status(500).send(error);
        }
    };

export const updateById =
    <T>(model: IModel<T>) =>
    async (req: Request, res: Response) => {
        try {
            const result = await model.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                password: false,
                refreshToken: false,
            });
            handleResponse(result, res, 'update');
        } catch (error) {
            res.status(500).send(error);
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
        res.status(404).send('Not found');
    } else {
        res.status(500).send(`Failed to ${method}`);
    }
};
