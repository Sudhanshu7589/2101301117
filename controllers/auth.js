const register = require("../models/register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { companyName, ownerName, rollNo, ownerEmail,company } = req.body;
    // Check if All Details are there or not
    if (!companyName || !ownerName || !rollNo || !ownerEmail || !company) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await register.findOne({ ownerEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    const user = await register.create({
      companyName,
      ownerName,
      rollNo,
      ownerEmail,
      company,
    });

    return res.status(200).json({
      success: true,
      register,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

// Login controller for authenticating users
exports.login = async (req, res) => {
  try {
    // Get email and password from request body
    const { ownerName } = req.body;

    // Check if email is missing
    if (!ownerName) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    // Find user with provided email
    const user = await register.findOne({ ownerName });

    // If user not found with provided email
    if (!user) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }

    // Generate JWT token and Compare Password

    const token = jwt.sign(
      { email: register.OwnerEmail, id: register._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1Y",
      }
    );

    // Save token to user document in database
    register.accessCode = token;
    // Set cookie for token and return success response
    const options = {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      register,
      message: `User Login Success`,
    });
  } catch (error) {
    console.error(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};
