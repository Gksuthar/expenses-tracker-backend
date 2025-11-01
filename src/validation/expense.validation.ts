import { z } from "zod";

export const createExpenseSchema = z.object({
  name: z.string().min(1, "Expense name is required"),
  description: z.string().optional(),
  amount: z.number().min(0, "Amount must be positive"),
  category: z.enum([
    "materials",
    "labor",
    "equipment",
    "transportation",
    "permits",
    "utilities",
    "other",
  ]),
  projectId: z.string().optional(),
  date: z.string(),
  status: z.enum(["outstanding", "paid"]).default("outstanding"),
});

export const updateExpenseSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  amount: z.number().min(0).optional(),
  category: z
    .enum([
      "materials",
      "labor",
      "equipment",
      "transportation",
      "permits",
      "utilities",
      "other",
    ])
    .optional(),
  projectId: z.string().optional(),
  date: z.string().optional(),
  status: z.enum(["outstanding", "paid"]).optional(),
});

export const expenseIdSchema = z.string().min(1, "Expense ID is required");
