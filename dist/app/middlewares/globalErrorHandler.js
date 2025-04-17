"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const prisma_1 = require("../../../generated/prisma");
const AppError_1 = require("./AppError");
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorDetails = [];
    // ✅ Zod Validation Error
    if (error instanceof zod_1.ZodError) {
        statusCode = http_status_1.default.BAD_REQUEST;
        message = "Validation Error";
        errorDetails = error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
        }));
    }
    // ✅ Prisma Known Errors (Optional)
    else if (error instanceof prisma_1.Prisma.PrismaClientKnownRequestError) {
        statusCode = http_status_1.default.BAD_REQUEST;
        message = "Database Error";
        errorDetails = [
            {
                code: error.code,
                message: error.message,
            },
        ];
    }
    // ✅ Custom API Error
    else if (error instanceof AppError_1.AppError) {
        statusCode = error.statusCode;
        message = error.message;
        errorDetails = error.errorDetails;
    }
    // ✅ Custom Error with Message
    else if (error instanceof Error) {
        message = error.message;
        errorDetails = [{ message: error.message }];
    }
    // ✅ Send Response
    res.status(statusCode).json({
        success: false,
        message,
        errorDetails,
        stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
    });
};
exports.default = globalErrorHandler;
