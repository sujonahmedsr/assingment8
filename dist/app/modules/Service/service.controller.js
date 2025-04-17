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
exports.ServiceController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const service_services_1 = require("./service.services");
const ServiceCreate = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_services_1.serviceServices.serviceCreateIntoDb(req.body);
    (0, sendResponse_1.sendRespose)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Service added successfully",
        data: result
    });
}));
const getAllServices = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_services_1.serviceServices.getAllServices();
    (0, sendResponse_1.sendRespose)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Services fetched successfully",
        data: result
    });
}));
const getSingleService = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ServiceId } = req.params;
    const result = yield service_services_1.serviceServices.getSingleService(ServiceId);
    (0, sendResponse_1.sendRespose)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Service fetched successfully",
        data: result
    });
}));
const serviceCompleted = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ServiceId } = req.params;
    const result = yield service_services_1.serviceServices.serviceCompleted(ServiceId);
    (0, sendResponse_1.sendRespose)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Service marked as completed",
        data: result
    });
}));
const updateService = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ServiceId } = req.params;
    const result = yield service_services_1.serviceServices.updateService(ServiceId, req.body);
    (0, sendResponse_1.sendRespose)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Service updated successfully",
        data: result
    });
}));
const deleteService = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ServiceId } = req.params;
    const result = yield service_services_1.serviceServices.deleteService(ServiceId);
    (0, sendResponse_1.sendRespose)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Service deleted successfully",
        data: result
    });
}));
const serviceStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_services_1.serviceServices.serviceStatus();
    (0, sendResponse_1.sendRespose)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Overdue or pending services fetched successfully",
        data: result
    });
}));
exports.ServiceController = {
    ServiceCreate,
    getAllServices,
    getSingleService,
    serviceCompleted,
    updateService,
    deleteService,
    serviceStatus
};
