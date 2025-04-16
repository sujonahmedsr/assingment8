import { Response } from "express";

type TMeta = {
    page: number,
    limit: number,
    total: number
}

type TResponse <T> = {
    statusCode: number,
    success: true,
    message: string,
    meta?: TMeta,
    data: T
}

export const sendRespose = <T> (res: Response, data: TResponse<T>) => {
    res.status(data?.statusCode).json({
        success: data.success,
        message: data.message,
        meta: data.meta,
        data: data.data
    })
}