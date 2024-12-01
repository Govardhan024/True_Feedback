import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(req){
    await dbConnect();
    const {username,content}=await req.json();
    try{
        const user=await UserModel.findOne({username});
        if(!user){
            return Response.json(
                {
                    success:false,
                    message:"user not found"
                },{status:404}
            )
        }
        //is user accepting messages
        if(!user.isAcceptingMessages){
            return Response.json(
                {
                    success:false,
                    message:"user is not accepting messages"
                },{status:403}
            )
        }
        const newMessage={content,createdAt:new Date()}
   
        user.messages.push(newMessage)
        await user.save()
        return Response.json(
            {
                success:true,
                message:"messages send successfully"
            }
        )

    }catch(err){
        console.log(err.message);
        return Response.json(
            {
                success:false,
                message:"error in adding messages"
            },{status:500}
        )
    }
}
