import dbConnect  from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";


export async function POST(req, res){
    dbConnect();

    try {
        const { email, password } = await req.body; // Assuming you're using req.body instead of req.json()
        console.log(email, password);

        const user = await UserModel.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email is not registered. You need to sign up first."
            });
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        // Create token
        const token = Jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

        // Set cookie
        res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);

        return res.status(200).json({
            message: "Login successful",
            success: true,
        });
    } catch (err) {
        console.log("Login failed", err);
        return res.status(500).json({ error: err.message });
    }
}
