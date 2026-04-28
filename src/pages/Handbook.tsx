import { useEffect, useState } from 'react';
import { getInternationalHandbook, type InternationalHandbookDocument } from '../services/cmsApi';
import { PdfResourceCard } from '../components/PdfResourceCard';

export default function HandbookPage() {
  const [handbook, setHandbook] = useState<InternationalHandbookDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const doc = await getInternationalHandbook();
        setHandbook(doc);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load handbook.');
      } finally {
        setIsLoading(false);
      }
    };
    void fetch();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-24 pt-32 dark:bg-[#070d19]">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">International Student Handbook</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          Official handbook for international students at the College of Information Technology.
        </p>

        <div className="mt-8 max-w-xl">
          {isLoading && (
            <div className="animate-pulse text-emerald-600 dark:text-emerald-400">Loading handbook...</div>
          )}

          {!isLoading && error && (
            <div className="rounded-xl border border-dashed border-red-300 p-6 text-red-700 dark:border-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          {!isLoading && !error && !handbook && (
            <div className="rounded-xl border border-dashed border-slate-300 p-6 text-slate-500 dark:border-slate-700 dark:text-slate-400">
              Handbook not yet available.
            </div>
          )}

          {!isLoading && !error && handbook && (
            <PdfResourceCard title={handbook.title} url={handbook.fileUrl} />
          )}
        </div>
      </div>
    </div>
  );
}
