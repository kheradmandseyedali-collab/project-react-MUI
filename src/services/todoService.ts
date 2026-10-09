import { request } from "@/api/client";
import type { Todo } from "@/types";
export const todoService = {
  all: async () => (await request<{ todos: Todo[] }>("/todos?limit=12")).todos,
};
