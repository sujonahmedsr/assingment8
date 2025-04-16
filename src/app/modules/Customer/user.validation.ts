import { z } from "zod";

export const createCustomerValidation = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .min(2, "Name must be at least 2 characters long"),
    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email format"),
    phone: z
        .string({ required_error: "Phone number is required" })
        .min(11, "Phone number must be at least 11 digits"),
});
export const updateCustomerValidation = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .min(2, "Name must be at least 2 characters long").optional(),
    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email format").optional(),
    phone: z
        .string({ required_error: "Phone number is required" })
        .min(11, "Phone number must be at least 11 digits").optional(),
});
