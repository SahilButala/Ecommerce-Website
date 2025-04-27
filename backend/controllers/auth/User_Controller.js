import bycrypt from "bcryptjs";
import UserModel from "../../models/User.model.js";
import jwt from "jsonwebtoken";

const Register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName && !email && !password) {
      return res.status(401).json({
        sucess: false,
        message: "Provide correct and each details",
      });
    }

    const emailAlreadyExsist = await UserModel.find({ email});

    // if(userName){
    //   return res.status(404).json({
    //     sucess: false,
    //     message: "username already exsist try different username",
    //   });
    // }

    if (emailAlreadyExsist) {
      return res.status(404).json({
        sucess: false,
        message: "email already exsist try different email",
      });
    }
    const hashPass = await bycrypt.hash(password, 10);

    const user = new UserModel({
      userName,
      email,
      password: hashPass,
    });

    await user.save();

    res.status(201).json({
      sucess: true,
      message: "User Register successfully...",
      user,
    });
  } catch (error) {
    return res.status(401).json({
      sucess: false,
      message: error.message,
    });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking mail is already exsist in db or not
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        sucess: false,
        message: "Your email was incorrect. Please try again.",
      });
    }

    // check user enter correct password or not
    const CheckPass = await bycrypt.compare(password, user.password);

    if (!CheckPass) {
      return res.status(401).json({
        sucess: false,
        message: "you enter wrong password please try again..",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.cookie("token", token, { httpOnly: true, secure: false }).json({
      sucess: true,
      message: "Login successfully",
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    res.status(401).json({
      sucess: false,
      message: "try again server error" || error.message,
    });
    console.log(error);
  }
};
const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 }).json({
      sucess: true,
      message: "Logout successfully...",
    });
  } catch (error) {
    return res.json({
      sucess: false,
      message: error.message,
    });
  }
};
const checkAuth = (req, res) => {
  try {
    const {user} = req.user;
    return res.json({
      sucess: true,
      message: "Authinticated user..",
      user,
    });
  } catch (error) {
    return res.json({
      sucess: false,
      message: "some error occured.." || error.message,
    });
  }
};

export { Register, Login, logout, checkAuth };
