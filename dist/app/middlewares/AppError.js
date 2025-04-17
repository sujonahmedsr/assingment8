"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
// utils/ApiError.ts
class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
