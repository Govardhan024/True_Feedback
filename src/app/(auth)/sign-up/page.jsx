'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios from "axios"
import { Form } from "@/components/ui/form"
import { FormControl, FormLabel, FormItem, FormField, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Loader2 } from "lucide-react"




export default function Page() {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounced = useDebounceCallback(setUsername, 600)
  const { toast } = useToast()
  const router = useRouter()

  //zod implimentation
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    }
  })

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckUsername(true);
        setUsernameMessage('');
        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`)

          setUsernameMessage(response.data.message)

        } catch (err) {
          console.log("error in checking unique username")
        }
        finally {
          setIsCheckUsername(false)
        }
      }
    }
    checkUsernameUnique()
  }, [username])

  const onSubmit = async (data) => {
    console.log(data);
    setIsSubmitting(true)
    try {

      const response = await axios.post("/api/sign-up", data)
      
      toast({
        title: 'success',
        description: response.data.message,
      })
      router.push(`/verify/${username}`);

      setIsSubmitting(false)
    } catch (error) {
      console.error("error in signup user", error)
      toast({
        title: 'signup failed',
       
        veriant: "distructive"
      })

      setIsSubmitting(false)
    }
  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div>
          <h1 className="text-4xl font-extrabold traking-tight lg:text-5xl md-6">
            join mystery message
          </h1>
          <p className="mb-4">sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        debounced(e.target.value)
                      }}
                    />
                  </FormControl>
                  {
                    isCheckingUsername && <Loader2 className="animate-spin" />
                  }

                  <p className={`text-sm ${usernameMessage === "Username is unique" ? 'text-green-500' : 'text-red-500'}`}>{usernameMessage}</p>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Email" {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className='w-half' >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
        </Form>
        <div>
          <p>
            Already a member?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

