import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ success: false, messsage: "Token is Required" });
    }
    const token = authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Access Denied",
        })
    }
}