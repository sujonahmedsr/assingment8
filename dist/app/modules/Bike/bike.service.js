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
exports.bikeServices = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = require("../../middlewares/AppError");
const http_status_1 = __importDefault(require("http-status"));
const bikeCreateIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.customer.findUnique({
        where: {
            customerId: payload.customerId
        }
    });
    if (!userData) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, "User Not Found.");
    }
    const result = yield prisma_1.default.bike.create({
        data: payload
    });
    return result;
});
const getAllBikes = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bike.findMany();
    return result;
});
const getSingleBike = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bike.findUnique({
        where: {
            bikeId: id
        }
    });
    if (!result) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, "Bike not found.");
    }
    return result;
});
const updateBike = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // ✅ Check if Bike exists
        const existingBike = yield tx.bike.findUnique({
            where: { bikeId: id },
        });
        if (!existingBike) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, "Bike not found.");
        }
        // ✅ Update Bike
        const updatedBike = yield tx.bike.update({
            where: { bikeId: id },
            data,
        });
        return updatedBike;
    }));
    return result;
});
const deleteBike = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // Check if the Bike exists
        const existingBike = yield tx.bike.findUnique({
            where: {
                bikeId: id,
            },
        });
        if (!existingBike) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, "Bike not found.");
        }
        // Delete Bike
        const deletedBike = yield tx.bike.delete({
            where: {
                bikeId: id,
            },
        });
        return deletedBike;
    }));
});
exports.bikeServices = {
    bikeCreateIntoDb,
    getAllBikes,
    getSingleBike,
    updateBike,
    deleteBike
};
