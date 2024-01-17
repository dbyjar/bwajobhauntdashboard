import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @param {any} data value of the data to set on the cookie
 * @returns encrypted data string
 */
export function hashData(data: string) {
  return bcrypt.hashSync(data, 8);
}

/**
 * @param {string} hashedData hashed data string
 * @returns Object data parsing from decrypted data
 */
export async function compareData(hashedData: string, data: string) {
  const isMatch = await bcrypt.compare(data, hashedData);
  return isMatch;
}

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);

  return res.json() as Promise<JSON>;
}

export const formatDate = (date: any, format: string = "DD MMM YYYY") => {
  return moment(date).format(format);
};
