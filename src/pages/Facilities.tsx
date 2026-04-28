import { useEffect, useState } from 'react';
import { ArrowRight, Building2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getFacilitiesSections,
  type FacilityItem,
} from '../services/cmsApi';

const facilityFallbackImage = `${import.meta.env.BASE_URL}must.jpg`;

function toPlainText(html: string): string {
  return html
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function Facilities() {
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState<FacilityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const sectionFromHash = window.location.hash.replace('#', '');
    if (sectionFromHash === 'international-handbook') {
      navigate('/international-handbook', { replace: true });
      return;
    }

    const loadFacilitiesPage = async () => {
      try {
        const facilitiesRows = await getFacilitiesSections('must-facilities');
        setFacilities(facilitiesRows);
        setStatus(!facilitiesRows.length ? 'No facilities content available yet.' : '');
      } catch (error) {
        console.error('Failed to load facilities page content:', error);
        setStatus('Could not load facilities content from Supabase.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadFacilitiesPage();

    if (!sectionFromHash) {
      return;
    }

    const element = document.getElementById(sectionFromHash);
    if (!element) {
      return;
    }

    window.setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#f6f7fb] py-24 pt-32">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8">
        <header className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#02b35a]">Facilities</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-[#0b2f72] sm:text-4xl">
            Explore MUST Facilities
          </h1>
        </header>

        {isLoading ? (
          <div className="mt-10 rounded-[1.75rem] border border-slate-200/80 bg-white p-8 text-emerald-700 shadow-sm dark:border-slate-700 dark:bg-[#08132e] dark:text-emerald-300">
            Loading facilities content...
          </div>
        ) : status ? (
          <div className="mt-10 rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600 shadow-sm dark:border-slate-700 dark:bg-[#08132e] dark:text-slate-300">
            {status}
          </div>
        ) : (
          <section
            id="must-facilities"
            className="mt-10 scroll-mt-40"
          >
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-[#0b2f72]">Must Facilities</h2>
                <p className="mt-2 text-sm text-slate-600">Campus places and student services.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0b2f72] shadow-sm">
                <Building2 className="h-4 w-4" />
                {facilities.length} facilities
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {facilities.map((facility) => (
                <article
                  key={facility.id}
                  className="group overflow-hidden bg-white shadow-[0_14px_34px_-24px_rgba(15,23,42,0.28)] transition duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={facility.thumbnailUrl || facilityFallbackImage}
                      alt={facility.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-4 p-9">
                    <h3 className="text-[2rem] font-black uppercase tracking-tight text-[#0b2f72]">
                      {facility.title}
                    </h3>
                    <p className="line-clamp-3 min-h-[4.5rem] text-base leading-7 text-slate-600">
                      {toPlainText(facility.contentHtml) || 'Read more about this facility.'}
                    </p>
                    <Link
                      to={`/facilities/${facility.id}`}
                      className="inline-flex items-center gap-2 text-xl font-medium text-[#0b2f72] transition hover:text-[#02b35a]"
                    >
                      Read More
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
