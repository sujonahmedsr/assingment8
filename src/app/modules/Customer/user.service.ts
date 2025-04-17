import status from "http-status";
import { AppError } from "../../middlewares/AppError";
import prisma from "../../utils/prisma";
import { Customer } from "@prisma/client";

const customerCreateIntoDb = async (payload: Customer) => {
    const { name, email, phone } = payload;

    const customerData = {
        name,
        email,
        phone
    }

    // ✅ Check if customer already exists
    const existingCustomer = await prisma.customer.findUnique({
        where: { email },
    });

    if (existingCustomer) {
        throw new AppError(status.NOT_FOUND, "Customer already exists.");
    }

    // ✅ Create new customer
    const newCustomer = await prisma.customer.create({
        data: customerData,
    });

    return newCustomer;
}

const getAllCustomerFromDb = async () => {
    const result = await prisma.customer.findMany()
    return result
}

const getSingleCustomerFromDb = async (id: string) => {
    const result = await prisma.customer.findUnique({
        where: {
            customerId: id
        }
    })

    if (!result) {
        throw new AppError(status.NOT_FOUND, "Customer not found.");
    }

    return result
}

const updateCustomer = async (id: string, data: Partial<Customer>) => {
    const result = await prisma.$transaction(async (tx) => {
        // ✅ Check if customer exists
        const existingCustomer = await tx.customer.findUnique({
            where: { customerId: id },
        });

        if (!existingCustomer) {
            throw new AppError(status.NOT_FOUND, "Customer not found.");
        }

        // ✅ Update customer
        const updatedCustomer = await tx.customer.update({
            where: { customerId: id },
            data,
        });

        return updatedCustomer;
    });

    return result;
}

const deleteACustomer = async (id: string) => {
    await prisma.$transaction(async (tx) => {
        // Check if the customer exists
        const existingCustomer = await tx.customer.findUnique({
            where: {
                customerId: id,
            },
        });

        if (!existingCustomer) {
            throw new AppError(status.NOT_FOUND, "Customer not found.");
        }

        // Delete customer
        const deletedCustomer = await tx.customer.delete({
            where: {
                customerId: id,
            },
        });

        return deletedCustomer;
    });
}


export const customerService = {
    customerCreateIntoDb,
    getAllCustomerFromDb,
    getSingleCustomerFromDb,
    updateCustomer,
    deleteACustomer
};
