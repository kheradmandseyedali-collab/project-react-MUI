import { useState } from "react";
import { Card, Button, Input, PageHeader, Badge } from "@/components/ui";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { useCartStore } from "@/store/cartStore";
export default function Profile() {
  const user = useAuthStore((s) => s.user);
  const items = useCartStore((s) => s.items);
  const notify = useUIStore((s) => s.notify);
  const [bio, setBio] = useState(
    localStorage.getItem("nova-bio") ||
      "Building thoughtful things with a great team. Passionate about design, technology, and creating delightful experiences.",
  );
  const [edit, setEdit] = useState(false);
  const save = () => {
    localStorage.setItem("nova-bio", bio);
    setEdit(false);
    notify("Profile bio saved");
  };
  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="YOUR PERSONAL SPACE"
        title="My profile"
        description="Your details, your story."
      />
      <Card className="relative mb-6 overflow-hidden">
        <div className="h-36 bg-gradient-to-r from-indigo-500 via-brand-500 to-violet-500">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(white 1px,transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>
        <div className="relative flex flex-col items-start gap-4 px-6 pb-6 sm:flex-row sm:items-end">
          <img
            src={user?.image || "https://i.pravatar.cc/160?img=12"}
            className="-mt-14 h-28 w-28 rounded-3xl border-4 border-white bg-white object-cover shadow-lg dark:border-slate-900"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {user?.firstName} {user?.lastName}
              </h2>
              <Badge color="green">● Active</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {user?.company?.title || "Workspace member"} ·{" "}
              {user?.company?.name || "Nova Workspace"}
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => (edit ? save() : setEdit(true))}
          >
            {edit ? "Save changes" : "✎ Edit profile"}
          </Button>
        </div>
      </Card>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold text-slate-900 dark:text-white">
              About me
            </h3>
            {edit ? (
              <>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="mt-4 w-full rounded-xl border border-slate-200 bg-white/70 p-4 text-sm leading-6 outline-none focus:border-brand-400 dark:border-white/10 dark:bg-white/[.04] dark:text-white"
                />
                <div className="mt-3 flex gap-2">
                  <Button onClick={save}>Save bio</Button>
                  <Button variant="ghost" onClick={() => setEdit(false)}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                {bio}
              </p>
            )}
          </Card>
          <Card className="p-6">
            <h3 className="font-bold text-slate-900 dark:text-white">
              Personal information
            </h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {[
                ["First name", user?.firstName],
                ["Last name", user?.lastName],
                ["Email address", user?.email],
                ["Phone number", user?.phone || "Not provided"],
                ["Username", `@${user?.username || ""}`],
                ["Department", user?.company?.department || "Not specified"],
              ].map(([k, v]) => (
                <div key={String(k)}>
                  <p className="text-xs font-semibold text-slate-400">{k}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold text-slate-900 dark:text-white">
              Workspace stats
            </h3>
            <div className="mt-5 space-y-4">
              {[
                [
                  "Products in cart",
                  items.reduce((n, i) => n + i.quantity, 0),
                  "🛍️",
                ],
                ["Member since", "Oct 2024", "✦"],
                ["Account status", "Verified", "✓"],
              ].map(([a, b, c]) => (
                <div key={String(a)} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10">
                    {c}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400">{a}</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">
                      {b}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-bold text-slate-900 dark:text-white">
              Company
            </h3>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-violet-500 text-xl text-white">
                ✦
              </div>
              <div>
                <p className="font-bold dark:text-white">
                  {user?.company?.name || "Nova Workspace"}
                </p>
                <p className="text-xs text-slate-400">
                  {user?.company?.department || "Team member"}
                </p>
              </div>
            </div>
            <div className="mt-5 border-t border-slate-100 pt-4 dark:border-white/[.06]">
              <p className="text-xs text-slate-400">Role</p>
              <p className="mt-1 text-sm font-semibold dark:text-white">
                {user?.company?.title || "Workspace member"}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
