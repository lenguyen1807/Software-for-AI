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

export function ToDateID(id: string) {
  const timestamp = id.substring(0, 8);
  const date = new Date( parseInt(timestamp, 16) * 1000)
  return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
  });
}

export const preventHover = (event: any) => {
  // reference: https://github.com/radix-ui/primitives/issues/1630
  const e = event as Event;
  e.preventDefault();
}

export const slugify = (...args: (string | number)[]): string => {
    // reference: https://gist.github.com/codeguy/6684588
    const value = args.join(' ')

    return value
        .normalize('NFD') // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, '-') // separator
}

// export const rangeBorrowDays = Array.from({ length: 10 }, (_, i) => (i + 5).toString());

// export const rangeLateFeePerDay = Array.from({ length: 1000 }, (_, i) => ((i + 1) * 1000).toString());

export function ToDateFormat(date: Date) {
  return date
    .toLocaleDateString("vi-VN", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric"
                    }).split("/").reverse().join("-")
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number
    sizeType?: "accurate" | "normal"
  } = {}
) {
  // ref: https://github.com/sadmann7/file-uploader/blob/main/src/lib/utils.ts
  const { decimals = 0, sizeType = "normal" } = opts

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"]
  if (bytes === 0) return "0 Byte"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`
}

export function toBase64(file: File) {
  // ref: https://github.com/shadcn-ui/ui/issues/250
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		
		fileReader.readAsDataURL(file);
		
		fileReader.onload = () => {
			resolve(fileReader.result);
		};
		
		fileReader.onerror = (error) => {
			reject(error);
		};
	});
}