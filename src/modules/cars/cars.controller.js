import Car from "../../DB/models/car.model.js";
import { internalServerErrorResponse } from "../../utils/constants.js";
import pagination from "../../utils/pagintaion.js";
import { isHex } from "../../utils/validation_schemas.js";

export const addCar = async (req, res, next) => {
  const { car } = req;
  const { id } = req.user;
  try {
    const results = await Car.create({ ...car, createdBy: id });
    console.log(results);
    res.status(201).json({ success: true, message: "Car Added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(internalServerErrorResponse);
  }
};

export const getSpecificCar = async (req, res, next) => {
  const { id } = req.params;
  const isValidId = isHex(id);
  if (!isValidId) {
    return res
      .status(400)
      .json({ success: false, message: "Car Id is Invalid" });
  }
  try {
    const car = await Car.findById(id);
    if (!car) {
      res
        .status(404)
        .json({ success: false, message: "Car is does not found" });
    }
    res.status(200).json({ sucess: true, data: car });
  } catch (error) {
    console.log(error);
    res.status(500).json(internalServerErrorResponse);
  }
};

export const getAllCars = async (req, res, next) => {
  let { page } = req.query;
  if (!page) page = 1;
  try {
    const cars = await Car.find({}, {}, { ...pagination(page) });
    const count = await Car.countDocuments();
    const meta = { page: parseInt(page), pages: Math.ceil(count / 6) };
    res.status(200).json({ success: true, meta, data: cars });
  } catch (error) {
    console.log(error);
    res.status(500).json(internalServerErrorResponse);
  }
};

export const updateCar = async (req, res, next) => {
  const { id: userId } = req.user;
  const { isRented } = req.body;
  const { id: carId } = req.params;
  const isValidId = isHex(carId);

  if (!isValidId) {
    return res
      .status(400)
      .json({ success: false, message: "Car Id is Invalid" });
  }
  if (isRented == null || isRented == undefined) {
    return res
      .status(400)
      .json({ success: false, message: "isRented is Required" });
  }
  try {
    const car = await Car.findById(carId);
    if (!car) {
      return res
        .status(404)
        .json({ success: false, message: "Car Doesn't Exist" });
    }
    // Todo: Refactor this, (This Belongs to rental API)
    if (car.isRented) {
      return res.status(200).json({
        success: false,
        message: "Car is Already Rented, You Can't Rent It",
      });
    }
    await Car.updateOne({ _id: carId }, { isRented });
    res.status(200).json({
      success: true,
      message: "Car Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(internalServerErrorResponse);
  }
};

export const deleteCar = async (req, res, next) => {
  const { id: carId } = req.params;
  const isValidId = isHex(carId);
  if (!isValidId) {
    return res
      .status(400)
      .json({ success: false, message: "Car Id is Invalid" });
  }
  try {
    const car = await Car.findById(carId);
    if (!car) {
      return res
        .status(404)
        .json({ success: false, message: "Car doesn't exist" });
    }
    await Car.deleteOne({ _id: carId });
    res
      .status(200)
      .json({ success: true, message: "Car Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(internalServerErrorResponse);
  }
};


export const getCarsBasedOnModel = async (req, res) => {
  const { model1, model2 } = req.query;
  try {
    const cars = await Car.find({ $or: [{ name: model1 }, { name: model2 }] });


    res.status(200).json({ success: true, data: cars })
  } catch (error) {
    console.log(error);
    res.status(500).json(internalServerErrorResponse);
  }
}

export const getAvailableCars = async (req, res, next) => {
  const { model } = req.query;
  if (!model) {
    return res.status(400).json({ success: false, message: "Model is required" });
  }
  try {

    const cars = await Car.find({ name: model, isRented: false });
    res.status(200).json({ success: true, data: cars });
  } catch (error) {
    res.status(500).json(internalServerErrorResponse);
    res.status(500).json(internalServerErrorResponse);

  }
}

export const rentedOrByName = async (req, res, next) => {
  const { model } = req.query;
  console.log(model);
  const isRented = model ? null : true;
  console.log(isRented);
  try {
    const cars = await Car.find({ $or: [{ name: model }, { isRented }] })
    res.status(200).json({ success: true, data: cars });
  } catch (error) {
    res.status(500).json(internalServerErrorResponse);
  }
}

export const availableOrRented = async (req, res, next) => {
  const { isRented, model } = req.query;
  if (!isRented || !model || !(isRented === 'true' || isRented === 'false')) {
    
    return res.status(400).json({ success: false, message: "Parameters Can't be null" });
  }
  try {
    const cars = await Car.find({ $and: [{ name: model }, { isRented }] })
    res.status(200).json({ success: true, data: cars })
  } catch (error) {
    console.log(error);
    res.status(500).json(internalServerErrorResponse);
  }
}