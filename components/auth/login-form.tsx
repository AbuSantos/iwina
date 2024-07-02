"use client"
import * as z from "zod"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form"
import { LoginSchema } from "@/schemas"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import eye from "@/public/images/eye.svg"
import Image from "next/image"
import { AiOutlineConsoleSql } from "react-icons/ai"
import { signIn } from "next-auth/react"
import { Login } from "@/actions/login"
export const LoginForm = () => {

    {/**
     Initialize the form with react-hook-form, integrating Zod for validation
 - The form's validation schema is defined using Zod's `LoginSchema`
 - `useForm` hook is used to handle form state and validation
 - `zodResolver` is used to connect Zod schema validation with react-hook-form
 - Default values for the form fields are set to empty strings
 @Usage:
 This setup enables the form to use `LoginSchema` for validating the email and password fields.
*/}
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    })
    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        Login(values)
        console.log(values);

    }
    console.log(form)
    return (
        <CardWrapper
            headLabel="Welcome Back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial
        >
            <Form {...form}>
                {/* the handle submit comes from the form constant */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="iwinosa@gmail.com"
                                            type="text"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        >

                        </FormField>
                    </div>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                        />
                                    </FormControl>
                                    {/* <Image src={eye} alt="eye" /> */}
                                </FormItem>
                            )}
                        >

                        </FormField>
                    </div>
                    <Button size="lg" className="w-full" type="submit">Login As a Kid</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default LoginForm