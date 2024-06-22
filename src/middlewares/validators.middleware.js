import * as yup from "yup";

export const signUpRequestInputVaildator = async (req, res, next) => {
  const { name, email, phone_number, password } = req.body;
  const userObject = { name, email, phone_number, password };
  const validationSchama = yup.object({
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

  try {
    const isValidBody = validationSchama.validateSync(userObject);
    console.log(isValidBody);
    res.json({ message: "done" });
  } catch (error) {
    console.log(error);
    res.status()
    res.json({ message: "Error" });
  }
};
