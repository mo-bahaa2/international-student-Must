import { useEffect, useState } from 'react';
import { PdfResourceCard } from '../../../components/PdfResourceCard';
import { getAcademicAdvisingList, type AcademicAdvisingItem } from '../../../services/cmsApi';

export default function Advising() {
  const [resources, setResources] = useState<AcademicAdvisingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchAcademicAdvising = async () => {
      try {
        const rows = await getAcademicAdvisingList();
        setResources(rows);
        setStatus(rows.length ? '' : 'No academic advising files available yet.');
      } catch (error) {
        console.error('Error fetching academic advising resources:', error);
        setStatus('Network error: Could not connect to Supabase.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchAcademicAdvising();
  }, []);

  return (
    <section className="min-h-screen bg-slate-50 py-24 pt-32 dark:bg-[#070d19]">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Academic Advising</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          Download or open the official academic advising documents.
        </p>

        {isLoading ? (
          <div className="mt-8 animate-pulse text-emerald-600 dark:text-emerald-400">Loading academic advising documents from Supabase...</div>
        ) : status ? (
          <div className="mt-8 rounded-xl border border-dashed border-slate-300 p-8 text-center text-emerald-700 dark:border-slate-700 dark:text-emerald-400">
            {status}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {resources.map((item) => (
              <PdfResourceCard key={item.id} title={item.title} url={item.fileUrl} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
