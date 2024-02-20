const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
  try {
    //get email
    const { email } = req.body;
    //check user exist or email validation
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      });
    }
    //generate token
    const token = crypto.randomBytes(20).toString("hex");

    //update user with token
    const updatedDeatils = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    );
    //createUrl
    const url = `http://localhost:3000/update-password/${token}`;
    //send mail
    await mailSender(
      email,
      "Password Reset Link",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );
    //retrun response
    return res.status(200).json({
      success: true,
      message: "Email sent successfully, Please Check Your Email to Continue Further",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went Wrong while sending Email",
    });
  }
};

//resetPassword

exports.resetPassword = async (req, res) => {
  try {
    //data fetch
    const { password, confirmPassword, token } = req.body;
    //validation
    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Password does not match",
      });
    }
    //get userDetails from db using token
    const userDetails = await User.findOne({ token: token });
    //if no entry - invalid token
    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    //token time
    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(401).json({
        success: false,
        message: "Token is expired, please regenerate token",
      });
    }
    //hashpassword
    const hashedPassword = await bcrypt.hash(password, 10);

    //updatePassword
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went Wrong while reseting password",
    });
  }
};
