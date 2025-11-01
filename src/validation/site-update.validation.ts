import { z } from "zod";

export const createSiteUpdateSchema = z.object({
  body: z.object({
    taskId: z.string().min(1, "Task is required"),
    projectId: z.string().optional(),
    completionNotes: z
      .string()
      .min(10, "Completion notes must be at least 10 characters")
      .max(2000, "Completion notes too long"),
    photos: z.array(z.string()).max(5, "Maximum 5 photos allowed").optional(),
  }),
  params: z.object({
    workspaceId: z.string(),
  }),
});

export const updateSiteUpdateSchema = z.object({
  body: z.object({
    completionNotes: z
      .string()
      .min(10, "Completion notes must be at least 10 characters")
      .max(2000, "Completion notes too long")
      .optional(),
    photos: z.array(z.string()).max(5, "Maximum 5 photos allowed").optional(),
  }),
  params: z.object({
    workspaceId: z.string(),
    siteUpdateId: z.string(),
  }),
});

export const getSiteUpdatesSchema = z.object({
  params: z.object({
    workspaceId: z.string(),
  }),
  query: z.object({
    projectId: z.string().optional(),
    taskId: z.string().optional(),
  }),
});
