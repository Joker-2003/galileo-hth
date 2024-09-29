"use client";

import Table from "@/components/built/dashboardtable";
import { DashHero } from "@/components/built/dashhero";
import { DashHeroNew } from "@/components/built/dashheronew";
import SexyNavbar from "@/components/built/navbar";
import { ThemeProvider } from "@/components/context/themecontext";
import { checkLoggedIn } from "@/firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";
    

export default function Dashboard() {
  const router = useRouter();
  if (!checkLoggedIn()) {
    console.log("not logged in");
     router.push('/logout');
     return;
   }
  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-black min-h-screen"> {/* Set background color */}
        <SexyNavbar />
		<DashHeroNew />
        <Table />
      </div>
    </ThemeProvider>
  );
}
