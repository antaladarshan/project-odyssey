export default function Intro() {
  const stats = [
    { value: "3", label: "Dorm rooms" },
    { value: "14", label: "Total beds" },
    { value: "₹700", label: "Per bed / night" },
  ];

  return (
    <section id="intro" className="py-20 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center flex flex-col gap-5">
        <h2 className="flex flex-col items-center leading-none">
          <span className="headline-script text-4xl sm:text-5xl">Your next</span>
          <span className="font-display font-extrabold text-4xl sm:text-6xl text-po-pink -mt-1">
            Stay in Ahmedabad
          </span>
        </h2>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          Project Odyssey is a backpacker hostel in Satellite that gets the details right — bunk beds
          with privacy curtains, fast Wi-Fi, personal lockers on every bed and a shared kitchen that
          actually works. No OTA markup, no middleman. Just book direct and arrive.
        </p>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-po-cream py-5">
              <p className="font-display font-extrabold text-3xl text-po-pink">{s.value}</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
