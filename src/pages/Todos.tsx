import { useEffect, useMemo, useState } from "react";
import type { Todo } from "@/types";
import { todoService } from "@/services/todoService";
import { useTodoStore } from "@/store/todoStore";
import { useUIStore } from "@/store/uiStore";
import {
  Badge,
  Button,
  Card,
  Empty,
  Input,
  PageHeader,
  Spinner,
} from "@/components/ui";
const colors: Record<
  NonNullable<Todo["priority"]>,
  "green" | "amber" | "red"
> = { Low: "green", Medium: "amber", High: "red" };
export default function Todos() {
  const { todos, set, add, toggle, remove } = useTodoStore();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Todo["priority"]>("Medium");
  const [filter, setFilter] = useState("All");
  const notify = useUIStore((s) => s.notify);
  useEffect(() => {
    if (todos.length) return;
    setLoading(true);
    todoService
      .all()
      .then((data) =>
        set(
          data.map((t, i) => ({
            ...t,
            priority: (i % 3 === 0
              ? "High"
              : i % 3 === 1
                ? "Medium"
                : "Low") as Todo["priority"],
          })),
        ),
      )
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  const shown = useMemo(
    () =>
      todos.filter(
        (t) =>
          filter === "All" ||
          (filter === "Done" && t.completed) ||
          (filter === "Pending" && !t.completed),
      ),
    [todos, filter],
  );
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    add(text.trim(), priority);
    setText("");
    notify("Task added to your list");
  };
  const done = todos.filter((t) => t.completed).length;
  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="MAKE TODAY COUNT"
        title="Your tasks"
        description="Small steps, big momentum. You’ve got this."
        action={
          <Badge color="violet">
            {done} / {todos.length} completed
          </Badge>
        }
      />
      <div className="grid gap-5 lg:grid-cols-[1fr_290px]">
        <div>
          <Card className="mb-5 p-4">
            <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What needs to get done?"
              />
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as Todo["priority"])
                }
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-900 dark:text-white"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <Button>＋ Add task</Button>
            </form>
          </Card>
          <div className="mb-4 flex gap-2">
            {["All", "Pending", "Done"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${filter === f ? "bg-brand-500 text-white" : "bg-white text-slate-500 dark:bg-white/[.05] dark:text-slate-300"}`}
              >
                {f}{" "}
                {f === "All"
                  ? todos.length
                  : f === "Done"
                    ? done
                    : todos.length - done}
              </button>
            ))}
          </div>
          {loading ? (
            <div className="flex justify-center py-16 text-brand-500">
              <Spinner />
            </div>
          ) : shown.length === 0 ? (
            <Card>
              <Empty
                icon="✓"
                title="All clear"
                description="Add a task above and turn your plans into progress."
              />
            </Card>
          ) : (
            <div className="space-y-3">
              {shown.map((t) => (
                <Card key={t.id} className="flex items-center gap-4 p-4">
                  <button
                    onClick={() => toggle(t.id)}
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition ${t.completed ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 dark:border-white/20"}`}
                  >
                    {t.completed ? "✓" : ""}
                  </button>
                  <span
                    className={`flex-1 text-sm font-semibold ${t.completed ? "text-slate-400 line-through" : "text-slate-800 dark:text-slate-100"}`}
                  >
                    {t.todo}
                  </span>
                  <Badge color={colors[t.priority || "Medium"]}>
                    {t.priority || "Medium"}
                  </Badge>
                  {t.local && <Badge color="gray">Local</Badge>}
                  <button
                    onClick={() => {
                      remove(t.id);
                      notify("Task removed", "info");
                    }}
                    className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-500/10"
                  >
                    ✕
                  </button>
                </Card>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-5">
          <Card className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-violet-600 p-6 text-white">
            <div className="absolute -bottom-9 -right-10 h-36 w-36 rounded-full border-[20px] border-white/[.08]" />
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-100">
              DAILY PROGRESS
            </p>
            <p className="mt-4 text-4xl font-extrabold">
              {todos.length ? Math.round((done / todos.length) * 100) : 0}
              <span className="text-2xl">%</span>
            </p>
            <p className="mt-1 text-xs text-indigo-100">of tasks complete</p>
            <div className="mt-5 h-2 rounded-full bg-white/20">
              <div
                className="h-2 rounded-full bg-white transition-all"
                style={{
                  width: `${todos.length ? (done / todos.length) * 100 : 0}%`,
                }}
              />
            </div>
          </Card>
          <Card className="p-5">
            <h3 className="font-bold text-slate-900 dark:text-white">
              A little encouragement
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
              “The key to getting ahead is getting started.”
            </p>
            <p className="mt-3 text-xs font-bold text-brand-500">
              — Mark Twain
            </p>
          </Card>
          <Card className="p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              TASK BREAKDOWN
            </p>
            <div className="mt-4 space-y-3">
              {["High", "Medium", "Low"].map((p) => (
                <div key={p} className="flex justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">
                    {p} priority
                  </span>
                  <Badge color={colors[p]}>
                    {
                      todos.filter(
                        (t) => (t.priority || "Medium") === p && !t.completed,
                      ).length
                    }{" "}
                    open
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}