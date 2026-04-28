import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { getImportantLinksList, type ImportantLinkItem } from '../services/cmsApi';

export function ImportantLinks() {
  const [links, setLinks] = useState<ImportantLinkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const rows = await getImportantLinksList();
        setLinks(rows);
        setStatus(rows.length ? '' : 'No important links available yet.');
      } catch (error) {
        console.error('Error fetching important links:', error);
        setStatus('Network error: Could not connect to Supabase.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchLinks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-24 pt-32 dark:bg-[#070d19]">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Important Links</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          Quick access to official pages and resources from the sector.
        </p>

        {isLoading ? (
          <div className="mt-8 animate-pulse text-emerald-600 dark:text-emerald-400">Loading important links from Supabase...</div>
        ) : status ? (
          <div className="mt-8 rounded-xl border border-dashed border-slate-300 p-8 text-center text-emerald-700 dark:border-slate-700 dark:text-emerald-400">
            {status}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {links.map((item) => (
              <article
                key={item.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
              >
                {item.imageUrl ? (
                  <div className="aspect-[16/9] w-full bg-slate-100 dark:bg-slate-800">
                    <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="flex aspect-[16/9] w-full items-center justify-center bg-slate-100 dark:bg-slate-800">
                    <ExternalLink className="h-12 w-12 text-slate-400 dark:text-slate-500" aria-hidden />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{item.title}</h2>
                  {item.description ? (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
                  ) : null}
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Open link
                    <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
