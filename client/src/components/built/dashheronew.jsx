"use client";
import Link from "next/link";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const words = `AI-driven platform designed to enhance both learning and research productivity.`;

export function DashHeroNew() {
  return (
    <div className="h-[50vh] flex flex-col items-center justify-center mx-20 px-24 py-4">
      <TextGenerateEffect words={words} className="text-center w-full" />
      <Link href="/dashboard/create">
      <HoverBorderGradient
        containerClassName="rounded-full mt-4" // Add margin-top for spacing
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
      >
        <span>New Workspace</span>
      </HoverBorderGradient>
      </Link>
    </div>
  );
}
