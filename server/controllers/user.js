import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

export const signin = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({message: "User doesn't exist."});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentails"});

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.ACCESS_SECRET, { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({message: 'Server went wrong.'});
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body; //confrimPassword는 사실 models 스키마에 없음. 안넣어도됌

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({message: "User already exist."});

        if(password !== confirmPassword) return res.status(400).json({message: "Passwords don't match."}); //비번 일치하는지, 다를시 400에러 콘솔로그

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.ACCESS_SECRET, { expiresIn: "1h" });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({message: 'Server went wrong.'});

        console.log(error);
    }
    
}