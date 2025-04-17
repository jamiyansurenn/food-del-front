"use client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { useState } from "react"


const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginHomePage() {
  const router = useRouter(); // Move useRouter to the top level

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const user = await axios.post(`${BASE_URL}/auth/signin`, values);
      console.log(values, "values");
      if (user) {
        toast("User successfully login.");
      }

      localStorage.setItem("token", user.data.token);

      const decodedToken: any = jwtDecode(user.data.token);

      console.log(decodedToken);

      if (decodedToken.user.role == "ADMIN") {
        router.push('/admin');
        return;
      } else {
        router.push('/')
      }

    } catch (error: unknown) {
      console.log(error, "error")
      // setError((error as ErrorType).response.data.error);
      // setError((error as ErrorType).message);
    }
  }
  // try {
  //   router.push("./home"); // Use the router instance here
  // } catch (error) {
  //   console.error("Error during login:", error);
  // }
  return (
    <div className="bg-white w-[416px]  p-6 flex flex-col gap-4 rounded-lg">
      <Link
        href={"./signup"}
        className="flex justify-center items-center rounded-md bg-[#f5f5f7] w-[44px] h-11 border-[1px] border-[#d4d4d6]"
      >
        <ChevronLeft />
      </Link>
      <div className="flex flex-col gap-2 items-start justify-center">
        <p className="text-[24px] font-semibold normal">Log in</p>
        <p className="text-[16px] font-normal normal text-[#71717a]">
          Log in to enjoy your favorite dishes.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-[#d4d4d6] rounded-md h-9 w-full flex justify-center items-center"
          >
            Let's Go
          </Button>
        </form>
      </Form>
      <p>Forgot password ?</p>
      <div className="flex gap-3 justify-center items-center">
        <Link href={"/signup"}>
          <p className="text-[16px] font-normal normal text-[#71717a]">
            Don't have an account?
          </p>
        </Link>
        <Link href={"/signup"}>
          <p className="text-[16px] text-[#2563EB] font-normal normal">
            Sign up
          </p>
        </Link>
      </div>
    </div>
  );

};
