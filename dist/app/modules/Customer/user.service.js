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
exports.customerService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../middlewares/AppError");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const customerCreateIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone } = payload;
    const customerData = {
        name,
        email,
        phone
    };
    // ✅ Check if customer already exists
    const existingCustomer = yield prisma_1.default.customer.findUnique({
        where: { email },
    });
    if (existingCustomer) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, "Customer already exists.");
    }
    // ✅ Create new customer
    const newCustomer = yield prisma_1.default.customer.create({
        data: customerData,
    });
    return newCustomer;
});
const getAllCustomerFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.customer.findMany();
    return result;
});
const getSingleCustomerFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.customer.findUnique({
        where: {
            customerId: id
        }
    });
    if (!result) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, "Customer not found.");
    }
    return result;
});
const updateCustomer = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // ✅ Check if customer exists
        const existingCustomer = yield tx.customer.findUnique({
            where: { customerId: id },
        });
        if (!existingCustomer) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, "Customer not found.");
        }
        // ✅ Update customer
        const updatedCustomer = yield tx.customer.update({
            where: { customerId: id },
            data,
        });
        return updatedCustomer;
    }));
    return result;
});
const deleteACustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // Check if the customer exists
        const existingCustomer = yield tx.customer.findUnique({
            where: {
                customerId: id,
            },
        });
        if (!existingCustomer) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, "Customer not found.");
        }
        // Delete customer
        const deletedCustomer = yield tx.customer.delete({
            where: {
                customerId: id,
            },
        });
        return deletedCustomer;
    }));
});
exports.customerService = {
    customerCreateIntoDb,
    getAllCustomerFromDb,
    getSingleCustomerFromDb,
    updateCustomer,
    deleteACustomer
};
