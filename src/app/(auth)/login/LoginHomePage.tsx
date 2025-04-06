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

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginHomePage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const router = useRouter();
    try {
      router.push("./home");
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
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
}