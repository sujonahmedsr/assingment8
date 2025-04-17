import { Router } from "express";
import { customerRoutes } from "../modules/Customer/user.route";
import { bikeRoutes } from "../modules/Bike/bike.route";

const router = Router()

router.use('/customers', customerRoutes)
router.use('/bikes', bikeRoutes)

export default router;