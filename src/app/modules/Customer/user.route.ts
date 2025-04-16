import { Router } from "express";
import { customerController } from "./user.controller";
import { validRequest } from "../../middlewares/validRequest";
import { createCustomerValidation } from "./user.validation";

const router = Router()

router.post('/',
    validRequest(createCustomerValidation),
    customerController.customerCreate
)

router.get('/', customerController.getAllCustomer)
router.get('/:customerId', customerController.getSingleCustomer)
router.patch('/:customerId', customerController.updateCustomer)
router.delete('/:customerId', customerController.deleteACustomer)

export const customerRoutes = router