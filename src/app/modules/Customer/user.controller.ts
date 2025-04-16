import { RequestHandler } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendRespose } from "../../utils/sendResponse"
import status from "http-status"
import { customerService } from "./user.service"

const customerCreate: RequestHandler = catchAsync(async (req, res) => {
    const result = await customerService.customerCreateIntoDb(req.body)
    sendRespose(res, {
        statusCode: status.CREATED,
        success: true,
        message: "Customer created successfully",
        data: result
    })
})

const getAllCustomer: RequestHandler = catchAsync(async (req, res) => {
    const result = await customerService.getAllCustomerFromDb()
    sendRespose(res, {
        statusCode: status.OK,
        success: true,
        message: "Customers fetched successfully",
        data: result
    })
})

const getSingleCustomer: RequestHandler = catchAsync(async (req, res) => {
    const { customerId } = req.params
    const result = await customerService.getSingleCustomerFromDb(customerId)
    sendRespose(res, {
        statusCode: status.OK,
        success: true,
        message: "Customers fetched successfully",
        data: result
    })
})

const updateCustomer: RequestHandler = catchAsync(async (req, res) => {
    const { customerId } = req.params
    const result = await customerService.updateCustomer(customerId, req.body)
    sendRespose(res, {
        statusCode: status.OK,
        success: true,
        message: "Customer updated successfully",
        data: result
    })
})

const deleteACustomer: RequestHandler = catchAsync(async (req, res) => {
    const { customerId } = req.params
    const result = await customerService.deleteACustomer(customerId)
    sendRespose(res, {
        statusCode: status.OK,
        success: true,
        message: "Customer deleted successfully",
        data: result
    })
})

export const customerController = {
    customerCreate,
    getAllCustomer,
    getSingleCustomer,
    updateCustomer,
    deleteACustomer
}