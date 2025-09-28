import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { todos } from "./db/schema";
import type { auth } from "./lib/auth";

export type Todo = InferSelectModel<typeof todos>;
export type NewTodo = InferInsertModel<typeof todos>;
export type UpdateTodo = InferInsertModel<typeof todos>;

export type HonoEnv = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};
