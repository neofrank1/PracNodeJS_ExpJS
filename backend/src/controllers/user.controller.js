import { User } from "../models/user.model.js";


const registerUser = async (req, res) => {
    try {

        const { username, email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // check if the user is already registered
        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // create a new user

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const loginUser = async (req, res) => { 
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user exists (Login) if not return error

        const checkUser = await User.findOne({
            email: email.toLowerCase()
        });

        // Check Password

        const isMatch = await checkUser.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        } else {
            return res.status(201).json({ 
                message: "User logged in successfully",
                id: checkUser._id,
                username: checkUser.username,
                email: checkUser.email
            });
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}


export {
    registerUser,
    loginUser
}