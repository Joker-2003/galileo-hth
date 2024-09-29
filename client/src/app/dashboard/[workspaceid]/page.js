"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { checkLoggedIn } from "@/firebase";

const RedirectToWorkspaceHash = () => {

  if (!checkLoggedIn()) {console.log("not logged in");
   const router = useRouter();
    router.push('/loginGoogle');
  }
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    
    if (pathname) {
      // Redirect to the same path with '#' appended
      router.push(`${pathname}/introduction`);

    }
  }, []);

  return null; // No need to render anything
};

export default RedirectToWorkspaceHash;
