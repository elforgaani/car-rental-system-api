import mongoose from "mongoose";


const { Schema, model } = mongoose

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    isRented: {
        type: Boolean,
        required: true,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true })

export default mongoose.models.Car || model("Car", schema);