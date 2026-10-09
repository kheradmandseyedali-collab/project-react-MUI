import { create } from "zustand";
import type { Todo } from "@/types";
interface TodoState {
  todos: Todo[];
  set: (t: Todo[]) => void;
  add: (text: string, priority: Todo["priority"]) => void;
  toggle: (id: number) => void;
  remove: (id: number) => void;
}
const get = (): Todo[] => {
  try {
    return JSON.parse(localStorage.getItem("nova-todos") || "[]");
  } catch {
    return [];
  }
};
const put = (todos: Todo[]) => {
  localStorage.setItem("nova-todos", JSON.stringify(todos));
  return todos;
};
export const useTodoStore = create<TodoState>((set) => ({
  todos: get(),
  set: (todos) => set({ todos: put(todos) }),
  add: (todo, priority) =>
    set((s) => ({
      todos: put([
        {
          id: Date.now(),
          todo,
          completed: false,
          userId: 0,
          priority,
          local: true,
        },
        ...s.todos,
      ]),
    })),
  toggle: (id) =>
    set((s) => ({
      todos: put(
        s.todos.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t,
        ),
      ),
    })),
  remove: (id) =>
    set((s) => ({ todos: put(s.todos.filter((t) => t.id !== id)) })),
}));
