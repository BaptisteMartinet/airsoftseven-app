"use client";

import { usePathname } from "next/navigation";
import { makeAppURL } from "@/navigation";

export default function useAppURL() {
  const pathname = usePathname();
  return makeAppURL(pathname);
}
