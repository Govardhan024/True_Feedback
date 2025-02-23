import sendVerificationEmail from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { Link } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";

export async function POST(req) {

    await dbConnect();
    

    try {
        
        const { username, email, password } = await req.json();
        console.log(username,email,password);

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        });

        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, { status: 400 });
        }

        const existingUserByEmail = await UserModel.findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already exists with this email",
                }, { status: 500 })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate, 
                isVerified: true,
                isAcceptingMessages: true,
                messages: []
            })
            console.log(newUser)
            
            await newUser.save();
            
            
        }

        // Send verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode,
        );

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, { status: 500 });
        }

        return Response.json({
            success: true,
            message: "User registered successfully. Please verify your email"
        }, { status: 201 });

    } catch (error) {
        console.error('Error registering user', error);
        return Response.json({
            success: false,
            message: "Error registering user"
        }, {
            status: 500
        });
    }
}