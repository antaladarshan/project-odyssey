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
          From the quiet lanes of Jodhpur Village to the buzz of SG Highway, Project Odyssey puts you
          in the middle of Ahmedabad — close to ISRO SAC, Star Bazaar and the metro. Choose a bunk in a
          dorm or take a whole room, with privacy curtains, personal lockers and a shared common area to
          meet fellow travellers. Book direct, no middleman.
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
