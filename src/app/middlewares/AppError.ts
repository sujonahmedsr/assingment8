// utils/ApiError.ts
export class AppError extends Error {
    statusCode: number;
    errorDetails: any;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
