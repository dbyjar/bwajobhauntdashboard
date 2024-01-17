import * as z from "zod";
import { JOBTYPES } from "@/constants";

export const jobFormSchema = z.object({
  roles: z
    .string({ required_error: "Job Title is required" })
    .min(3, { message: "Job Title must be at least 3 character" }),
  jobType: z.enum(JOBTYPES, {
    required_error: "You need to select a job type",
  }),
  salaryFrom: z.string({ required_error: "Salary from is required" }),
  salaryTo: z.string({ required_error: "Salary to is required" }),
  categoryId: z.string({ required_error: "You need to select a category" }),
  requiredSkills: z
    .string()
    .array()
    .nonempty({ message: "Required skill must be at least 1 skill" }),
  jobDescription: z
    .string({ required_error: "Job description is required" })
    .min(10, { message: "Job description must be at least 10 characters" }),
  responsiblity: z
    .string({ required_error: "Responsibility is required" })
    .min(10, { message: "Responsibility must be at least 10 characters" }),
  whoYouAre: z
    .string({ required_error: "Who you are is required" })
    .min(10, { message: "Who you are must be at least 10 characters" }),
  niceToHaves: z
    .string({ required_error: "Nice to have is required" })
    .min(10, { message: "Nice to have must be at least 10 characters" }),
  benefits: z
    .object({
      benefit: z.string(),
      description: z.string(),
    })
    .array()
    .nonempty({ message: "Benefits must be at least 1 benefit" }),
});

export const overviewSettingFormSchema = z.object({
  image: z.any(),
  name: z.string({ required_error: "name is required" }),
  website: z.string({ required_error: "website is required" }),
  location: z.string({ required_error: "location is required" }),
  employee: z.string({ required_error: "employee is required" }),
  industry: z.string({ required_error: "industry is required" }),
  dateFounded: z.date({ required_error: "dateFounded is required" }),
  description: z.string({ required_error: "description is required" }),
  techStack: z
    .string({ required_error: "tech stack is required" })
    .array()
    .nonempty({ message: "techStack must be at least 1 tech" }),
});

export const socialSettingFormSchema = z.object({
  facebook: z.string({ required_error: "facebook is required" }),
  instagram: z.string({ required_error: "instagram is required" }),
  twitter: z.string({ required_error: "twitter is required" }),
  linkedin: z.string({ required_error: "linkedin is required" }),
  youtube: z.string({ required_error: "youtube is required" }),
});

export const teamsSettingFormSchema = z.object({
  name: z.string({ required_error: "name is required" }),
  position: z.string({ required_error: "position is required" }),
  instagram: z.string({ required_error: "instagram is required" }),
  linkedin: z.string({ required_error: "linkedin is required" }),
});
