import { useEffect, useMemo, useState } from 'react';
import { getAdvisorAnnouncementsList, type AdvisorAnnouncementItem } from '../services/cmsApi';

function formatAnnouncementDate(value: string): string {
  if (!value) {
    return '';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString('en-GB');
}

export function AdvisingAnnouncements() {
  const [announcements, setAnnouncements] = useState<AdvisorAnnouncementItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const rows = await getAdvisorAnnouncementsList();
        setAnnouncements(rows);
        setStatus(rows.length ? '' : 'No announcements available yet.');
      } catch (error) {
        console.error('Error fetching advisor announcements:', error);
        setStatus('Network error: Could not connect to Supabase.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchAnnouncements();
  }, []);

  const sortedAnnouncements = useMemo(() => {
    return [...announcements].sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      if (Number.isNaN(timeA) && Number.isNaN(timeB)) return 0;
      if (Number.isNaN(timeA)) return 1;
      if (Number.isNaN(timeB)) return -1;
      return timeB - timeA;
    });
  }, [announcements]);

  return (
    <section className="min-h-screen bg-slate-50 py-24 pt-32 dark:bg-[#070d19]">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Announcements</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          Latest advisor announcements published from the dashboard.
        </p>

        {isLoading ? (
          <div className="mt-8 animate-pulse text-emerald-600 dark:text-emerald-400">Loading announcements from Supabase...</div>
        ) : status ? (
          <div className="mt-8 rounded-xl border border-dashed border-slate-300 p-8 text-center text-emerald-700 dark:border-slate-700 dark:text-emerald-400">
            <p>{status}</p>
            {status === 'No announcements available yet.' ? (
              <p className="mx-auto mt-4 max-w-xl text-sm text-slate-600 dark:text-slate-400">
              No announcements available yet.
              </p>
            ) : null}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {sortedAnnouncements.map((announcement) => (
              <article
                key={announcement.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="aspect-[4/3] w-full bg-slate-100 dark:bg-slate-800">
                  <img
                    src={announcement.imageUrl || '/assets/1740307130_140_87669_group1000004290.svg'}
                    alt={announcement.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-4 p-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{announcement.title}</h2>
                    {announcement.description ? (
                      <p className="mt-2 whitespace-pre-wrap text-slate-600 dark:text-slate-300">{announcement.description}</p>
                    ) : (
                      <p className="mt-2 text-slate-500 dark:text-slate-400">No description provided.</p>
                    )}
                  </div>

                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {formatAnnouncementDate(announcement.date)}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {announcement.pdfUrl && (
                      <a
                        href={announcement.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      >
                        Open PDF
                      </a>
                    )}
                    {announcement.galleryUrls.length > 0 && (
                      <a
                        href={announcement.galleryUrls[0]}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Open Gallery Image
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
