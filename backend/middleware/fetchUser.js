const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

const SECRET_KEY = process.env.SECRET_KEY;

// Middleware para verificar el token de autenticación
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ errors: "Please authenticate using valid token" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ errors: "Please authenticate using valid token" });
    }
};
module.exports = fetchUser;