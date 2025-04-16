import { NextFunction, Request, Response } from "express"
import status from "http-status"

export const notFoundApi = ((req: Request, res: Response, next: NextFunction) => {
    res.status(status.NOT_FOUND).json({
        success: false,
        message: 'API Not Found!',
    })
})