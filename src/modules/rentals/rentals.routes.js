import { Router } from "express";
import * as RentalsController from "./rentals.controller.js";
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { createRentalInputValidationMiddleware } from '../../middlewares/validators.middleware.js';
const router = Router();

router.post('/', authMiddleware, createRentalInputValidationMiddleware, RentalsController.createRental);
router.put('/:id', authMiddleware, RentalsController.updateRental);
router.delete('/:id', authMiddleware, RentalsController.deleteRental)
router.get('/', authMiddleware, RentalsController.getAllrentals)
router.get('/:id', authMiddleware, RentalsController.getSpecificRental)


export default router;
