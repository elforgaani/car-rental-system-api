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
    await Car.findByIdAndUpdate(rentalObject.carId, {
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
export const updateRental = async (req, res, next) => {
  const { rentalDate, returnDate, carId, rentedBy } = req.body;
  const { id: rentalId } = req.params
  try {
    const result = await Rental.findByIdAndUpdate(rentalId, { rentalDate, returnDate, carId, rentedBy });
    if (!result) {
      return res.status(404).json({ success: false, message: "Rental Does not Exist" });
    }
    res.status(200).json({ success: true, message: "Rental Updated Successfully" });
  } catch (error) {
    res.status(500).json(internalServerErrorResponse);
  }
};

export const deleteRental = async (req, res, next) => {
  const { id: rentalId } = req.params;
  try {
    const result = await Rental.findByIdAndDelete(rentalId);
    if (!result) {
      return res.status(404).json({ success: false, message: "Rental Does not Exist" });
    }
    res.status(200).json({ success: true, message: "Rental Deleted Successfully" });
  } catch (error) {
    res.status(500).json(internalServerErrorResponse);
  }
};

export const getAllrentals = async (req, res, next) => {
  try {
    const rentals = await Rental.find().populate([{ path: 'rentedBy', select: 'name email' }, { path: 'carId', select: 'name model isRented' }]);
    res.status(200).json({ success: true, data: rentals });
  } catch (error) {
    res.status(500).json(internalServerErrorResponse);
  }
};
export const getSpecificRental = async (req, res, next) => {
  const { id: rentalId } = req.params;
  try {
    const rental = await Rental.findById(rentalId);
    if (!rental) {
      return res
        .status(404)
        .json({ success: false, message: "Rental Does not Exist" });
    }
    res.status(200).json({ success: true, data: rental });
  } catch (error) {
    res.status(500).json(internalServerErrorResponse);
  }
};
