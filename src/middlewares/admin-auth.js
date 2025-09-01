const jwt = require("jsonwebtoken");

const { jwtKey } = require('../config/server-config.js');

exports.authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const admin = await jwt.verify(token, jwtKey);
    const adminId = admin.id;
    req.body = {...req.body, adminId};
    next();
  } catch (error) {
    console.log('this is the error', error);
    return res.status(401).json({ 
        success:false,
        message: "User not authenticated",
        error: error
    });
  }
};
