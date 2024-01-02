import passport from "passport";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import initialize from "../passport-config";

export const Init = initialize(
  passport,
  async (email) => {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  async (id) => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

export const registerUser = async (req,res) => {
    try
    {
      const hash = await bcrypt.hash(req.body.password, 10)
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
      })
  
      await newUser.save()
      res.status(200).json( { message: "User registered" } )
    }
    catch(err)
    {
      res.status(500).json( { message: "Server Error" } )
    }
  }

export const userLogin = async (req, res) => {
    try
    {
      const loginUser = await User.findOne( { email: req.body.formData.email });
      if(!loginUser)
      {
       return res.status(404).json( { message: "User not found" } )
      }
      if(await bcrypt.compare(req.body.formData.password, loginUser.password))
      {
       const accessToken = jwt.sign({ sub: loginUser.email }, 'Password1', {
         expiresIn: 3600,
       });
       res.cookie('AccessToken', accessToken, {
         secure: false,
         maxAge: 3600000,
         Path: '/'
       });
       return res.status(200).json({message: "Login succesful"})
      }
      else
      {
       return res.status(400).json({message: "Wrong Password"})
      }
    }
    catch(err)
    {
     console.log(err)
     return res.status(500).json({message: "Internal server error"})
    }
   }
   
export const userLogout = async (req,res) => {
     try
     {
       res.clearCookie('AccessToken');
       return res.status(200).json({message: "Logout succesful"})
     }
     catch(error)
     {
       console.error(error)
       return res.status(500).json({message: "Internal server error"})
     }
   }