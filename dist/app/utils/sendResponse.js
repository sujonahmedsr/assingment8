"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRespose = void 0;
const sendRespose = (res, data) => {
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
        success: data.success,
        message: data.message,
        meta: data.meta,
        data: data.data
    });
};
exports.sendRespose = sendRespose;
