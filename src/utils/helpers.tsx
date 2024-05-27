import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function clx(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}
