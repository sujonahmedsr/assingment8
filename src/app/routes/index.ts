import { Router } from "express";
import { customerRoutes } from "../modules/Customer/user.route";
import { bikeRoutes } from "../modules/Bike/bike.route";
import { serviceRoutes } from "../modules/Service/service.routes";

const router = Router()

router.use('/customers', customerRoutes)
router.use('/bikes', bikeRoutes)
router.use('/services', serviceRoutes)

export default router;