import { Button } from "@/components/ui/button";
import OnboardingLayout from "@/layouts/OnboardingLayout";
import { Link } from "@inertiajs/react";
import { ArrowRightIcon, MailIcon, PhoneCallIcon } from "lucide-react";

export default function Page() {
  return (
    <OnboardingLayout>
      <div className="space-y-4 lg:max-w-[60%] md:max-w-[75%]">
        <h1 className="text-2xl font-semibold">Welcome to MineraPay!</h1>
        <p className="text-sm">
          MineraPay is a payment gateway that allows you to accept payments from
          your customers in a secure and easy way. We provide you with the tools
          you need to grow your business.
        </p>
        <p className="text-sm">
          Before you can start accepting payments, we need to collect some
          information from you. This information will be used to verify your
          identity and to ensure that your account is secure. Please make sure
          to provide accurate and up-to-date information to avoid any delays in
          the verification process.
        </p>
        <div className="mt-2">
          <Link href="/onboarding/information">
            <Button>
              <ArrowRightIcon />
              <span>Get Started</span>
            </Button>
          </Link>
        </div>
        <br />
        <p className="text-sm">
          If you have any questions or need assistance, our support team is here
          to help you every step of the way.
        </p>
        <div className="flex space-x-2 justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <MailIcon />
              <span>support@minerapay.com</span>
            </Button>
            <Button variant="outline">
              <PhoneCallIcon />
              <span>+62 821 4401 8991</span>
            </Button>
          </div>
        </div>
        <br />
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold">
            What you need to get started:
          </h2>
          <ul className="list-disc list-inside text-sm pl-4 space-y-2">
            <li>Business Name</li>
            <li>Business Address</li>
            <li>Business Phone Number</li>
            <li>Business Email Address</li>
            <li>Business Website (if available)</li>
            <li>Business Registration Number (if applicable)</li>
            <li>Business Bank Account Details</li>
          </ul>
        </div>
      </div>
    </OnboardingLayout>
  );
}
