import { Router } from "express";
import { bikeController } from "./bike.controller";
import { validRequest } from "../../middlewares/validRequest";
import { bikeVSchema, updatebikeVSchema } from "./bike.validation";

const router = Router()

router.post('/', validRequest(bikeVSchema), bikeController.bikeCreate)

router.get('/', bikeController.getAllBikes)

router.get('/:bikeId', bikeController.getSingleBike)

router.patch('/:bikeId', validRequest(updatebikeVSchema), bikeController.updateBike)

router.delete('/:bikeId', bikeController.deleteBike)

export const bikeRoutes = router