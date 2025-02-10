import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div
      className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10"
      style={{ backgroundImage: "url('/login-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundBlendMode: "color" }}
    >
      <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
    </div>
  );
}
