import _ from 'lodash';
import { Request, Response } from 'express';

import { IModel } from '../models/model';

export const getAll = <T>(model: IModel<T>) => async (req: Request, res: Response) => {
    try {
        const result = await model.find(
            _.mapValues(req.query, (val) => {
                return { $regex: val, $options: 'i' };
            }),
        );
        res.status(200).json({ data: result });
    } catch (error) {
        res.send(error);
    }
};

export const getById = <T>(model: IModel<T>) => async (req: Request, res: Response) => {
    try {
        const result = await model.findById(req.params._id);
        result ? res.status(200).json({ data: result }) : res.status(404).send('Not found error');
    } catch (error) {
        res.send(error);
    }
};

export const create = <T>(model: IModel<T>) => async (req: Request, res: Response) => {
    try {
        const result = await new model(req.body).save();
        result ? res.status(200).json({ data: result }) : res.status(500).send('Database error');
    } catch (error) {
        res.send(error);
    }
};

export const deleteById = <T>(model: IModel<T>) => async (req: Request, res: Response) => {
    try {
        const result = await model.findByIdAndDelete(req.params._id);
        result ? res.status(200).json({ data: result }) : res.status(500).send('Database error');
    } catch (error) {
        res.send(error);
    }
};

export const updateById = <T>(model: IModel<T>) => async (req: Request, res: Response) => {
    try {
        const result = await model.findByIdAndUpdate(req.params._id, req.body);
        result ? res.status(200).json({ data: result }) : res.status(500).send('Database error');
    } catch (error) {
        res.send(error);
    }
};
