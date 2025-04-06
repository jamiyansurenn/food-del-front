import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

interface PageProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}
const formSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export default function SecondPage({ currentStep, setCurrentStep }: PageProps) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (values.password !== values.confirmPassword) {
        form.setError("confirmPassword", {
          message: "Passwords do not match",
        });
        return;
      }
      router.push("./login");
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="bg-white w-[416px] p-4 flex flex-col gap-4 rounded-lg ">
      <button
        onClick={() => setCurrentStep(currentStep - 1)}
        className="flex justify-center items-center rounded-md bg-[#f5f5f7] w-[44px] h-11 border-[1px] border-[#d4d4d6]"
      >
        <ChevronLeft />
      </button>
      <div className="flex flex-col gap-2 items-start justify-center">
        <p className="text-[24px] font-semibold normal">Create your account</p>
        <p className="text-[16px] font-normal normal text-[#71717a]">
          Create a strong password with letters, numbers.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm Password" {...field} />
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
      <div className="flex gap-3 justify-start items-center">
        <input type="checkbox" name="checkbox" id="checkbox" />
        <p className="text-[15px] font-normal normal text-[#71717a]">
          Show password
        </p>
      </div>

      <div className="flex gap-3 justify-center items-center">
        <Link href={"/login"}>
          <p className="text-[16px] font-normal normal text-[#71717a]">
            Already have an account?
          </p>
        </Link>
        <Link href={"/login"}>
          <p className="text-[16px] text-[#2563EB] font-normal normal">
            Log in
          </p>
        </Link>
      </div>
    </div>
  );
}
