import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import mongoose from "mongoose";

export async function GET(req) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    

    if (!session || !user) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Not authenticated, please login first",
            }),
            { status: 401 }
        );
    }

    const userId = new mongoose.Types.ObjectId(user._id);  // Fix instantiation with 'new'

    try {
        const users = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: '$messages' },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ]);

        

        if (!users || users.length === 0) {
            return new Response(
                JSON.stringify({
                    success: true,
                    message: "No messages yet",
                }),
                { status: 200 }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                messages: users[0].messages,
            }),
            { status: 200 }
        );
    } catch (err) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Not able to fetch messages",
            }),
            { status: 500 }
        );
    }
}
