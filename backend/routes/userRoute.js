const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");
const { auth } = require("../middleware/authMiddleware");
const { MovieModel } = require("../models/movie");


require('dotenv').config();
const userRoute = express.Router();



// employee register route
userRoute.post("/register", async(req,res)=>{
    const { email, password} = req.body;

    try {
        const user = await UserModel.findOne({ email });

        // Check if user already exists

        if (user) {
            return res.status(400).send({ "message": "User Already Present With this Email" });
        }

        // Hashing the password before saving to the database
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.status(500).send({ "message": "Error hashing password" });
            }

            // Creating a new user instance

            const newUser = new UserModel({
                email,
                password: hash
            });

            // Saving the new user to the database

            await newUser.save();
            res.status(200).send({ message: "Registration successful" });
        });
    } catch (error) {
        res.status(500).send({ "message": error.message });
    }
});

// employee login route
userRoute.post("/login", async(req,res)=>{
    // Extracting login credentials from request body
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            // Comparing the hashed password
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                    user.isLoggedIn = true;
                    await user.save();
                    // Creating a JWT token upon successful login
                    res.status(200).send({ "message": "Login Successful", user, token: jwt.sign({ userId: user._id , userRole : user.role }, process.env.secretKey) });
                } if (err || !result) {
                    res.status(400).send({ "message": "Incorrect email or password, please try again." });
                }
            });
        } else {
            res.status(400).send({ "message": "Incorrect email or password, please try again." });
        }
    } catch (error) {
        res.status(400).send({ "message": error.message });
    }
});

userRoute.post('/logout', auth ,async (req, res) => {
    try {
      // Find the user by ID
      const user = await UserModel.findById(req.body.userId);
  
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      // Update isLoggedIn field to false
      user.isLoggedIn = false;
      await user.save();
  
      res.status(200).send({ message: 'Logout successful' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: 'Server Error' });
    }
  });


userRoute.post("/addtowishlist/:movieId",auth ,async(req,res)=>{
    const { movieId } = req.params;
    const userId = req.body.userId; // Assuming auth middleware adds user to req object

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send({ "message": "User not found" });
        }

        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            return res.status(404).send({ "message": "Movie not found" });
        }

        // Check if movie already exists in the wishlist
        if (user.wishlist.includes(movieId)) {
            return res.status(400).send({ "message": "Movie already exists in the wishlist" });
        }

        // Add movie to the user's wishlist
        user.wishlist.push(movieId);
        await user.save();

        res.status(200).send({ "message": "Movie added to wishlist successfully" });
    } catch (error) {
        res.status(500).send({ "error": error.message });
    }
})

userRoute.get("/wishlist", auth, async (req, res) => {
    const userId = req.body.userId; // Assuming auth middleware adds user to req object

    try {
        const user = await UserModel.findById(userId).populate("wishlist");
        if (!user) {
            return res.status(404).send({ "message": "User not found" });
        }
        
        res.status(200).send({ "wishlist": user.wishlist });
    } catch (error) {
        res.status(500).send({ "error": error.message });
    }
});

userRoute.delete("/removeFromWishlist/:movieId", auth, async (req, res) => {
    const { movieId } = req.params;
    const userId = req.body.userId; 
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send({ "message": "User not found" });
        }

        // Remove movie from the user's wishlist
        user.wishlist = user.wishlist.filter(id => id.toString() !== movieId);
        await user.save();

        res.status(200).send({ "message": "Movie removed from wishlist successfully" });
    } catch (error) {
        res.status(500).send({ "error": error.message });
    }
});

module.exports = {userRoute}