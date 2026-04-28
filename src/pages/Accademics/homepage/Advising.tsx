import { useEffect, useState } from 'react';
import { PdfResourceCard } from '../../../components/PdfResourceCard';
import { getAcademicAdvisingDocuments, type AcademicAdvisingDocument } from '../../../services/cmsApi';

const STATIC_FALLBACK: AcademicAdvisingDocument[] = [
  { id: 'static-en', title: 'Academic Advising Guide (English)', fileUrl: '/Academic%20Advising%20Guide%20EN.pdf' },
  { id: 'static-ar', title: 'Academic Advising Guide (Arabic)', fileUrl: '/Academic%20Advising%20Guide%20AR.pdf' },
];

export default function Advising() {
  const [documents, setDocuments] = useState<AcademicAdvisingDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const rows = await getAcademicAdvisingDocuments();
        setDocuments(rows.length ? rows : STATIC_FALLBACK);
      } catch {
        setDocuments(STATIC_FALLBACK);
      } finally {
        setIsLoading(false);
      }
    };
    void fetch();
  }, []);

  return (
    <section className="min-h-screen bg-slate-50 py-24 pt-32 dark:bg-[#070d19]">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Academic Advising</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          Download or open the official academic advising guides.
        </p>

        {isLoading ? (
          <div className="mt-8 animate-pulse text-emerald-600 dark:text-emerald-400">Loading...</div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {documents.map((doc) => (
              <PdfResourceCard key={doc.id} title={doc.title} url={doc.fileUrl} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
