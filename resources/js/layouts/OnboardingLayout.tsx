import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { XIcon } from "lucide-react";
import { PropsWithChildren } from "react";

export default function OnboardingLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Link href="/" className="flex items-center gap-2 fixed top-6 right-6 py-4 px-6 z-10 rounded-full hover:bg-primary transition-colors">
        <XIcon className="w-6 h-6" />
        <span>Skip Verification</span>
      </Link>
      <div className="flex flex-1 min-h-svh bg-secondary">
        <div className="w-[320px] p-6 md:p-10 gap-2 flex flex-col">
          <Link
            href="/onboarding"
            className="py-2 px-3 text-sm block rounded hover:bg-sidebar-primary"
          >
            Introduction
          </Link>
          <Link
            href="/onboarding/information"
            className="py-2 px-3 text-sm block rounded hover:bg-sidebar-primary"
          >
            Merchant Information
          </Link>
          <Link
            href="/onboarding/disbursement"
            className="py-2 px-3 text-sm block rounded hover:bg-sidebar-primary"
          >
            Disbursement
          </Link>
        </div>
        <div className="flex-1 flex flex-col bg-sidebar p-6 md:p-10">
          {children}
        </div>
      </div>
    </>
  );
}
