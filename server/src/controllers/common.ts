import _ from 'lodash';
import { NextFunction, Request, Response } from 'express';

import { ErrorCode, ErrorException } from '../utils';
import { GenericService } from '../services/common';

export class GenericController<T> {
    constructor(private readonly service: GenericService<T>) {}

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.getAll(req, res);
            this.handleResponse(result, res, 'find');
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.getById(req, res);
            this.handleResponse(result, res, 'find');
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.create(req, res);
            this.handleResponse(_.omit(result.toObject(), ['__v']), res, 'create');
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.delete(req, res);
            this.handleResponse(result, res, 'delete');
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.update(req, res);
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
