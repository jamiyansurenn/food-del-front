"use client";
import { ChevronLeft } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

interface PageProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export default function FirstPage({ currentStep, setCurrentStep }: PageProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: { email: string }) => {
    try {
      const user = await axios.post(`${BASE_URL}/auth/signup`, values);
      if (user) {
        toast.success("User successfully registered");
        setCurrentStep(currentStep + 1); // Move to the next step
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="bg-white w-[416px] p-6 flex flex-col gap-4 rounded-lg">
      <button
        onClick={() => setCurrentStep(currentStep - 1)}
        className="flex justify-center items-center rounded-md bg-[#f5f5f7] w-[44px] h-11 border-[1px] border-[#d4d4d6]"
      >
        <ChevronLeft />
      </button>
      <div className="flex flex-col gap-2 items-start justify-center">
        <p className="text-[24px] font-semibold">Create your account</p>
        <p className="text-[16px] font-normal text-[#71717a]">
          Sign up to explore your favorite dishes
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <Button
            type="submit"
            className="bg-blue-500 text-white rounded-md h-9 w-full flex justify-center items-center"
            disabled={!form.formState.isValid}
          >
            Submit
          </Button>
        </form>
      </Form>
      <div className="flex gap-3 justify-center items-center">
        <p className="text-[16px] font-normal text-[#71717a]">
          Already have an account?
        </p>
        <p
          className="text-[16px] text-[#2563EB] font-normal cursor-pointer"
          onClick={() => setCurrentStep(0)} // Example: Reset to the first step
        >
          Log in
        </p>
      </div>
    </div>
  );
}