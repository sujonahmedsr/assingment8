import { z } from 'zod';

export const createServiceSchema = z.object({
    bikeId: z.string().uuid("Invalid bikeId format, must be a valid UUID"),
    serviceDate: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    description: z.string().min(1, "Description is required"),
    status: z.enum(["pending", "in-progress", "completed"], {
        errorMap: () => ({ message: "Status must be one of: pending, in-progress, completed" }),
    }),
});

export const updateServiceSchema = z.object({
    bikeId: z.string().uuid("Invalid bikeId format").optional(),
    serviceDate: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }).optional(),
    description: z.string().min(1, "Description is required").optional(),
    status: z.enum(["pending", "in-progress", "completed"], {
        errorMap: () => ({ message: "Status must be one of: pending, in-progress, completed" }),
    }).optional(),
});
