const { use } = require("../Routes/AuthRouter");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');

const signup = async (req, res) =>{

    try{
        const {name, email, password} = req.body;
        const user = await UserModel.findOne({email});
        if (user) {
            return res.status(409)
                .json({message: 'User is already exist, you can login', success: false});
        }
        const userModel = new UserModel({name, email, password});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })


    } catch (err){
        res.status(500)
        .json({
            message: "Internal server error",
            success: false
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const errorMsg = 'Auth failed: email or password is wrong';

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        // Compare passwords
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Successful login response
        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.name
        });

    } catch (err) {
        console.log('Login error:', err); // Log the error
        res.status(500).json({
            message: "Email or password wrong",
            success: false
        });
    }
};

module.exports={
    signup,
    login
}

