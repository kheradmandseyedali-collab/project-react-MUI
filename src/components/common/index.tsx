export function Progress({
  value,
  color = "bg-brand-500",
}: {
  value: number;
  color?: string;
}) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
      <div
        className={`h-full rounded-full transition-all duration-700 ${color}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
export function SectionTitle({
  title,
  link,
}: {
  title: string;
  link?: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
        {title}
      </h2>
      {link && (
        <a
          href={link}
          className="text-xs font-semibold text-brand-500 hover:text-brand-600"
        >
          View all →
        </a>
      )}
    </div>
  );
}
