"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServiceSchema = exports.createServiceSchema = void 0;
const zod_1 = require("zod");
exports.createServiceSchema = zod_1.z.object({
    bikeId: zod_1.z.string().uuid("Invalid bikeId format, must be a valid UUID"),
    serviceDate: zod_1.z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    description: zod_1.z.string().min(1, "Description is required"),
    status: zod_1.z.enum(["pending", "in-progress", "completed"], {
        errorMap: () => ({ message: "Status must be one of: pending, in-progress, completed" }),
    }),
});
exports.updateServiceSchema = zod_1.z.object({
    bikeId: zod_1.z.string().uuid("Invalid bikeId format").optional(),
    serviceDate: zod_1.z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }).optional(),
    description: zod_1.z.string().min(1, "Description is required").optional(),
    status: zod_1.z.enum(["pending", "in-progress", "completed"], {
        errorMap: () => ({ message: "Status must be one of: pending, in-progress, completed" }),
    }).optional(),
});
