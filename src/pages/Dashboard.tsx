import { Link } from "react-router-dom";
import { Card, PageHeader, StatCard, Badge } from "@/components/ui";
import { Progress } from "@/components/common";
import { useAuthStore } from "@/store/authStore";
import { useI18n } from "@/i18n";
const bars = [35, 52, 42, 68, 55, 80, 62, 94, 71, 83, 65, 100];
export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const { t } = useI18n();
  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="MONDAY, OCTOBER 20, 2025"
        title={
          <>
            {t("dashboard.greeting")}, {user?.firstName || "Emily"}{" "}
            <span className="inline-block origin-bottom-right animate-bounce">
              ✦
            </span>
          </>
        }
        description={t("dashboard.subtitle")}
        action={
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:shadow-glow"
          >
            ＋ {t("dashboard.exploreShop")}
          </Link>
        }
      />
      <Card className="relative mb-7 overflow-hidden border-0 bg-gradient-to-r from-[#4939d2] via-[#6154e8] to-[#8a55e7] p-6 text-white sm:p-8">
        <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full border-[40px] border-white/[.06]" />
        <div className="absolute right-40 top-12 h-44 w-44 rounded-full bg-violet-300/20 blur-3xl" />
        <div className="relative z-10 max-w-xl">
          <Badge color="gray">✦ {t("dashboard.snapshot")}</Badge>
          <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">
            {t("dashboard.moving")}
          </h2>
          <p className="mt-3 text-sm leading-6 text-indigo-100">
            Your store is up <strong className="text-white">12.8%</strong> this
            month. Keep the momentum going — your team is doing great work.
          </p>
          <Link
            to="/todos"
            className="mt-5 inline-flex rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-indigo-700 hover:bg-indigo-50"
          >
            {t("dashboard.reviewTasks")}　→
          </Link>
        </div>
        <div className="absolute bottom-4 right-12 hidden h-36 w-36 items-center justify-center rounded-full border border-white/20 bg-white/10 text-5xl backdrop-blur-md lg:flex">
          ↗
        </div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label={t("dashboard.revenue")}
          value="$48,294"
          change="12.8%"
          icon="$"
        />
        <StatCard
          label={t("dashboard.orders")}
          value="1,284"
          change="8.2%"
          icon="▣"
          tone="violet"
        />
        <StatCard
          label={t("dashboard.customers")}
          value="386"
          change="18.6%"
          icon="♙"
          tone="emerald"
        />
        <StatCard
          label={t("dashboard.conversion")}
          value="3.24%"
          change="4.3%"
          icon="◉"
          tone="amber"
        />
      </div>
      <div className="mt-7 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                {t("dashboard.revenueOverview")}
              </p>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  $24,780
                </span>
                <Badge color="green">+12.8%</Badge>
              </div>
            </div>
            <select className="rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-xs text-slate-600 dark:border-white/10 dark:text-slate-300">
              <option>{t("dashboard.last12Months")}</option>
              <option>{t("dashboard.last30Days")}</option>
            </select>
          </div>
          <div className="mt-8 flex h-44 items-end gap-2 sm:gap-4">
            {bars.map((h, i) => (
              <div
                key={i}
                className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 group-hover:opacity-80 ${i === 11 ? "bg-gradient-to-t from-brand-600 to-violet-400" : "bg-brand-500/15 dark:bg-brand-400/20"}`}
                  style={{ height: `${h}%` }}
                />
                <span className="text-[9px] text-slate-400">
                  {
                    [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ][i]
                  }
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-slate-100 pt-5 dark:border-white/[.06]">
            <div>
              <p className="text-xs text-slate-400">
                {t("dashboard.grossSales")}
              </p>
              <p className="mt-1 font-bold dark:text-white">$64,320</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">
                {t("dashboard.averageOrderValue")}
              </p>
              <p className="mt-1 font-bold dark:text-white">$128.40</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">{t("dashboard.refunds")}</p>
              <p className="mt-1 font-bold dark:text-white">$1,240</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900 dark:text-white">
              {t("dashboard.storePerformance")}
            </h2>
            <span className="text-lg text-slate-400">···</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">{t("dashboard.goals")}</p>
          <div className="mt-6 space-y-5">
            {[
              [
                t("dashboard.monthlyRevenue"),
                "$48.2k / $60k",
                80,
                "bg-indigo-500",
              ],
              [
                t("dashboard.newCustomersGoal"),
                "386 / 500",
                77,
                "bg-violet-500",
              ],
              [
                t("dashboard.ordersFulfilled"),
                "1,042 / 1,200",
                87,
                "bg-emerald-500",
              ],
              [
                t("dashboard.customerSatisfaction"),
                "4.8 / 5.0",
                96,
                "bg-amber-500",
              ],
            ].map(([a, b, c, d]) => (
              <div key={String(a)}>
                <div className="mb-2 flex justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {a}
                  </span>
                  <span className="text-slate-400">{b}</span>
                </div>
                <Progress value={Number(c)} color={String(d)} />
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-emerald-500/[.08] p-3 text-xs text-emerald-700 dark:text-emerald-300">
            ✦ <strong>{t("dashboard.onTrack")}</strong>{" "}
            {t("dashboard.aheadOfTarget")}
          </div>
        </Card>
      </div>
      <div className="mt-7 grid gap-6 xl:grid-cols-2">
        <Card className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 dark:text-white">
              {t("dashboard.recentActivity")}
            </h2>
            <button className="text-xs font-semibold text-brand-500">
              {t("dashboard.viewAll")} →
            </button>
          </div>
          <div className="space-y-4">
            {[
              [
                "🛍️",
                t("dashboard.recentNewOrder"),
                t("dashboard.recentOrderDetail"),
                "2 min ago",
                "green",
              ],
              [
                "♙",
                t("dashboard.recentNewCustomer"),
                t("dashboard.recentCustomerDetail"),
                "18 min ago",
                "indigo",
              ],
              [
                "📦",
                t("dashboard.recentStock"),
                t("dashboard.recentStockDetail"),
                "1 hr ago",
                "violet",
              ],
              [
                "⭐",
                t("dashboard.recentReview"),
                t("dashboard.recentReviewDetail"),
                "3 hrs ago",
                "amber",
              ],
            ].map(([ic, t, d, time, color]) => (
              <div key={t} className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${color}-500/10`}
                >
                  {ic}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {t}
                  </p>
                  <p className="truncate text-xs text-slate-400">{d}</p>
                </div>
                <span className="whitespace-nowrap text-[10px] text-slate-400">
                  {time}
                </span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 dark:text-white">
              {t("dashboard.quickActions")}
            </h2>
            <span className="text-xs text-slate-400">
              {t("dashboard.yourShortcuts")}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              [
                "/products",
                "▧",
                t("dashboard.browseProducts"),
                `18 ${t("dashboard.items")}`,
                "from-indigo-500/15 to-violet-500/10",
              ],
              [
                "/cart",
                "▣",
                t("dashboard.openCart"),
                t("dashboard.readyToCheckout"),
                "from-emerald-500/15 to-teal-500/10",
              ],
              [
                "/posts",
                "▤",
                t("dashboard.communityPosts"),
                t("dashboard.shareUpdate"),
                "from-amber-500/15 to-orange-500/10",
              ],
              [
                "/todos",
                "✓",
                t("dashboard.manageTasks"),
                t("dashboard.stayOnTrack"),
                "from-pink-500/15 to-rose-500/10",
              ],
            ].map(([to, ic, title, sub, bg]) => (
              <Link
                to={to}
                key={to}
                className={`rounded-2xl border border-slate-100 bg-gradient-to-br ${bg} p-4 transition hover:-translate-y-1 hover:shadow-lg dark:border-white/[.06]`}
              >
                <span className="text-xl">{ic}</span>
                <p className="mt-3 text-sm font-bold text-slate-800 dark:text-white">
                  {title}
                </p>
                <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                  {sub}
                </p>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
