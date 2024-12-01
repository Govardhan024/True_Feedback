'use client'

import { useToast } from "@/components/ui/use-toast";
import { verifySchema } from "@/schemas/verifySchema";
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Form } from "@/components/ui/form"
import { FormControl, FormLabel, FormItem, FormField, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Loader2 } from "lucide-react"

export default function Verify() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(verifySchema),
    })

    const onSubmit = async (data) => {
        
        try {
            
            const response = await axios.post("/api/verify-code", {
                username: params.username,
                code: data.code,
            })
            

            if(response){
                toast({
                    title: 'verification successful',
                    description:response.data.message,
                    veriant: "success"
                })
                router.replace('dashboard');

            }
        
           

        } catch (err) {

            toast({
                title: 'verification failed',
                description:response.data.message,
                veriant: "distructive"
            })
        }
    }




    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Verify Your Account
                    </h1>
                    <p className="mb-4">Enter the verification code sent to your email</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verify code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter code" {...field} />
                                    </FormControl>
                                    
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}