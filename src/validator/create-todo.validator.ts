import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const createTodoSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title is too long")
      .trim(),
    description: z
      .string()
      .max(255, "Description is too long")
      .trim()
      .optional(),
    completed: z.boolean().default(false),
  })
  .strict();

export const createTodoValidator = zValidator(
  "json",
  createTodoSchema,
  (result, ctx) => {
    if (!result.success) {
      return ctx.json(
        {
          errors: result.error.issues.map((issue) => ({
            message: issue.message,
            path: issue.path.join("."),
          })),
        },
        400,
      );
    }
  },
);
