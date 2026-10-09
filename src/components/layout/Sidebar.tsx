import { NavLink } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useI18n } from "@/i18n";
import { initials } from "@/utils";

const groups = [
  { title: "nav.workspace", links: [["/", "◈", "nav.dashboard"], ["/products", "▧", "nav.shop"], ["/cart", "▣", "nav.cart"], ["/posts", "▤", "nav.posts"], ["/todos", "✓", "nav.todos"]] },
  { title: "nav.personal", links: [["/profile", "◎", "nav.profile"]] },
];
export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const user = useAuthStore(s => s.user);
  const { t } = useI18n();
  return <>
    <div onClick={onClose} className={`fixed inset-0 z-30 bg-slate-950/50 transition md:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`} />
    <aside className={`app-sidebar fixed bottom-0 top-0 z-40 flex w-[270px] flex-col border-r border-slate-200/70 bg-white/90 px-5 pb-5 pt-6 backdrop-blur-2xl transition-transform duration-300 dark:border-white/[.06] dark:bg-[#0d1324]/95 md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="mb-10 flex items-center gap-3 px-2"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-600 text-xl font-black text-white shadow-glow">N</div><div><p className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">nova<span className="text-brand-500">.</span></p><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-slate-400">workspace</p></div><button onClick={onClose} className="ms-auto rounded-lg p-2 text-slate-400 md:hidden">✕</button></div>
      <div className="flex-1 space-y-8 overflow-y-auto">{groups.map(group => <div key={group.title}><p className="mb-3 px-3 text-[10px] font-bold tracking-[.18em] text-slate-400">{t(group.title)}</p><nav className="space-y-1">{group.links.map(([to, icon, label]) => <NavLink key={to} to={to} end={to === "/"} onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? "nav-active" : ""}`}><span className="w-6 text-center text-lg">{icon}</span><span>{t(label)}</span>{to === "/cart" && <span className="ms-auto rounded-full bg-brand-500 px-2 py-0.5 text-[10px] text-white">{t("nav.shop")}</span>}</NavLink>)}</nav></div>)}</div>
      <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/[.07] dark:bg-white/[.04]"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-500 text-xs font-bold text-white">{initials(user?.firstName, user?.lastName)}</div><div className="min-w-0"><p className="truncate text-sm font-bold text-slate-800 dark:text-white">{user?.firstName} {user?.lastName}</p><p className="truncate text-xs text-slate-500">{user?.company?.title || "Workspace member"}</p></div><span className="ms-auto h-2 w-2 rounded-full bg-emerald-400" /></div></div>
    </aside>
  </>;
}
