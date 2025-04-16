import { Router } from "express";
import { customerRoutes } from "../modules/Customer/user.route";

const router = Router()

router.use('/customers', customerRoutes)

export default router;