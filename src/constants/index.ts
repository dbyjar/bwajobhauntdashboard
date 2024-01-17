import { EnumValues } from "zod";

export const JOBTYPES: EnumValues = [
  "Full-Time",
  "Part-Time",
  "Remote",
  "Intership",
];

export const JOB_LISTING_COLUMNS: string[] = [
  "Roles",
  "Status",
  "Date Posted",
  "Due Date",
  "Job Type",
  "Applicants",
  "Needs",
];

export interface JobListingsTypes {
  id: string;
  roles: string;
  status: string;
  datePosted: string;
  dueDate: string;
  jobType: string;
  applicants: number;
  needs: number;
}

export interface JobApplicantsTypes {
  name: string;
  applied: string;
}

export const JOB_APPLICANT_COLUMNS: string[] = ["Name", "Applied"];
export const JOB_APPLICANT_DATA: JobApplicantsTypes[] = [
  {
    name: "Fajar Al Hakim",
    applied: "12 Jan 2024",
  },
];
