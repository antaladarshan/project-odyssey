export interface IdDocument {
  path: string;
  signedUrl: string | null;
}

// A traveler/guest can attach several ID documents (front+back scan,
// passport + visa page, etc). PDFs can't render as <img>, so they get a
// "View PDF" tile that opens the signed URL instead.
export function IdDocumentGallery({ documents, altText }: { documents: IdDocument[]; altText: string }) {
  if (documents.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {documents.map(({ path, signedUrl }) => {
        if (!signedUrl) {
          return (
            <p key={path} className="text-sm text-charcoal/60">
              Could not load a document.
            </p>
          );
        }
        if (path.toLowerCase().endsWith(".pdf")) {
          return (
            <a
              key={path}
              href={signedUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-32 w-32 items-center justify-center rounded-xl border border-ink-navy/10 text-center text-sm text-bronze hover:underline"
            >
              View PDF
            </a>
          );
        }
        return (
          // eslint-disable-next-line @next/next/no-img-element -- private bucket, signed URL changes per request
          <img
            key={path}
            src={signedUrl}
            alt={altText}
            className="h-32 w-32 rounded-xl border border-ink-navy/10 object-cover"
          />
        );
      })}
    </div>
  );
}
