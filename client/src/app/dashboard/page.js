"use client";

import Table from "@/components/built/dashboardtable";
import { DashHeroNew } from "@/components/built/dashheronew";
import SexyNavbar from "@/components/built/navbar";
import { ThemeProvider } from "@/components/context/themecontext";
import { checkLoggedIn } from "@/firebase";
import { useRouter } from "next/navigation"; // Use 'next/navigation' for App Router
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!checkLoggedIn()) {
      console.log("not logged in");
      router.push('/logout'); // Redirect to logout page if not logged in
    }
  }, [router]); // Run effect when router changes

  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-black min-h-screen">
        <SexyNavbar />
        <DashHeroNew />
        <Table />
      </div>
    </ThemeProvider>
  );
}
