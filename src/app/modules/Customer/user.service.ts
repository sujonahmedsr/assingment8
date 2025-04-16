import { Customer } from "../../../../generated/prisma";
import prisma from "../../utils/prisma";

const customerCreateIntoDb = async (payload: Customer) => {
    try {
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
            throw new Error("Customer already exists.");
        }

        // ✅ Create new customer
        const newCustomer = await prisma.customer.create({
            data: customerData,
        });

        return newCustomer;
    } catch (error: any) {
        throw new Error(error.message || "Failed to create customer.");
    }
};

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
        throw new Error("No Data Found.");
    }

    return result
}

const updateCustomer = async (id: string, data: Partial<Customer>) => {
    try {
        const result = await prisma.$transaction(async (tx) => {
            // ✅ Check if customer exists
            const existingCustomer = await tx.customer.findUnique({
                where: { customerId: id },
            });

            if (!existingCustomer) {
                throw new Error("Customer not found.");
            }

            // ✅ Update customer
            const updatedCustomer = await tx.customer.update({
                where: { customerId: id },
                data,
            });

            return updatedCustomer;
        });

        return result;
    } catch (error: any) {
        console.error("❌ Error updating customer:", error.message || error);
        throw new Error("Update action failed. Please try again.");
    }
};

const deleteACustomer = async (id: string) => {
    try {
        await prisma.$transaction(async (tx) => {
            // Check if the customer exists
            const existingCustomer = await tx.customer.findUnique({
                where: {
                    customerId: id,
                },
            });

            if (!existingCustomer) {
                throw new Error("Customer not found.");
            }

            // Delete customer
            const deletedCustomer = await tx.customer.delete({
                where: {
                    customerId: id,
                },
            });

            return deletedCustomer;
        });
    } catch (error: any) {
        console.error("❌ Error deleting customer:", error.message || error);
        throw new Error("Delete action failed. Please try again.");
    }
};


export const customerService = {
    customerCreateIntoDb,
    getAllCustomerFromDb,
    getSingleCustomerFromDb,
    updateCustomer,
    deleteACustomer
};
