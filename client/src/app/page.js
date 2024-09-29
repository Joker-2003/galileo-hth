"use client";

import { ThemeProvider } from "@/components/context/themecontext";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Link from "next/link";


export default function TypewriterEffectDemo() {


  const words = [
    {
      text: " Build ",
    },
    {
      text: " awesome ",
    },
    {
      text: " mindmaps ",
    },
    {
      text: " with ",
    },
    {
      text: " Galileo. ",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <ThemeProvider>
    <div className="flex flex-col items-center justify-center h-[40rem] ">
      <p className="text-neutral-600 dark:text-neutral-200 text-base  mb-10">
       The road to learning starts here
      </p>
      <TypewriterEffect words={words} />
      <div
        className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <Link href="/login"><button
          className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Login
        </button>
        </Link>
        {/* <Link href="/signup">
        <button
          className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Register
        </button>
        </Link> */}
      </div>
    </div>
    </ThemeProvider>
  );
}
