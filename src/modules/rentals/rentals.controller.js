import Car from "../../DB/models/car.model.js";
import Rental from "../../DB/models/rental.model.js";
import { internalServerErrorResponse } from "../../utils/constants.js";

export const createRental = async (req, res) => {
  const { rentalObject } = req;
  const { id: userId } = req.user;
  rentalObject.rentedBy = userId;
  try {
    const car = await Car.findById(rentalObject.carId);
    if (!car) {
      return res
        .status(404)
        .json({ success: true, message: "Car Doesn't Exist" });
    }
    if (car.isRented) {
      return res.status(400).json({
        success: false,
        message: "Car is Already Rented, You Can't Rent it.",
      });
    }
    const rental = await Rental.create(rentalObject);
    const catUpdateResults = await Car.findByIdAndUpdate(rentalObject.carId, {
      isRented: true,
    });
    res.status(201).json({
      success: false,
      message: "Rental Created Successfully",
      data: rental,
    });
  } catch (error) {
    res.status(500).json(internalServerErrorResponse);
  }
};
export const updateRental = async (req, res, next) => {};
export const deleteRental = async (req, res, next) => {};
export const getAllrentals = async (req, res, next) => {
  try {
    const rentals = await Rental.find();
    res.status(200).json({ success: true, data: rentals });
  } catch (error) {}
};
export const getSpecificRental = async (req, res, next) => {};
