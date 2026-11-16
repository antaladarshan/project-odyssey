export default function CheckinDetailLoading() {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6 p-4 md:p-6">
      <div className="h-5 w-36 animate-pulse rounded-lg bg-ink-navy/10" />
      <div className="h-10 w-48 animate-pulse rounded-lg bg-ink-navy/10" />
      <div className="h-28 animate-pulse rounded-2xl bg-ink-navy/5" />
      <div className="h-72 animate-pulse rounded-2xl bg-ink-navy/5" />
    </div>
  );
}
