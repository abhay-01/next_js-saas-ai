import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center">
            Welcome to your new app
          </h1>
          <p className="text-center text-gray-500">
            This is a landing page. You can use it to introduce your app to new
            users.
          </p>
          <div className="mt-8">
            <Link href ="/signin">
            <Button>Sign In</Button>
            </Link>

            <Link href ="/signup">
            <Button variant="outline" className="ml-4">
              Sign Up
            </Button>
            </Link>
          </div>
        </div>
      </div>
  );
}
