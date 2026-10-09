import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { useI18n } from "@/i18n";
import { Button, Card, Input, Spinner } from "@/components/ui";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuthStore();
  const notify = useUIStore((s) => s.notify);
  const nav = useNavigate();
  const { t, lang, setLang } = useI18n();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      notify(t("auth.welcome"));
      nav("/");
    } catch {}
  };

  const handelShow = () => {
    setShowPassword ((e) => !e)
  }
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080d1b] p-4">
      <div className="absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-indigo-600/25 blur-[110px]" />
      <div className="absolute -bottom-48 -right-20 h-[550px] w-[550px] rounded-full bg-violet-600/20 blur-[120px]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(#a5b4fc 1px,transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div className="absolute right-4 top-4 z-20 flex gap-2">
        <button
          onClick={() => setLang("en")}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${lang === "en" ? "bg-white/15 text-white" : "text-slate-400 hover:text-white"}`}
        >
          {t("auth.languageEnglish")}
        </button>
        <button
          onClick={() => setLang("fa")}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${lang === "fa" ? "bg-white/15 text-white" : "text-slate-400 hover:text-white"}`}
        >
          {t("auth.languagePersian")}
        </button>
      </div>
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[.04] shadow-2xl backdrop-blur-2xl md:grid-cols-2">
        <div className="relative hidden min-h-[620px] flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-600 via-indigo-700 to-violet-800 p-12 text-white md:flex">
          <div className="absolute -right-24 top-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -right-12 top-32 h-48 w-48 rounded-full border border-white/10" />
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-2xl font-black">
              N
            </span>
            <span className="text-xl font-bold">nova.</span>
          </div>
          <div className="relative">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl">
              ✦
            </div>
            <h1 className="max-w-md text-4xl font-extrabold leading-tight">
              Your next big idea starts here.
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-6 text-indigo-100">
              One thoughtful workspace for your products, projects, and people.
            </p>
            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                <img
                  src="https://i.pravatar.cc/40?img=12"
                  className="h-9 w-9 rounded-full border-2 border-indigo-700"
                />
                <img
                  src="https://i.pravatar.cc/40?img=32"
                  className="h-9 w-9 rounded-full border-2 border-indigo-700"
                />
                <img
                  src="https://i.pravatar.cc/40?img=47"
                  className="h-9 w-9 rounded-full border-2 border-indigo-700"
                />
              </div>
              <span className="text-xs text-indigo-100">
                Join 2,400+ teams building better.
              </span>
            </div>
          </div>
          <p className="text-xs text-indigo-200">© 2025 Nova Workspace</p>
        </div>
        <div className="flex min-h-[620px] flex-col justify-center px-7 py-12 sm:px-12">
          <div className="mb-9 md:hidden">
            <span className="text-2xl font-extrabold text-white">
              nova<span className="text-brand-400">.</span>
            </span>
          </div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-300">
            {t("auth.welcomeBack")}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-white">
            {t("auth.signInTitle")}
          </h2>
          <p className="mt-2 text-sm text-slate-400">{t("auth.ready")}</p>
          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block text-sm font-medium text-slate-300">
              {t("auth.username")}
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t("auth.usernamePlaceholder")}
                className="mt-2 border-white/10 bg-white/[.05] text-white"
                autoComplete="username"
              />
            </label>
            <label className="block text-sm font-medium text-slate-300">
              {t("auth.password")}
              <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("auth.passwordPlaceholder")}
                className="mt-2 border-white/10 bg-white/[.05] text-white"
                autoComplete="current-password"
              />
              <span className="absolute top-4 right-2.5 cursor-pointer" onClick={handelShow}>
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
              </div>
            </label>
            {error && (
              <p className="rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                {error}
              </p>
            )}
            <Button className="w-full py-3.5" disabled={loading}>
              {loading ? (
                <>
                  <Spinner /> {t("auth.signingIn")}
                </>
              ) : (
                <>
                  {t("auth.signInWorkspace")} <span>→</span>
                </>
              )}
            </Button>
          </form>
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-slate-500">
              {t("auth.demoAccess")}
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <Button
            variant="secondary"
            className="w-full border-white/10 bg-white/[.04] text-slate-200 hover:bg-white/10"
            disabled={loading}
            onClick={() => {
              setUsername("emilys");
              setPassword("emilyspass");
              login("emilys", "emilyspass")
                .then(() => {
                  notify(t("auth.welcome"));
                  nav("/");
                })
                .catch(() => {});
            }}
          >
            ⚡ {t("auth.demoLogin")}
          </Button>
          <p className="mt-4 text-center text-xs text-slate-500">
            {t("auth.demoCredentials")}:{" "}
            <span className="text-slate-300">emilys / emilyspass</span>
          </p>
          <p className="mt-2 text-center text-xs text-slate-500">
            {t("auth.demoHint")}
          </p>
        </div>
      </div>
    </div>
  );
}
