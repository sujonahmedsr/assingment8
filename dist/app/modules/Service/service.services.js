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
exports.serviceServices = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = require("../../middlewares/AppError");
const http_status_1 = __importDefault(require("http-status"));
const serviceCreateIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const ServiceData = yield prisma_1.default.bike.findUnique({
        where: {
            bikeId: payload.bikeId
        }
    });
    if (!ServiceData) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, "Bike Not Found.");
    }
    const result = yield prisma_1.default.serviceRecord.create({
        data: payload
    });
    return result;
});
const getAllServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.serviceRecord.findMany();
    return result;
});
const getSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.serviceRecord.findUnique({
        where: {
            serviceId: id
        }
    });
    if (!result) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, "Service not found.");
    }
    return result;
});
const serviceCompleted = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // ✅ Check if Service exists
        const existingService = yield tx.serviceRecord.findUnique({
            where: { serviceId: id },
        });
        if (!existingService) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, "Service not found.");
        }
        // ✅ Update Service
        const updatedService = yield tx.serviceRecord.update({
            where: { serviceId: id },
            data: {
                completionDate: new Date(),
                status: "done"
            },
        });
        return updatedService;
    }));
    return result;
});
const updateService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // ✅ Check if Service exists
        const existingService = yield tx.serviceRecord.findUnique({
            where: { serviceId: id },
        });
        if (!existingService) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, "Service not found.");
        }
        // ✅ Update Service
        const updatedService = yield tx.serviceRecord.update({
            where: { serviceId: id },
            data,
        });
        return updatedService;
    }));
    return result;
});
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // Check if the Service exists
        const existingService = yield tx.serviceRecord.findUnique({
            where: {
                serviceId: id,
            },
        });
        if (!existingService) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, "Service not found.");
        }
        // Delete Service
        const deletedService = yield tx.serviceRecord.delete({
            where: {
                serviceId: id,
            },
        });
        return deletedService;
    }));
});
const serviceStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds
    const result = yield prisma_1.default.serviceRecord.findMany({
        where: {
            status: {
                in: ["pending", 'in_progress']
            },
            serviceDate: {
                lt: sevenDaysAgo
            }
        }
    });
    return result;
});
exports.serviceServices = {
    serviceCreateIntoDb,
    getAllServices,
    getSingleService,
    serviceCompleted,
    updateService,
    deleteService,
    serviceStatus
};
