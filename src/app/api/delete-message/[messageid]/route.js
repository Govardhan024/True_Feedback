import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";


export async function DELETE(req,{params}) {
    const messageId=params.messageid
    console.log("delete")
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

    try {
        const updateResult=await UserModel.updateOne(
            {_id:user._id},
        { $pull:{messages:{_id:messageId}}}
    )

    if(updateResult.modifiedCount==0){
      return Response.json({
        success:false,
        message:"Messages not found or already deleted"
      },{status:404})
    }

    return Response.json({
        success:true,
        message:"Deleted"
      },{status:200})
        
    } catch (error) {
        return Response.json({
            success:false,
            message:"Error deleting message"
          },{status:500})
    }

   
}
