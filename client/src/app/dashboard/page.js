"use client";

import Table from "@/components/built/dashboardtable";
import { DashHero } from "@/components/built/dashhero";
import { DashHeroNew } from "@/components/built/dashheronew";
import SexyNavbar from "@/components/built/navbar";
import { ThemeProvider } from "@/components/context/themecontext";

export default function Dashboard() {
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
