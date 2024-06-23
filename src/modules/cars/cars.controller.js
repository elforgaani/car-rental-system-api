import Car from "../../DB/models/car.model.js";
import { internalServerErrorResponse } from '../../utils/constants.js';


export const addCar = async (req, res, next) => {
    const { car } = req
    const { id } = req.user
    try {
        const results = await Car.create({ ...car, createdBy: id });
        console.log(results);
        res.status(201).json({ success: true, message: "Car Added Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json(internalServerErrorResponse)
    }
}

export const getSpecificCar = async (req, res, next) => { }

export const getAllCars = async (req, res, next) => { }

export const updateCar = async (req, res, next) => { }

export const deleteCar = async (req, res, next) => { }