import { RequestHandler } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendRespose } from "../../utils/sendResponse"
import status from "http-status"
import { serviceServices } from "./service.services"

const ServiceCreate: RequestHandler = catchAsync(async (req, res) => {
    const result = await serviceServices.serviceCreateIntoDb(req.body)
    sendRespose(res, {
        statusCode: status.CREATED,
        success: true,
        message: "Service added successfully",
        data: result
    })
})

const getAllServices: RequestHandler = catchAsync(async (req, res) => {
    const result = await serviceServices.getAllServices()
    sendRespose(res, {
        statusCode: status.OK,
        success: true,
        message: "Services fetched successfully",
        data: result
    })
})

const getSingleService: RequestHandler = catchAsync(async (req, res) => {
    const { ServiceId } = req.params
    const result = await serviceServices.getSingleService(ServiceId)
    sendRespose(res, {
        statusCode: status.OK,
        success: true,
        message: "Service fetched successfully",
        data: result
    })
})

const serviceCompleted: RequestHandler = catchAsync(async (req, res) => {
    const { ServiceId } = req.params
    const result = await serviceServices.serviceCompleted(ServiceId)
    sendRespose(res, {
        statusCode: status.OK,
        success: true,
        message: "Service updated successfully",
        data: result
    })
})

const updateService: RequestHandler = catchAsync(async (req, res) => {
    const { ServiceId } = req.params
    const result = await serviceServices.updateService(ServiceId, req.body)
    sendRespose(res, {
        statusCode: status.OK,
        success: true,
        message: "Service updated successfully",
        data: result
    })
})

const deleteService: RequestHandler = catchAsync(async (req, res) => {
    const { ServiceId } = req.params
    const result = await serviceServices.deleteService(ServiceId)
    sendRespose(res, {
        statusCode: status.OK,
        success: true,
        message: "Service deleted successfully",
        data: result
    })
})

export const ServiceController = {
    ServiceCreate,
    getAllServices,
    getSingleService,
    serviceCompleted,
    updateService,
    deleteService
}