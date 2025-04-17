import { z } from 'zod';

export const bikeVSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().int().min(1900).max(new Date().getFullYear()),
  customerId: z.string().uuid("Invalid UUID for customerId")
});

export const updatebikeVSchema = z.object({
  brand: z.string().min(1, "Brand is required").optional(),
  model: z.string().min(1, "Model is required").optional(),
  year: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
  customerId: z.string().uuid("Invalid UUID for customerId").optional()
});
