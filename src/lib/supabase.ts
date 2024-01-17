import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY!
);

const createId = (length: number) => {
  let result = "",
    counter = 0;

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const charactersLength = characters.length;

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter++;
  }

  return result;
};

export const supabaseGetPublicURL = (
  filename: string,
  bucket: "company" | "applicant"
) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(`public/${filename}`);

  return {
    publicUrl: data.publicUrl,
  };
};

export const supabaseUploadFile = async (
  file: File | string,
  bucket: "company" | "applicant"
) => {
  const filename = createId(6) + ".jpg";
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`public/${filename}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  return {
    data,
    error,
    filename,
  };
};

export const supabaseUpdateFile = async (
  file: File | string,
  filename: string,
  bucket: "company" | "applicant"
) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .update(`public/${filename}`, file, {
      cacheControl: "3600",
      upsert: true,
    });

  return {
    data,
    error,
    filename,
  };
};

export const supabaseDeleteFile = async (
  filename: string,
  bucket: "company" | "applicant"
) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .remove([`public/${filename}`]);

  return {
    data,
    error,
    filename,
  };
};
