import { compare, compareSync, hashSync } from 'bcrypt';
import User from '../../DB/models/user.model.js'
import { internalServerErrorResponse } from '../../utils/constants.js';
import jwt from 'jsonwebtoken';
import pagination from '../../utils/pagintaion.js'

export const signUp = async (req, res) => {
    const { userObject } = req;
    const { email, password } = userObject;
    try {
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({ success: false, message: "User Already Exist" });
        }
        const hashedPassword = hashSync(password, 10);
        userObject.password = hashedPassword;
        await User.create(userObject);
        res.status(201).json({ success: true, message: "User Created Successfully." });
    } catch (error) {
        res.status(500).json(internalServerErrorResponse);
    }
};

export const signIn = async (req, res) => {
    const { userObject } = req;
    const { email, password } = userObject;
    try {
        const user = await User.findOne({ email }, { email: 1, name: 1, password: 1 });
        if (!user) {
            return res.status(404).json({ success: false, message: "User doesn't Exist" })
        }
        const isRightPassword = compareSync(password, user.password);
        if (!isRightPassword) {
            return res.status(401).json({
                success: false, message: "Password is Wrong!"
            });
        }
        const userData = {
            id: user._id,
            email: user.email,
        }
        const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '3h' });
        res.status(200).json({
            success: true, message: "User Logged In Successfully", data: { ...userData, token }
        })
    } catch (error) {
        res.status(500).json(internalServerErrorResponse)
    }
};

export const getSpecificUser = async (req, res) => {
    const { email } = req.params;
    if (!email) {
        return res.status(400).json({ success: false, message: "User Email must be Included as Param" });
    }
    try {
        const user = await User.findOne({ email }, { password: 0 });
        if (!user) {
            return res.status(404).json({ success: false, message: "User Doesn't Exist" });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json(internalServerErrorResponse)
    }
};

export const getAllUsers = async (req, res) => {
    let { page } = req.query
    if (!page) page = 1;
    console.log(page);
    try {
        const count = await User.countDocuments();
        const users = await User.find({}, { password: 0 }, { ...pagination(page) });
        const meta = { page: parseInt(page), pages: Math.ceil(count / 6) }
        res.status(200).json({ success: true, meta, data: users });
    } catch (error) {
        console.log(error);
        res.status(500).json(internalServerErrorResponse)
    }
};

export const updateUser = async (req, res) => {
    const { user } = req
    const { email, phone_number } = req.body
    if (!email || !phone_number) res.status(400).json({ success: false, message: "Error While Parsing Body" });
    try {
        await User.findByIdAndUpdate(user.id, { email, phone_number });
        res.status(200).json({ success: true, message: "User Updated Successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json(internalServerErrorResponse)
    }
};

export const deleteUser = async (req, res) => {
    const { user } = req;
    try {
        await User.findByIdAndDelete(user.id);
        res.status(200).json({ success: true, message: "User Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json(internalServerErrorResponse)
    }
};
