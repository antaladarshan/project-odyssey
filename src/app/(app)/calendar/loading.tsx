export default function CalendarLoading() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="h-8 w-40 animate-pulse rounded-lg bg-ink-navy/10" />
      <div className="h-96 animate-pulse rounded-xl bg-ink-navy/5" />
    </div>
  );
}
