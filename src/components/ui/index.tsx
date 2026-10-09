import React from "react";
import { useUIStore } from "@/store/uiStore";
export function Button({children,className="",variant="primary",...props}: React.ButtonHTMLAttributes<HTMLButtonElement>&{variant?:"primary"|"secondary"|"ghost"|"danger"}) {
 const base="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[.98]";
 const styles={primary:"bg-gradient-to-r from-brand-600 to-accent-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-glow hover:-translate-y-0.5",secondary:"border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10",ghost:"text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white",danger:"bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"};
 return <button className={`${base} ${styles[variant]} ${className}`} {...props}>{children}</button>;
}
export function Card({children,className=""}:{children:React.ReactNode;className?:string}) { return <div className={`glass-card rounded-2xl border border-slate-200/70 bg-white/80 shadow-glass backdrop-blur-xl dark:border-white/[.07] dark:bg-slate-900/60 ${className}`}>{children}</div>; }
export function Input({className="",...props}:React.InputHTMLAttributes<HTMLInputElement>) { return <input className={`w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10 dark:border-white/10 dark:bg-white/[.04] dark:text-white dark:placeholder:text-slate-500 ${className}`} {...props}/>; }
export function Badge({children,color="indigo"}:{children:React.ReactNode;color?:string}) { const cls:Record<string,string>={indigo:"bg-indigo-500/10 text-indigo-600 dark:text-indigo-300",green:"bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",red:"bg-rose-500/10 text-rose-600 dark:text-rose-300",amber:"bg-amber-500/10 text-amber-700 dark:text-amber-300",violet:"bg-violet-500/10 text-violet-600 dark:text-violet-300",gray:"bg-slate-500/10 text-slate-500 dark:text-slate-300"};return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${cls[color]||cls.indigo}`}>{children}</span>; }
export function Spinner(){return <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-r-transparent"/>}
export function Empty({icon="✦",title,description}:{icon?:string;title:string;description:string}){return <div className="flex flex-col items-center justify-center px-6 py-20 text-center"><div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 text-3xl text-brand-500">{icon}</div><h3 className="text-lg font-bold text-slate-800 dark:text-white">{title}</h3><p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p></div>}
export function Modal({open,onClose,title,children}:{open:boolean;onClose:()=>void;title:string;children:React.ReactNode}){if(!open)return null;return <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><div className="animate-scale-in w-full max-w-2xl rounded-3xl border border-white/10 bg-white p-6 shadow-2xl dark:bg-slate-900"><div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2><button onClick={onClose} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10">✕</button></div>{children}</div></div>}
export function ToastViewport() {
  const { toasts, dismiss } = useUIStore();
  return (
    <div className="fixed right-4 top-4 z-[90] flex w-[min(370px,calc(100vw-2rem))] flex-col gap-2">
      {toasts.map((toast) => (
        <button key={toast.id} onClick={() => dismiss(toast.id)} className={`animate-toast-in rounded-2xl border px-4 py-3 text-left text-sm font-semibold shadow-xl backdrop-blur-xl ${toast.type === "error" ? "border-rose-400/20 bg-rose-50/95 text-rose-700 dark:bg-rose-950/90 dark:text-rose-200" : toast.type === "info" ? "border-blue-400/20 bg-blue-50/95 text-blue-700 dark:bg-blue-950/90 dark:text-blue-200" : "border-emerald-400/20 bg-emerald-50/95 text-emerald-700 dark:bg-emerald-950/90 dark:text-emerald-200"}`}>
          {toast.type === "error" ? "⚠" : toast.type === "info" ? "ℹ" : "✓"}　{toast.message}
        </button>
      ))}
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: React.ReactNode; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-brand-500">{eyebrow}</p>}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}

const toneStyles: Record<string, string> = {
  indigo: "from-indigo-500/15 to-indigo-500/5 text-indigo-500",
  violet: "from-violet-500/15 to-violet-500/5 text-violet-500",
  emerald: "from-emerald-500/15 to-emerald-500/5 text-emerald-500",
  amber: "from-amber-500/15 to-amber-500/5 text-amber-500",
  rose: "from-rose-500/15 to-rose-500/5 text-rose-500",
  blue: "from-blue-500/15 to-blue-500/5 text-blue-500",
};

export function StatCard({ label, value, change, icon, tone = "indigo" }: { label: string; value: string; change: string; icon: React.ReactNode; tone?: string }) {
  return (
    <Card className="p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">{value}</p>
          <p className="mt-2 text-xs font-semibold text-emerald-500">↗ {change} <span className="font-normal text-slate-400">vs last month</span></p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${toneStyles[tone] ?? toneStyles.indigo} text-xl`}>{icon}</div>
      </div>
    </Card>
  );
}
