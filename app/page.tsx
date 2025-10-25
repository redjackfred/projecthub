import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { SignupForm } from "@/components/signup-form";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <SignupForm />
      <br />
      <Link href="/login">Login</Link>
    </div >
  );
}
