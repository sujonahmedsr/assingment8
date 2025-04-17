import { ServiceRecord } from "@prisma/client";
import prisma from "../../utils/prisma";
import { AppError } from "../../middlewares/AppError";
import status from "http-status";

const serviceCreateIntoDb = async (payload: ServiceRecord) => {
    const ServiceData = await prisma.bike.findUnique({
        where: {
            bikeId: payload.bikeId
        }
    })

    if (!ServiceData) {
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
        throw new AppError(status.NOT_FOUND, "Service not found.");
    }

    return result
}

const serviceCompleted = async (id: string) => {
    const result = await prisma.$transaction(async (tx) => {
        // ✅ Check if Service exists
        const existingService = await tx.serviceRecord.findUnique({
            where: { serviceId: id },
        });

        if (!existingService) {
            throw new AppError(status.NOT_FOUND, "Service not found.");
        }

        // ✅ Update Service
        const updatedService = await tx.serviceRecord.update({
            where: { serviceId: id },
            data: {
                completionDate: new Date(),
                status: "done"
            },
        });

        return updatedService;
    });

    return result;
}


const updateService = async (id: string, data: Partial<ServiceRecord>) => {
    const result = await prisma.$transaction(async (tx) => {
        // ✅ Check if Service exists
        const existingService = await tx.serviceRecord.findUnique({
            where: { serviceId: id },
        });

        if (!existingService) {
            throw new AppError(status.NOT_FOUND, "Service not found.");
        }

        // ✅ Update Service
        const updatedService = await tx.serviceRecord.update({
            where: { serviceId: id },
            data,
        });

        return updatedService;
    });

    return result;
}

const deleteService = async (id: string) => {
    await prisma.$transaction(async (tx) => {
        // Check if the Service exists
        const existingService = await tx.serviceRecord.findUnique({
            where: {
                serviceId: id,
            },
        });

        if (!existingService) {
            throw new AppError(status.NOT_FOUND, "Service not found.");
        }

        // Delete Service
        const deletedService = await tx.serviceRecord.delete({
            where: {
                serviceId: id,
            },
        });

        return deletedService;
    });
}

const serviceStatus = async () => {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds

    const result = await prisma.serviceRecord.findMany({
        where: {
            status: {
                in: ["pending", 'in_progress']
            },
            serviceDate: {
                lt: sevenDaysAgo
            }
        }
    })
    return result
}


export const serviceServices = {
    serviceCreateIntoDb,
    getAllServices,
    getSingleService,
    serviceCompleted,
    updateService,
    deleteService,
    serviceStatus
}