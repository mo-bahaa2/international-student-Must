import { useEffect, useState } from 'react';
import { ArrowLeft, Building2, Images } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getFacilityById, renderRichText, type FacilityItem } from '../services/cmsApi';

const fallbackImage = `${import.meta.env.BASE_URL}must.jpg`;

export function FacilityDetails() {
  const { facilityId } = useParams<{ facilityId: string }>();
  const [facility, setFacility] = useState<FacilityItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const loadFacility = async () => {
      if (!facilityId) {
        setStatus('Facility not found.');
        setIsLoading(false);
        return;
      }

      try {
        const record = await getFacilityById(facilityId);
        if (!record || record.sectionType !== 'must-facilities') {
          setStatus('Facility not found.');
        } else {
          setFacility(record);
        }
      } catch (error) {
        console.error('Failed to load facility details:', error);
        setStatus('Could not load facility details.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadFacility();
  }, [facilityId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] py-24 pt-32">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-8">
          <div className="rounded-[1.75rem] bg-white p-8 text-emerald-700 shadow-sm">
            Loading facility details...
          </div>
        </div>
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] py-24 pt-32">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-8">
          <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
            {status || 'Facility not found.'}
          </div>
        </div>
      </div>
    );
  }

  const heroImage = facility.thumbnailUrl || facility.galleryUrls[0] || fallbackImage;

  return (
    <div className="min-h-screen bg-[#f6f7fb] py-24 pt-32">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-8">
        <Link
          to="/facilities#must-facilities"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#0b2f72] transition hover:text-[#02b35a]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Facilities
        </Link>

        <section className="overflow-hidden rounded-[2rem] bg-white px-5 py-8 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.25)] sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[860px] text-center">
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#02b35a]">Must Facility</p>
            <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#0b2f72] sm:text-5xl">
              {facility.title}
            </h1>
          </div>

          <div className="mx-auto mt-10 max-w-[860px] overflow-hidden bg-slate-100 shadow-sm">
            <img src={heroImage} alt={facility.title} className="h-full w-full object-cover" />
          </div>

          <article className="mx-auto mt-10 max-w-[860px]">
            <div
              className="prose prose-slate max-w-none text-center leading-7 prose-headings:text-[#0b2f72] prose-a:text-[#02b35a] prose-strong:text-slate-900 [&_img]:rounded-none [&_img]:shadow-none"
              dangerouslySetInnerHTML={{ __html: renderRichText(facility.contentHtml) }}
            />
          </article>

          <div className="mx-auto mt-12 max-w-[860px]">
            <div className="flex items-center justify-center gap-3 text-[#02b35a]">
              <Images className="h-5 w-5" />
              <h2 className="text-2xl font-black">Gallery</h2>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[heroImage, ...facility.galleryUrls.filter((url) => url !== heroImage)].slice(0, 6).map((imageUrl, index) => (
                <div key={`${imageUrl}-${index}`} className="overflow-hidden bg-slate-100 shadow-sm">
                  <img src={imageUrl} alt={`${facility.title} ${index + 1}`} className="h-40 w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
