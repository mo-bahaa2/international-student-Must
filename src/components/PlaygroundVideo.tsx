type PlaygroundVideoProps = {
  src: string;
  title?: string;
  caption?: string;
  poster?: string;
  /** MIME type for the `<source>` element (default video/mp4). */
  mimeType?: string;
};

export function PlaygroundVideo({
  src,
  title,
  caption,
  poster,
  mimeType = 'video/mp4',
}: PlaygroundVideoProps) {
  return (
    <section>
      {title ? (
        <h2 className="mb-4 text-xl font-semibold text-emerald-400">{title}</h2>
      ) : null}
      <figure className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-slate-600 bg-black shadow-lg">
        <div className="aspect-video w-full">
          <video
            className="h-full w-full object-contain"
            controls
            playsInline
            preload="metadata"
            poster={poster}
            aria-label={title || 'Video'}
          >
            <source src={src} type={mimeType} />
            Your browser does not support the video tag.
          </video>
        </div>
        {caption ? (
          <figcaption className="border-t border-slate-700 px-4 py-3 text-center text-sm text-slate-400">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    </section>
  );
}
