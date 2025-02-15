import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Guest from "@/layouts/GuestLayout";
import { PageProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, router, usePage } from "@inertiajs/react";
import { CheckIcon, LoaderCircle, XIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, "Merchant Name must be at least 3 characters long")
      .max(255, "Merchant Name must be at most 255 characters long"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(16, "Password must be at most 16 characters long")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password_confirmation === data.password, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export default function Page() {
  const { errors, ...pageProps } = usePage<
    PageProps & {
      captchaEnabled: boolean;
      captchaKey?: string | null;
    }
  >().props;
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
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
    if (pageProps.captchaEnabled && !captchaToken) {
      toast.error("Please complete the captcha challenge.");
      return;
    }

    setSubmitting(true);
    router.post("/register", values, {
      onSuccess: () => {
        toast.success("Account registered successfully.");
        form.reset();
      },
      onError: (error) => {
        toast.error("An error occurred when signing up. Please try again.");
        form.reset();
      },
      onFinish: () => {
        setSubmitting(false);
      },
    });
  }

  return (
    <Guest>
      <Head>
        <title>Register</title>
      </Head>
      <div className="w-full max-w-sm md:max-w-2xl h-full">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="p-6 md:p-8 space-y-6"
                >
                  <div className="flex flex-col">
                    <h4 className="text-xl font-semibold">
                      Welcome to MineraPay
                    </h4>
                    <p className="text-balance text-muted-foreground">
                      Create your account to start receiving payments.
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="name"
                    disabled={isSubmitting}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Merchant Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Merchant Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    disabled={isSubmitting}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email Address <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="password"
                      disabled={isSubmitting}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Password <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <FormDescription>
                            <div className="flex flex-col justify-center text-xs text-muted-foreground gap-1">
                              {[
                                {
                                  label: "At least 8 characters",
                                  valid: field.value.length >= 8,
                                },
                                {
                                  label: "Contains a number",
                                  valid: /\d/.test(field.value),
                                },
                                {
                                  label: "Contains an uppercase letter",
                                  valid: /[A-Z]/.test(field.value),
                                },
                                {
                                  label: "Contains a lowercase letter",
                                  valid: /[a-z]/.test(field.value),
                                },
                                {
                                  label: "Contains a special character",
                                  valid: /[!@#$%^&*(),.?":{}|<>]/.test(
                                    field.value
                                  ),
                                },
                              ].map((criteria, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  {criteria.valid ? (
                                    <CheckIcon
                                      size={16}
                                      className="text-green-500"
                                    />
                                  ) : (
                                    <XIcon size={16} className="text-red-500" />
                                  )}
                                  <span>{criteria.label}</span>
                                </div>
                              ))}
                            </div>
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password_confirmation"
                      disabled={isSubmitting}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Re-enter your Password{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Please re-enter your password to verify."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {pageProps.captchaEnabled && pageProps.captchaKey && (
                    <HCaptcha
                      sitekey={pageProps.captchaKey}
                      onVerify={(token) => setCaptchaToken(token)}
                    />
                  )}
                  <div className="flex flex-col gap-2">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting || !form.formState.isValid}
                    >
                      {isSubmitting && (
                        <LoaderCircle className="animate-spin" />
                      )}
                      {isSubmitting ? "Signing up..." : "Sign Up"}
                    </Button>
                    <Button
                      type="submit"
                      variant="ghost"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      Back to Login
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Guest>
  );
}
