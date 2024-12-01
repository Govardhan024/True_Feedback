import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";

const UsernameQuerySchema = z.object({
    username: usernameValidation
});

export async function GET(request) {
    try {
        console.log("Connecting to the database...");
        await dbConnect();
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Database connection error:", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Database connection error"
        }), {
            status: 500
        });
    }

    try {
        const { searchParams } = new URL(request.url);
        const queryParams = {
            username: searchParams.get('username')
        };
        const result = UsernameQuerySchema.safeParse(queryParams);

        console.log("Validation result:", result);

        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            return new Response(JSON.stringify({
                success: false,
                message: usernameErrors.length > 0 ? usernameErrors.join(', ') : "Invalid query parameters"
            }), {
                status: 400
            });
        }

        const { username } = result.data;
        console.log(`Checking if username "${username}" is unique...`);
        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true });

        if (existingVerifiedUser) {
            console.log(`Username "${username}" is already taken.`);
            return new Response(JSON.stringify({
                success: false,
                message: "Username is already taken"
            }), {
                status: 401
            });
        }

        console.log(`Username "${username}" is unique.`);
        return new Response(JSON.stringify({
            success: true,
            message: "Username is unique"
        }), {
            status: 200
        });

    } catch (error) {
        console.error("Error checking username:", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Error checking username"
        }), {
            status: 500
        });
    }
}
