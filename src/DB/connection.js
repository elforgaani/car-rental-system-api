import mongoose from "mongoose";

export const dbConnection = async () => {
  const dbInfo = process.env.MONGOATLAS_URL;
  try {
    await mongoose.connect(dbInfo);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Error While Connecting to Database: " + error);
  }
};
