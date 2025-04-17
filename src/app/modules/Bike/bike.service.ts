import { Bike } from "@prisma/client";
import prisma from "../../utils/prisma";
import { AppError } from "../../middlewares/AppError";
import status from "http-status";

const bikeCreateIntoDb = async (payload: Bike) => {
    const userData = await prisma.customer.findUnique({
        where: {
            customerId: payload.customerId
        }
    })

    if (!userData) {
        throw new AppError(status.NOT_FOUND, "User Not Found.")
    }
    
    const result = await prisma.bike.create({
        data: payload
    })
    return result
}

const getAllBikes = async () => {
    const result = await prisma.bike.findMany()
    return result
}

const getSingleBike = async (id: string) => {
    const result = await prisma.bike.findUnique({
        where: {
            bikeId: id
        }
    })
    if (!result) {
        throw new AppError(status.NOT_FOUND, "Bike not found.");
    }
    return result
}

const updateBike = async (id: string, data: Partial<Bike>) => {
    const result = await prisma.$transaction(async (tx) => {
        // ✅ Check if Bike exists
        const existingBike = await tx.bike.findUnique({
            where: { bikeId: id },
        });

        if (!existingBike) {
            throw new AppError(status.NOT_FOUND, "Bike not found.");
        }

        // ✅ Update Bike
        const updatedBike = await tx.bike.update({
            where: { bikeId: id },
            data,
        });

        return updatedBike;
    });

    return result;
}

const deleteBike = async (id: string) => {
    await prisma.$transaction(async (tx) => {
        // Check if the Bike exists
        const existingBike = await tx.bike.findUnique({
            where: {
                bikeId: id,
            },
        });

        if (!existingBike) {
            throw new AppError(status.NOT_FOUND, "Bike not found.");
        }

        // Delete Bike
        const deletedBike = await tx.bike.delete({
            where: {
                bikeId: id,
            },
        });

        return deletedBike;
    });
}

export const bikeServices = {
    bikeCreateIntoDb,
    getAllBikes,
    getSingleBike,
    updateBike,
    deleteBike
}