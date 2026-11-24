import Image from "next/image";
import { Camera } from "lucide-react";

/** Photo slot: renders the image when a path is set, otherwise a "coming soon" placeholder. */
export default function StudioImage({
  src,
  label,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  position = "center",
}: {
  src: string | null;
  label: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** CSS object-position, to choose which part of a tall photo stays in frame. */
  position?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl ${className}`}>
      {src ? (
        <Image src={src} alt={label} fill quality={90} priority={priority} sizes={sizes}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-po-cream border-2 border-dashed border-po-pink/30 rounded-3xl">
          <div className="flex flex-col items-center gap-2 px-4 text-center text-po-pink/70">
            <Camera size={28} />
            <span className="text-xs font-bold tracking-widest uppercase">Photo coming soon</span>
            <span className="text-sm text-gray-500">{label}</span>
          </div>
        </div>
      )}
    </div>
  );
}
