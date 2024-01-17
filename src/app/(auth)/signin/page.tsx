"use client";

import { FC } from "react";

import * as z from "zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z
    .string({ required_error: "email is required." })
    .email({ message: "email is not valid" }),
  password: z.string({ required_error: "password is required." }),
});

interface SignInProps {}

const SignIn: FC<SignInProps> = ({}: SignInProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (val: z.infer<typeof formSchema>) => {
    const authenticated = await signIn("credentials", {
      ...val,
      redirect: false,
    });

    console.log(authenticated);

    if (authenticated?.error) {
      toast({
        title: "Error",
        description: authenticated?.error,
      });

      return;
    }

    return router.push("/");
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login your account</CardTitle>
        <CardDescription>Enter your email to access Dashboard</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormDescription>Fill valid email</FormDescription>
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
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Fill valid password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-sm text-gray-500">
              Don't have an account,{" "}
              <Link href={"/signup"} className="font-semibold">
                Sign up
              </Link>
            </div>
            <Separator />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignIn;
