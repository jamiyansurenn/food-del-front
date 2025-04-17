// "use client";
// import { useEffect, useState } from "react";
// import FirstPage from "./FirstPage";
// import SecondPage from "./SecondPage";

// export default function SignUp() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const FormSteps = [FirstPage, SecondPage][currentStep];

//   useEffect(() => {
//     setCurrentStep(Number(0));
//   }, []);

//   return (
//     <div
//       className="w-[50%] cursor-default h-screen flex items-center justify-center"
//       key={currentStep}
//     >
//       {/* <FormSteps currentStep={currentStep} setCurrentStep={setCurrentStep} /> */}
//     </div>
//   );
// }

"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner"
import { useRouter } from 'next/navigation'

export type ErrorType = {
    response: {
        data: {
            error: string;
        };
    };
    message: string;
};

const SignUp = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            const user = await axios.post(`${BASE_URL}/auth/signup`, value);
            if (user) {
                toast("User successfully registered");
                router.push("/login")
            }
        } catch (error: unknown) {
            setError((error as ErrorType).response.data.error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="email" type="email" {...field} />
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
                                    <FormControl>
                                        <Input placeholder="password" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {error && <p className="text-red-500">{error}</p>}
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>

            </div>
        </div>
    )
}


export default SignUp