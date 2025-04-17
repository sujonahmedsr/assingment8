"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = require("./user.service");
const customerCreate = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.customerService.customerCreateIntoDb(req.body);
    (0, sendResponse_1.sendRespose)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Customer created successfully",
        data: result
    });
}));
const getAllCustomer = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.customerService.getAllCustomerFromDb();
    (0, sendResponse_1.sendRespose)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Customers fetched successfully",
        data: result
    });
}));
const getSingleCustomer = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId } = req.params;
    const result = yield user_service_1.customerService.getSingleCustomerFromDb(customerId);
    (0, sendResponse_1.sendRespose)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Customers fetched successfully",
        data: result
    });
}));
const updateCustomer = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId } = req.params;
    const result = yield user_service_1.customerService.updateCustomer(customerId, req.body);
    (0, sendResponse_1.sendRespose)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Customer updated successfully",
        data: result
    });
}));
const deleteACustomer = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId } = req.params;
    const result = yield user_service_1.customerService.deleteACustomer(customerId);
    (0, sendResponse_1.sendRespose)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Customer deleted successfully",
        data: result
    });
}));
exports.customerController = {
    customerCreate,
    getAllCustomer,
    getSingleCustomer,
    updateCustomer,
    deleteACustomer
};
