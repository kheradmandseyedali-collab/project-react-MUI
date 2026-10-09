import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
export function AppLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-surface-light transition-colors duration-300 dark:bg-surface-dark">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-violet-500/[.07] blur-3xl" />
        <div className="absolute -bottom-32 left-[35%] h-96 w-96 rounded-full bg-indigo-500/[.06] blur-3xl" />
      </div>
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="app-main relative min-h-screen md:pl-[270px]">
        <Topbar onMenu={() => setOpen(true)} />
        <main className="mx-auto max-w-[1600px] p-4 sm:p-7 lg:p-9">
          <Outlet />
        </main>
        <footer className="px-7 pb-6 text-center text-xs text-slate-400">
          © 2025 Nova Workspace <span className="mx-2">·</span> Crafted for
          ambitious teams
        </footer>
      </div>
    </div>
  );
}
