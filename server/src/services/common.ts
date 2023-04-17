import _ from 'lodash';
import { NextFunction, Request, Response } from 'express';

import { IModel } from '../models/model';

export class GenericService<T> {
    constructor(private readonly model: IModel<T>) {}

    async getAll(req: Request, res: Response) {
        return await this.model.find(
            _.mapValues(req.query, (val) => {
                return { $regex: val, $options: 'i' };
            }),
        );
    }

    async getById(req: Request, res: Response) {
        return await this.model.findById(req.params.id, { password: false, refreshToken: false });
    }

    async create(req: Request, res: Response) {
        return await new this.model(req.body).save();
    }

    async delete(req: Request, res: Response) {
        return await this.model.findByIdAndDelete(req.params.id, { password: false, refreshToken: false });
    }

    async update(req: Request, res: Response) {
        return await this.model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            password: false,
            refreshToken: false,
            runValidators: true,
        });
    }
}
