import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <Button className="mt-8">Click Me</Button>
      <div className="bg-background text-foreground">Hi</div>
    </div >
  );
}
