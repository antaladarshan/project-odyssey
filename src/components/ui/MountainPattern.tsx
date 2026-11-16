export default function MountainPattern() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 700 320"
      preserveAspectRatio="xMinYMax slice"
      className="absolute left-0 bottom-0 h-full w-[70%] text-black/10"
      fill="currentColor"
    >
      <polygon points="0,320 0,200 90,110 140,160 230,40 330,170 400,120 520,230 600,170 700,260 700,320" />
      <polygon points="60,320 110,230 160,320" />
      <polygon points="150,320 215,200 280,320" />
      <polygon points="300,320 350,235 400,320" />
      <polygon points="430,320 495,195 560,320" />
      <polygon points="560,320 610,240 660,320" />
    </svg>
  );
}
