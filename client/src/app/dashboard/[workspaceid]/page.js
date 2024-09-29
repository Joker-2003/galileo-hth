"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { checkLoggedIn } from "@/firebase";

const RedirectToWorkspaceHash = () => {

  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    
  if (!checkLoggedIn()) {
    console.log("not logged in");
     router.push('/logout');
     return;
   }
    if (pathname) {
      // Redirect to the same path with '#' appended
      router.push(`${pathname}/introduction`);

    }
  }, []);

  return null; // No need to render anything
};

export default RedirectToWorkspaceHash;
