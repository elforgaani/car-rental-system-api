import { Router } from "express";
import * as CarsController from "./cars.controller.js";
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { addCarRequestInputVlidationMiddleware } from "../../middlewares/validators.middleware.js";
const router = Router();

router.post('', authMiddleware, addCarRequestInputVlidationMiddleware
    , CarsController.addCar);
router.get('/get-cars-based-on-model', authMiddleware, CarsController.getCarsBasedOnModel);
router.get('/get-available-cars', authMiddleware, CarsController.getAvailableCars);
router.get('/rented-or-by-name', authMiddleware, CarsController.rentedOrByName);
router.get('/available-or-rented', authMiddleware, CarsController.availableOrRented)


router.get('/:id', authMiddleware, CarsController.getSpecificCar);
router.get('/', authMiddleware, CarsController.getAllCars);
router.put('/:id', authMiddleware, CarsController.updateCar);
router.delete('/:id', authMiddleware, CarsController.deleteCar);




export default router;
