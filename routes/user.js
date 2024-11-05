const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const { User } = require("../schema/user.schema");
const dotenv = require("dotenv");
const { checkSchema, validationResult } = require("express-validator");
dotenv.config();

// Validation schema for registration
const userRegistrationSchema = checkSchema({
    name: {
        notEmpty: {
            errorMessage: "Name is required"
        }
    },
    email: {
        isEmail: {
            errorMessage: "Please enter a valid email"
        }
    },
    password: {
        isLength: {
            options: { min: 8 },
            errorMessage: "Password must be at least 8 characters long"
        }
    },
    confirmPassword: {
        custom: {
            options: (value, { req }) => value === req.body.password,
            errorMessage: "Passwords do not match"
        }
    }
});

// Register a user
router.post("/register", userRegistrationSchema, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    const ifUserExists = await User.findOne({ email });
    if (ifUserExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
});

// Get all users
router.get("/", async (req, res) => {
    const users = await User.find().select("-password -_id");
    res.status(200).json(users);
});

// Get user by email
router.get("/:email", async (req, res) => {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
});

// Login user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Wrong email or password" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "Wrong email or password" });
    }
    const payload = { id: user._id };
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET);
    res.status(200).json({ token });
});

module.exports = router;
