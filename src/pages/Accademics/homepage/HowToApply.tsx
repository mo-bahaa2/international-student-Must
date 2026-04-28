import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PdfResourceCard } from '../../../components/PdfResourceCard';
import { getAdmissionSections, type AdmissionSection } from '../../../services/cmsApi';

const SECTION_LABELS: Record<string, string> = {
  'how-to-apply': 'How to Apply',
  'required-documents': 'Required Documents',
  'external-transfer-requirements': 'External Transfer Requirements',
};

export default function HowToApply() {
  const [sections, setSections] = useState<AdmissionSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetch = async () => {
      try {
        const rows = await getAdmissionSections();
        if (rows.length === 0) {
          setUseFallback(true);
        } else {
          setSections(rows);
        }
      } catch {
        setUseFallback(true);
      } finally {
        setIsLoading(false);
      }
    };
    void fetch();
  }, []);

  const hashString = location.hash.replace('#', '');
  const activeSectionKey = hashString || (sections.length > 0 ? sections[0].sectionKey : 'how-to-apply');
  const visibleSections = sections.filter((section) => section.sectionKey === activeSectionKey);

  return (
    <section className="min-h-screen bg-slate-50 py-24 pt-32 dark:bg-[#070d19]">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Admission</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          Step-by-step guidance for applying to the university.
        </p>

        {isLoading && (
          <div className="mt-8 animate-pulse text-emerald-600 dark:text-emerald-400">Loading...</div>
        )}

        {!isLoading && useFallback && (
          <div className="mt-8 max-w-3xl">
            <PdfResourceCard title="Admission Guide" url="/How%20to%20Apply.pdf" />
          </div>
        )}

        {!isLoading && !useFallback && (
          <div className="mt-8 space-y-10">
            {visibleSections.length > 0 ? (
              visibleSections.map((section) => (
                <div key={section.sectionKey} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    {SECTION_LABELS[section.sectionKey] || section.sectionKey}
                  </h2>

                  {section.steps.length > 0 && (
                    <ol className="space-y-3 list-none">
                      {section.steps.map((step, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-sm font-bold">
                            {i + 1}
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 pt-0.5">{step}</p>
                        </li>
                      ))}
                    </ol>
                  )}

                  {section.attachments.length > 0 && (
                    <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${section.steps.length > 0 ? 'mt-6' : ''}`}>
                      {section.attachments.map((att) => (
                        <PdfResourceCard key={att.id} title={att.title} url={att.fileUrl} />
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-slate-500">No content available for this section.</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
