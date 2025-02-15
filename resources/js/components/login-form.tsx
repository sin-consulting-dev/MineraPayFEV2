import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router, usePage } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { errors } = usePage().props;
  const [isSubmitting, setSubmitting] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    errors,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    router.post("/login", values, {
      onFinish: () => {
        form.resetField("password");
        setSubmitting(false);
      },
    });
  }

  return (
    <div className="w-full max-w-sm md:max-w-3xl">
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="p-6 md:p-8 space-y-6"
              >
                <div className="flex flex-col items-center text-center">
                  <h4 className="text-xl font-semibold">Welcome back!</h4>
                  <p className="text-balance text-muted-foreground">
                    Login to your MineraPay account
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  disabled={isSubmitting}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  disabled={isSubmitting}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <a
                          href="#"
                          className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting && <LoaderCircle className="animate-spin" />}
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </form>
            </Form>
            <div className="relative hidden bg-primary md:block">
              <img
                src="/minerapay-icon-white.webp"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
        <div className="space-y-2">
          <div className="text-balance text-center text-sm text-muted-foreground">
            MineraPay © 2021. All rights reserved.
          </div>
          <div className="text-balance text-center text-xs text-muted-foreground/80">
            v2.0.0
          </div>
        </div>
      </div>
    </div>
  );
}
