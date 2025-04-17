import { ServiceRecord } from "@prisma/client";
import prisma from "../../utils/prisma";
import { AppError } from "../../middlewares/AppError";
import status from "http-status";

const serviceCreateIntoDb = async (payload: ServiceRecord) => {
    const bikeData = await prisma.bike.findUnique({
        where: {
            bikeId: payload.bikeId
        }
    })

    if (!bikeData) {
        throw new AppError(status.NOT_FOUND, "Bike Not Found.")
    }

    const result = await prisma.serviceRecord.create({
        data: payload
    })
    return result
}

const getAllServices = async () => {
    const result = await prisma.serviceRecord.findMany()
    return result
}

const getSingleService = async (id: string) => {
    const result = await prisma.serviceRecord.findUnique({
        where: {
            serviceId: id
        }
    })
    if (!result) {
        throw new AppError(status.NOT_FOUND, "Bike not found.");
    }
    return result
}

const updateService = async (id: string, data: Partial<ServiceRecord>) => {
    const result = await prisma.$transaction(async (tx) => {
        // ✅ Check if Bike exists
        const existingBike = await tx.serviceRecord.findUnique({
            where: { serviceId: id },
        });

        if (!existingBike) {
            throw new AppError(status.NOT_FOUND, "Bike not found.");
        }

        // ✅ Update Bike
        const updatedBike = await tx.serviceRecord.update({
            where: { serviceId: id },
            data,
        });

        return updatedBike;
    });

    return result;
}

const deleteService = async (id: string) => {
    await prisma.$transaction(async (tx) => {
        // Check if the Bike exists
        const existingBike = await tx.serviceRecord.findUnique({
            where: {
                serviceId: id,
            },
        });

        if (!existingBike) {
            throw new AppError(status.NOT_FOUND, "Bike not found.");
        }

        // Delete Bike
        const deletedBike = await tx.serviceRecord.delete({
            where: {
                serviceId: id,
            },
        });

        return deletedBike;
    });
}

export const serviceServices = {
    serviceCreateIntoDb,
    getAllServices,
    getSingleService,
    updateService,
    deleteService
}