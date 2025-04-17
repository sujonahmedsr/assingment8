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
exports.bikeController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const bike_service_1 = require("./bike.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const bikeCreate = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.bikeServices.bikeCreateIntoDb(req.body);
    (0, sendResponse_1.sendRespose)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Bike added successfully",
        data: result
    });
}));
const getAllBikes = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.bikeServices.getAllBikes();
    (0, sendResponse_1.sendRespose)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Bikes fetched successfully",
        data: result
    });
}));
const getSingleBike = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bikeId } = req.params;
    const result = yield bike_service_1.bikeServices.getSingleBike(bikeId);
    (0, sendResponse_1.sendRespose)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Bike fetched successfully",
        data: result
    });
}));
const updateBike = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bikeId } = req.params;
    const result = yield bike_service_1.bikeServices.updateBike(bikeId, req.body);
    (0, sendResponse_1.sendRespose)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Bike updated successfully",
        data: result
    });
}));
const deleteBike = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bikeId } = req.params;
    const result = yield bike_service_1.bikeServices.deleteBike(bikeId);
    (0, sendResponse_1.sendRespose)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Bike deleted successfully",
        data: result
    });
}));
exports.bikeController = {
    bikeCreate,
    getAllBikes,
    getSingleBike,
    updateBike,
    deleteBike
};
