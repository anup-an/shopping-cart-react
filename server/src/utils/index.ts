export const codeToStatusMapping: { [x: string]: number } = {
    AuthenticationError: 401,
    NotFoundError: 404,
    ValidationError: 422,
    ServerError: 500,
    ForbiddenError: 403,
};

export class ErrorException extends Error {
    message: string;
    code?: string;
    status: number;
    constructor(code: string = ErrorCode.ServerError, message: string) {
        super();
        this.name = code;
        this.status = codeToStatusMapping[code] || 500;
        this.message = message;
    }
}

export class ErrorCode {
    public static readonly AuthenticationError = 'AuthenticationError';
    public static readonly NotFoundError = 'NotFoundError';
    public static readonly ValidationError = 'ValidationError';
    public static readonly ForbiddenError = 'ForbiddenError';
    public static readonly ServerError = 'ServerError';
    public static readonly ResetPasswordError = 'ResetPasswordError';
}
