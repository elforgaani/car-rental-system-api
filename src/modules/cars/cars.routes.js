import { Router } from "express";
import * as CarsController from "./cars.controller.js";
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { addCarRequestInputVlidationMiddleware } from "../../middlewares/validators.middleware.js";
const router = Router();

router.post('', authMiddleware, addCarRequestInputVlidationMiddleware, CarsController.addCar);
router.get('/:id', authMiddleware, CarsController.getSpecificCar);
router.get('/', authMiddleware, CarsController.getAllCars);
router.put('/:id', authMiddleware, CarsController.updateCar);
router.delete('/:id', authMiddleware, CarsController.deleteCar);


export default router;
