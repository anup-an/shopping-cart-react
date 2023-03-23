import { Request, Response } from 'express';
import mongoose from 'mongoose';
import _ from 'lodash';
import CreateModel, { Schema } from '../models/model';

export const getAll = <T>(table: string, schema: Schema<T>) => async (req: Request, res: Response) => {
    try {
        const model = new CreateModel<T>(table, schema).create();
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

export const getById = <T>(table: string, schema: Schema<T>) => async (req: Request, res: Response) => {
    try {
        const model = new CreateModel<T>(table, schema).create();
        const result = await model.findById(req.params.id);
        result ? res.status(200).json({ data: result }) : res.status(404).send('Not found error');
    } catch (error) {
        res.send(error);
    }
};

export const create = <T>(table: string, schema: Schema<T>) => async (req: Request, res: Response) => {
    try {
        const model = new CreateModel<T>(table, schema).create();
        const result = await new model(req.body).save();
        result ? res.status(200).json({ data: result }) : res.status(500).send('Database error');
    } catch (error) {
        res.send(error);
    }
};

export const deleteById = <T>(table: string, schema: Schema<T>) => async (req: Request, res: Response) => {
    try {
        const model = new CreateModel<T>(table, schema).create();
        const result = await model.findByIdAndDelete(req.params.id);
        result ? res.status(200).json({ data: result }) : res.status(500).send('Database error');
    } catch (error) {
        res.send(error);
    }
};
