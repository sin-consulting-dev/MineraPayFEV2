import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div
      className="flex min-h-svh flex-col items-center justify-center bg-secondary p-6 md:p-10"
      style={
        {
          // backgroundImage: "url('/login-bg.jpg')",
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          // backgroundRepeat: "no-repeat",
          // backgroundAttachment: "fixed"
        }
      }
    >
      {children}
    </div>
  );
}
