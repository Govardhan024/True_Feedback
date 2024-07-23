import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(req) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!session || !user) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Not authenticated. Please login first."
            }),
            { status: 401 }
        );
    }

    const userId = user._id;
    const { acceptMessages } = await req.json();

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessages: acceptMessages },
            { new: true }
        );

        if (!updatedUser) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Failed to update user status to accept messages."
                }),
                { status: 401 }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Message status updated successfully.",
                updatedUser
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Failed to update user status to accept messages:", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to update user status to accept messages."
            }),
            { status: 500 }
        );
    }
}

export async function GET(req) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!session || !user) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Not authenticated. Please login first."
            }),
            { status: 401 }
        );
    }

    const userId = user._id;

    try {
        const foundUser = await UserModel.findById(userId);

        if (!foundUser) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "User not found."
                }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                isAcceptingMessages: foundUser.isAcceptingMessages
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Failed to get user message acceptance status:", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to get message acceptance status."
            }),
            { status: 500 }
        );
    }
}
