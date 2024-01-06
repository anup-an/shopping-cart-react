import { NextFunction, Request, Response } from 'express';

import { codeToStatusMapping } from '../utils';

const getValidationErrors = (error: any) => {
    let errors = [];
    if (error.errors) {
        for (let field in error.errors) {
            errors.push({ [field]: error.errors[field].message });
        }
    }
    return errors;
};

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    const responseObject = {
        title: error.name || 'ServerError',
        description:
            error.name === 'ValidationError' ? getValidationErrors(error) : error.message || 'Something went wrong. Please try again.',
        stack: process.env.NODE_ENV === 'development' ? error.stack : {},
    };
    return res.status(error.status || codeToStatusMapping[error.name] || 500).json(responseObject);
};

export default errorHandler;
