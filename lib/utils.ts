import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes without conflicts. The `cn` helper shadcn/21st import. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
