import { BookOpen, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getInternationalHandbookDocument, type InternationalHandbookItem } from '../services/cmsApi';

export function InternationalHandbook() {
  const [handbook, setHandbook] = useState<InternationalHandbookItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const loadHandbook = async () => {
      try {
        const handbookRow = await getInternationalHandbookDocument();
        setHandbook(handbookRow);
        setStatus(!handbookRow ? 'No handbook uploaded yet.' : '');
      } catch (error) {
        console.error('Failed to load international handbook:', error);
        setStatus('Could not load handbook from Supabase.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadHandbook();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f7fb] py-24 pt-32">
      <div className="mx-auto w-full max-w-[1100px] px-5 sm:px-8">
        <header className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#02b35a]">International Student Book</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-[#0b2f72] sm:text-4xl">
            International Students Handbook
          </h1>
        </header>

        {isLoading ? (
          <div className="rounded-[1.75rem] bg-white p-8 text-emerald-700 shadow-sm">
            Loading handbook...
          </div>
        ) : status ? (
          <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600 shadow-sm">
            {status}
          </div>
        ) : (
          <section className="rounded-[2rem] bg-white p-8 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.25)] sm:p-10">
            <div className="mx-auto max-w-[760px] text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e9fff3] text-[#02b35a]">
                <BookOpen className="h-8 w-8" />
              </div>
              <h2 className="mt-5 text-2xl font-black text-[#0b2f72] sm:text-3xl">
                {handbook?.title || 'International Students Handbook'}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Open the latest handbook PDF for international students from Supabase.
              </p>

              {handbook?.fileUrl ? (
                <a
                  href={handbook.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#0b2f72] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#02b35a]"
                >
                  <FileText className="h-4 w-4" />
                  Open PDF
                </a>
              ) : null}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
