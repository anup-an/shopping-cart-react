import { Request, Response } from 'express';
import _ from 'lodash';

import { IModel } from '../models/model';
import { FilterQuery } from 'mongoose';

const queryStringParser = (queryString?: string): { [key: string]: any } => {
    const arrayAfterFormat =
        queryString?.split(';').map((val) => {
            const splitString = val.split(':');
            return splitString[0] && splitString[1] ? { [splitString[0]]: splitString[1] } : {};
        }) || [];

    return arrayAfterFormat.reduce((acc, val) => {
        return { ...acc, ...val };
    }, {});
};

export class GenericService<T> {
    constructor(private readonly model: IModel<T>) {}

    async getAll(req: Request, res: Response) {
        const searchObject = queryStringParser(req.query.search as string | undefined);
        const search = _.keys(searchObject).map((val) => ({
            [val]: { $regex: searchObject[val], $options: 'i' },
        }));
        const sort = queryStringParser(req.query.sort as string | undefined);
        const filter = queryStringParser(req.query.filter as string | undefined);
        return await this.model
            .find({
                $or: _.isEmpty(search) ? [{}] : search,
                ...filter,
            } as FilterQuery<T>)
            .sort({ ...sort });
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
