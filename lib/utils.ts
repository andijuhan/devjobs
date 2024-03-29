import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const relativeDate = (from: Date) => {
  return formatDistanceToNowStrict(from, { addSuffix: true });
};

export const toSlug = (str: string) => {
  return str.toLowerCase().replace(/ /g, "-");
};
