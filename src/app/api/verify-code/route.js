import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(req){
    await dbConnect();
    try{
        const{username,code}=await req.json();
        console.log(code);
        
        
        const decodedUsername=decodeURIComponent(username)
        const user=await UserModel.findOne({username:decodedUsername})
        console.log("user",user.verifyCode);
        

        if(!user){
            return Response.json(
                {
                    success:false,
                    message:"user not found"
                },{status:500}
            )
        
            
        }
        const isCodeValid=user.verifyCode===code
        
        const isCodeNotExpired=new Date(user.verifyCodeExpiry)>new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified=true,
            await user.save();
            return Response.json(
                {
                    success:true,
                    message:"acount verified successfully"
                },{status:200}

        )}
        else if(!isCodeNotExpired){
            return Response.json(
                {
                    success:false,
                    message:"verification code has expired plese sign up again"
                },{status:400}
        )}else{
            return Response.json(
                {
                    success:false,
                    message:"incorrect verification code"
                },{status:500}
        )}

    }catch(error){
        console.error("error verifying user",err);
        return Response.json(
            {
                success:false,
                message:"Error verifying User "
            },{status:500}
        )
    }
}