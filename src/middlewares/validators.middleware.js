import { addCarRequestBodyValidationSchema, signInRequestBodyValidationSchema, signUpRequestBodyValidationSchama } from "../utils/validation_schemas.js";

export const signUpRequestInputVaildatorMiddleware = async (req, res, next) => {
  const { name, email, phone_number, password } = req.body;
  const userObject = { name, email, phone_number, password };
  try {
    signUpRequestBodyValidationSchama.validateSync(userObject);
    req.userObject = userObject;
    next();
  }
  catch (error) {
    const { errors } = error;
    res.status(400).json({
      success: false,
      message: "Error While parsing body",
      errors
    })
  }
};

export const signInRequestInputVlidationMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  const userObject = { email, password };
  try {
    signInRequestBodyValidationSchema.validateSync(userObject);
    req.userObject = userObject;
    next();
  } catch (error) {
    const { errors } = error
    res.status(400).json({
      success: false,
      message: "Error While parsing body",
      errors
    })
  }
}

export const addCarRequestInputVlidationMiddleware = async (req, res, next) => {
  const { name, model, isRented, createdBy } = req.body;
  const car = { name, model, isRented, createdBy }
  try {
    addCarRequestBodyValidationSchema.validateSync(car);
    req.car = car;
    next();
  } catch (error) {
    const { errors } = error
    res.status(400).json({
      success: false,
      message: "Error While parsing body",
      errors
    })
  }
}