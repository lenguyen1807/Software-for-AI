import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ResolveURL(path: string) {
  return  process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/${path}`
  : `http://127.0.0.1:8000/api/${path}`;
}

export function ToDateString(date: string) {
  return (new Date(date)).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
  });
}

export function ToDateID(id: string) {
  const timestamp = id.substring(0, 8);
  const date = new Date( parseInt(timestamp, 16) * 1000)
  return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
  });
}