import { Router } from "express";
import { ServiceController } from "./service.controller";

const router = Router()

router.post('/',  ServiceController.ServiceCreate)

router.get('/', ServiceController.getAllServices)

router.get('/:ServiceId', ServiceController.getSingleService)

router.put('/:ServiceId/complete',  ServiceController.serviceCompleted)

router.patch('/:ServiceId',  ServiceController.updateService)

router.delete('/:ServiceId', ServiceController.deleteService)

export const serviceRoutes = router