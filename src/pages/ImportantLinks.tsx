import { useEffect, useState } from 'react';
import { getImportantLinks, type ImportantLinkItem } from '../services/cmsApi';

function ImportantLinkCard({ item }: { item: ImportantLinkItem }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 dark:border-slate-700 dark:bg-slate-800/40">
      <div className="overflow-hidden bg-slate-100 h-[280px] dark:bg-slate-800">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-slate-400 dark:text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl font-bold text-slate-900 dark:text-white transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-300 hover:underline mb-3 line-clamp-2"
        >
          {item.title}
        </a>
        {item.description && (
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-3 flex-1">
            {item.description}
          </p>
        )}
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
        >
          Visit link
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </article>
  );
}

export default function ImportantLinksPage() {
  const [links, setLinks] = useState<ImportantLinkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const data = await getImportantLinks();
        setLinks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load important links.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchLinks();
  }, []);

  return (
    <div className="min-h-screen bg-white py-24 pt-32 dark:bg-[#070d19]">
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-12">
        <div className="mb-16 text-center sm:text-left">
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">Important Links</h1>
          <p className="text-xl font-medium text-emerald-700 dark:text-emerald-400">Quick access to key resources and external references.</p>
        </div>

        {isLoading && (
          <p className="animate-pulse text-emerald-600 dark:text-emerald-400">Loading important links...</p>
        )}

        {!isLoading && error && (
          <div className="rounded-xl border border-dashed border-red-300 p-8 text-center text-red-700 dark:border-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {!isLoading && !error && links.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No important links available yet.
          </div>
        )}

        {!isLoading && !error && links.length > 0 && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {links.map((item) => (
              <ImportantLinkCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
