import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Languages } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { Input } from "@/components/ui";
import { useI18n } from "@/i18n";
import { initials } from "@/utils";
const titleKeys: Record<string, string> = { "/": "nav.dashboard", "/products": "nav.shop", "/cart": "cart.shoppingCart", "/posts": "nav.posts", "/todos": "nav.todos", "/profile": "nav.profile" };
export function Topbar({ onMenu }: { onMenu: () => void }) {
  const { dark, toggle } = useThemeStore();
  const { user, logout } = useAuthStore();
  const notify = useUIStore(s => s.notify);
  const { t, lang, setLang } = useI18n();
  const [menu, setMenu] = useState(false), [notice, setNotice] = useState(false), [q, setQ] = useState("");
  const nav = useNavigate(), loc = useLocation();
  const iconButton = "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/10";
  return <header className="sticky top-0 z-20 flex h-[76px] items-center gap-3 border-b border-slate-200/60 bg-white/70 px-4 backdrop-blur-xl dark:border-white/[.05] dark:bg-[#0b1020]/70 sm:px-7">
    <button onClick={onMenu} className="rounded-xl p-2 text-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 md:hidden">☰</button>
    <div className="hidden text-sm font-semibold text-slate-500 sm:block">{t("common.pages")} <span className="mx-2 text-slate-300">/</span><span className="text-slate-800 dark:text-white">{t(titleKeys[loc.pathname] || "nav.dashboard")}</span></div>
    <div className="relative ms-auto hidden w-full max-w-[280px] md:block"><Input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === "Enter" && nav(`/products?q=${encodeURIComponent(q)}`)} placeholder={t("common.search")} className="py-2.5 pe-10 ps-4 text-xs"/><span className="absolute end-3 top-2.5 text-slate-400">⌕</span></div>
    <button onClick={() => setLang(lang === "en" ? "fa" : "en")} className={`${iconButton} gap-1 px-2 text-xs font-bold text-slate-600 dark:text-slate-200`} title={t("common.language")} aria-label={t("common.language")}><Languages size={17}/><span>{lang === "en" ? "FA" : "EN"}</span></button>
    <button onClick={toggle} className={`${iconButton} text-lg`} title={dark ? t("common.lightMode") : t("common.darkMode")} aria-label={dark ? t("common.lightMode") : t("common.darkMode")}>{dark ? "☼" : "☾"}</button>
    <div className="relative"><button onClick={() => setNotice(!notice)} className={`${iconButton} relative text-lg text-slate-600 dark:text-slate-300`}>♧<i className="absolute end-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900"/></button>{notice && <div className="absolute end-0 top-12 z-30 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-slate-900"><p className="font-bold dark:text-white">Notifications</p><p className="mt-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-500 dark:bg-white/5">✨ Your workspace is looking great today!</p><p className="mt-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-500 dark:bg-white/5">📦 New products are ready to explore.</p></div>}</div>
    <div className="relative"><button onClick={() => setMenu(!menu)} className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-100 dark:hover:bg-white/10"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-500 text-xs font-bold text-white">{initials(user?.firstName, user?.lastName)}</span><span className="hidden text-start sm:block"><span className="block text-xs font-bold text-slate-800 dark:text-white">{user?.firstName}</span><span className="block text-[10px] text-slate-400">{user?.company?.title || "Member"}</span></span><span className="text-xs text-slate-400">⌄</span></button>{menu && <div className="absolute end-0 top-12 z-30 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-slate-900"><button onClick={() => { nav("/profile"); setMenu(false); }} className="w-full rounded-xl px-3 py-2 text-start text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5">◎　 {t("nav.profile")}</button><button onClick={() => { logout(); nav("/login"); notify(t("auth.logout"), "info"); }} className="w-full rounded-xl px-3 py-2 text-start text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10">↪　 {t("nav.logout")}</button></div>}</div>
  </header>;
}
