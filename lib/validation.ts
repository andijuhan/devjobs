import { z } from "zod";

export const jobFilterSchema = z.object({
  search: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

//convert schema to type
export type jobFilterValues = z.infer<typeof jobFilterSchema>;
