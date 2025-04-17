"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerValidation = exports.createCustomerValidation = void 0;
const zod_1 = require("zod");
exports.createCustomerValidation = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: "Name is required" })
        .min(2, "Name must be at least 2 characters long"),
    email: zod_1.z
        .string({ required_error: "Email is required" })
        .email("Invalid email format"),
    phone: zod_1.z
        .string({ required_error: "Phone number is required" })
        .min(11, "Phone number must be at least 11 digits"),
});
exports.updateCustomerValidation = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: "Name is required" })
        .min(2, "Name must be at least 2 characters long").optional(),
    email: zod_1.z
        .string({ required_error: "Email is required" })
        .email("Invalid email format").optional(),
    phone: zod_1.z
        .string({ required_error: "Phone number is required" })
        .min(11, "Phone number must be at least 11 digits").optional(),
});
