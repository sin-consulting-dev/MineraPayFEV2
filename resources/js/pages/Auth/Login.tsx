import { LoginForm } from "@/components/login-form";
import Guest from "@/layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function Page() {
  return (
    <Guest>
      <Head>
        <title>Login</title>
      </Head>
      <LoginForm />
    </Guest>
  );
}
