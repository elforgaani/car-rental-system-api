import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema({
    rentalDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    },
    carId: {
        type: Schema.Types.ObjectId,
        ref: "Car",
        required: true
    },
    rentedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
});

export default mongoose.models.Rental || model("Rental", schema);