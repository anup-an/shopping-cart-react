import _ from 'lodash';
import { NextFunction, Request, Response } from 'express';

import { IModel } from '../models/model';
import { ErrorCode, ErrorException } from '../utils';

export class GenericController<T> {
    model: IModel<T>;
    constructor(model: IModel<T>) {
        this.model = model;
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.model.find(
                _.mapValues(req.query, (val) => {
                    return { $regex: val, $options: 'i' };
                }),
            );
            this.handleResponse(result, res, 'find');
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.model.findById(req.params.id, { password: false, refreshToken: false });
            this.handleResponse(result, res, 'find');
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await new this.model(req.body).save();
            this.handleResponse(result, res, 'create');
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.model.findByIdAndDelete(req.params.id, { password: false, refreshToken: false });
            this.handleResponse(result, res, 'delete');
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.model.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                password: false,
                refreshToken: false,
                runValidators: true,
            });
            this.handleResponse(result, res, 'update');
        } catch (error) {
            next(error);
        }
    }

    handleResponse(queryResult: any, res: Response, method: string) {
        if (queryResult && !_.isEqual(queryResult, {})) {
            return res.status(200).json({
                data: queryResult,
            });
        } else if (_.isNull(queryResult)) {
            throw new ErrorException(ErrorCode.NotFoundError, 'Not found');
        } else {
            throw new ErrorException(ErrorCode.ServerError, `Failed to ${method}`);
        }
    }
}
