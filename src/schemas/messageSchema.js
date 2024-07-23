import {z} from "zod"


export const messageSchema=z.object({
   
   content:z.string().min(10,{message: 'content must be atleast 10 characters'})
})