import { useEffect, useState } from 'react';
import { getFacilitySections, renderRichText, type FacilitySection } from '../services/cmsApi';

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-xl aspect-video bg-slate-100 dark:bg-slate-800">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}

function FacilitySectionCard({ section }: { section: FacilitySection }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900 overflow-hidden">
      {section.thumbnailUrl && (
        <div className="h-64 overflow-hidden">
          <img src={section.thumbnailUrl} alt={section.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-6">
        {section.title && (
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">{section.title}</h2>
        )}
        {section.contentHtml && (
          <div
            className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300"
            dangerouslySetInnerHTML={{ __html: renderRichText(section.contentHtml) }}
          />
        )}
        {section.galleryUrls.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {section.galleryUrls.map((url, i) => (
              <GalleryImage key={url + i} src={url} alt={`${section.title} image ${i + 1}`} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export function Facilities() {
  const [sections, setSections] = useState<FacilitySection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const rows = await getFacilitySections();
        if (rows.length === 0) {
          setStatus('No facility information available yet.');
        } else {
          setSections(rows);
        }
      } catch (error) {
        console.error('Error fetching facilities:', error);
        setStatus('Network error: Could not load facilities information.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchFacilities();
  }, []);

  return (
    <div className="min-h-screen bg-white py-24 pt-32 dark:bg-[#070d19]">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8">
        <h1 className="mb-8 text-4xl font-bold text-slate-900 dark:text-slate-100">Facilities</h1>

        {isLoading && (
          <div className="animate-pulse text-emerald-600 dark:text-emerald-400">Loading facilities...</div>
        )}

        {!isLoading && status && (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-emerald-700 dark:border-slate-700 dark:text-emerald-400">
            {status}
          </div>
        )}

        {!isLoading && !status && (
          <div className="space-y-8">
            {sections.map((section) => (
              <FacilitySectionCard key={section.id} section={section} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
