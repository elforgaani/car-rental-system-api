import * as yup from "yup";

export const signUpRequestBodyValidationSchama = yup.object({
  name: yup
    .string()
    .required()
    .min(2, "Name must be more than 2 Chars")
    .max(30, "Name must be less than 30 Chars"),
  email: yup
    .string()
    .required()
    .email()
    .max(50, "Email must be less than 50 Chars"),
  phone_number: yup
    .string()
    .required()
    .min(10, "Phone Number must be 10 Digits")
    .max(10, "Phone Number must be 10 Digits")
    .matches(/^\d+$/, "Phone Number must be numbers only"),
  password: yup
    .string()
    .required()
    .min(8, "Password must be more than 8 Chars"),
});

export const signInRequestBodyValidationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(8, "Password must be more than 8 Chars"),
});

export const addCarRequestBodyValidationSchema = yup.object({
  name: yup.string().required().max(20),
  model: yup.string().required().min(4).max(4),
  isRented: yup.boolean().required(),
});

export const isHex = (value) => {
  const hexDecOnlyRegEx = /^[0-9A-Fa-f]+$/;
  return hexDecOnlyRegEx.test(value) ?? false;
};
