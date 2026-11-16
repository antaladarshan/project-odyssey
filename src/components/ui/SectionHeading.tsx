/** "Your next / Hostel Destination" style heading: script line + bold pink line. */
export default function SectionHeading({
  script,
  title,
  sub,
  align = "center",
  light = false,
}: {
  script?: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
  /** Use on dark/colored backgrounds. */
  light?: boolean;
}) {
  const a = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-2 ${a}`}>
      <h2 className={`flex flex-col leading-none ${a}`}>
        {script && (
          <span className={`headline-script text-3xl sm:text-4xl ${light ? "!text-white" : ""}`}>{script}</span>
        )}
        <span
          className={`font-display font-extrabold text-3xl sm:text-5xl ${
            light ? "text-po-yellow" : "text-po-pink"
          } ${script ? "-mt-0.5" : ""}`}
        >
          {title}
        </span>
      </h2>
      {sub && (
        <p className={`max-w-xl text-sm sm:text-base ${light ? "text-white/85" : "text-gray-600"}`}>{sub}</p>
      )}
    </div>
  );
}
