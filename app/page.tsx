"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/sign-in");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-200">
    <h1 className="text-2xl font-bold mb-8">AI-Powered Personal Assistant</h1>
    <Button
      onClick={handleStart}
      className="text-lg px-6 py-3 rounded-xl shadow-lg hover:scale-[1.12]"
    >
      Click to Start
    </Button>
  </div>
  );
}
