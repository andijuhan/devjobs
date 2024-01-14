import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

//convert schema to type
export type jobFilterValues = z.infer<typeof jobFilterSchema>;

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine((file) => {
    !file || (file instanceof File && file.type.startsWith("image/"), "Must be an image file");
  })
  .refine((file) => {
    return !file || file.size < 2 * 1024 * 1024;
  }, "File must be less than 2MB");

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).email().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, { message: "Please provide at least one application method", path: ["applicationEmail"] });

const locationSchema = z
  .object({
    locationType: z
      .string()
      .min(1, { message: "Location type is required" })
      .refine((value) => locationTypes.includes(value), "Invalid location type"),
    location: z.string().max(200).optional(),
  })
  .refine((data) => !data.locationType || data.locationType === "Remote" || data.location);

export const createJobSchema = z
  .object({
    title: z.string().min(1, { message: "Title is required" }).max(100),
    type: z
      .string()
      .min(1, { message: "Type is required" })
      .refine((value) => jobTypes.includes(value), "Invalid job type"),
    companyName: z.string().min(1, { message: "Company name is required" }).max(100),
    companyLogo: companyLogoSchema,
    description: z.string().min(1, { message: "Description is required" }).max(5000, "Description must be less than 5000 characters"),
    salary: z.string().min(1, { message: "Salary is required" }).regex(/^\d+$/, "Salary must be a number").max(9, "Salary must be less than 9 digits"),
  })
  .and(applicationSchema);
