import { useEffect, useState } from 'react';
import {
  ArrowDownToLine,
  ArrowRight,
  BookOpenText,
  ChevronDown,
  Compass,
  Eye,
  FileText,
  Target,
} from 'lucide-react';
import { getHomeSectionsContent, type HomeSectionContent } from '../services/cmsApi';

const aboutSectorPhotoFrameClassName =
  'relative flex aspect-[2/3] h-[260px] w-auto shrink-0 items-center justify-center sm:h-[300px] lg:h-[340px]';
const aboutSectorPhotoGlowClassName =
  'pointer-events-none absolute -inset-10 z-0 rounded-[2.5rem] bg-[linear-gradient(135deg,rgba(59,130,246,0.07),rgba(96,165,250,0.09),rgba(37,99,235,0.06))] blur-2xl dark:bg-[linear-gradient(135deg,rgba(30,64,175,0.12),rgba(59,130,246,0.1),rgba(30,58,138,0.1))]';
const aboutSectorPhotoClassName =
  'relative z-[1] h-full w-full max-h-full max-w-full object-contain drop-shadow-[0_20px_45px_rgba(15,23,42,0.28)] dark:drop-shadow-[0_22px_50px_rgba(0,0,0,0.55)]';

const homeContent = {
  about: {
    title: 'About Sector',
    eyebrow: 'College Profile',
    description:
      'The sector supports international students through a connected academic environment that combines advising, planning, communication, and practical guidance in one place. It is designed to make each step clearer, from first exploration to daily study life inside the college.',
    body:
      'It brings together communication, planning, student follow-up, and academic direction in a single experience that feels clear, modern, and easy to use.',
    image: `${import.meta.env.BASE_URL}must.jpg`,
  },
  mission: {
    title: 'Mission',
    description:
      'To provide a supportive digital experience that helps international students understand academic opportunities, complete requirements, and stay connected to the college community with confidence.',
    image: `${import.meta.env.BASE_URL}muster.png`,
  },
  vision: {
    title: 'Vision',
    description:
      'To become a clear and welcoming gateway for international students, where information is easy to reach, planning is simpler, and every student feels guided from admission to achievement.',
    image: `${import.meta.env.BASE_URL}Image.png`,
  },
  sectorPlan: {
    title: 'Sector Plan',
    summary:
      'The section closes the page with the main sector plan and gives direct access to its file.',
    pdfLabel: 'Open plan',
    pdfUrl: `${import.meta.env.BASE_URL}How to Apply.pdf`,
  },
};

type SectionKey = 'about-sector' | 'mission' | 'vision' | 'sector-plan';

const sectionKeyAliases: Record<SectionKey, string[]> = {
  'about-sector': ['about-sector', 'about sector', 'about_sector'],
  mission: ['mission'],
  vision: ['vision'],
  'sector-plan': ['sector-plan', 'sector plan', 'sector_plan'],
};

export default function HomePage() {
  const [openPanels, setOpenPanels] = useState<{ mission: boolean; vision: boolean }>({
    mission: true,
    vision: false,
  });
  const [remoteSections, setRemoteSections] = useState<Partial<Record<'about-sector' | 'mission' | 'vision' | 'sector-plan', HomeSectionContent>>>({});

  const togglePanel = (panel: 'mission' | 'vision') => {
    setOpenPanels((current) => ({
      ...current,
      [panel]: !current[panel],
    }));
  };

  useEffect(() => {
    const loadHomeSections = async () => {
      try {
        const sections = await getHomeSectionsContent();
        setRemoteSections(sections);
      } catch (error) {
        console.warn('Failed to load home sections, falling back to local content.', error);
      }
    };

    void loadHomeSections();

    const sectionFromHash = window.location.hash.replace('#', '');
    if (!sectionFromHash) {
      return;
    }

    if (sectionFromHash === 'mission') {
      setOpenPanels((current) => ({
        ...current,
        mission: true,
      }));
    }

    if (sectionFromHash === 'vision') {
      setOpenPanels((current) => ({
        ...current,
        vision: true,
      }));
    }

    const element = document.getElementById(sectionFromHash);
    if (!element) {
      return;
    }

    window.setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  }, []);

  const resolveSection = (sectionKey: SectionKey) => {
    const aliases = sectionKeyAliases[sectionKey];

    for (const alias of aliases) {
      const entry = remoteSections[alias as keyof typeof remoteSections];
      if (entry) {
        return entry;
      }
    }

    return null;
  };

  const aboutSection = resolveSection('about-sector');
  const missionSection = resolveSection('mission');
  const visionSection = resolveSection('vision');
  const sectorPlanSection = resolveSection('sector-plan');

  const aboutTitle = aboutSection?.title?.trim() || homeContent.about.title;
  const aboutText = aboutSection?.contentText?.trim() || homeContent.about.description;
  const aboutImage = aboutSection?.imageUrl || homeContent.about.image;

  const missionTitle = missionSection?.title?.trim() || homeContent.mission.title;
  const missionText = missionSection?.contentText?.trim() || homeContent.mission.description;

  const visionTitle = visionSection?.title?.trim() || homeContent.vision.title;
  const visionText = visionSection?.contentText?.trim() || homeContent.vision.description;

  const sectorPlanTitle = sectorPlanSection?.title?.trim() || homeContent.sectorPlan.title;
  const sectorPlanFileUrl = sectorPlanSection?.fileUrl || homeContent.sectorPlan.pdfUrl;

  return (
    <div className="min-h-screen scroll-smooth bg-[linear-gradient(180deg,#f7fafc_0%,#eef4ff_38%,#ffffff_100%)] py-24 pt-32 dark:bg-[#070d19]">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-8">
        <header className="relative overflow-hidden rounded-[2.25rem] border border-slate-200/80 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_30%),linear-gradient(135deg,#08142d_0%,#10285c_54%,#1a3f82_100%)] px-6 py-12 shadow-[0_35px_90px_-30px_rgba(15,35,70,0.5)] sm:px-10 sm:py-16">
          <div className="absolute inset-y-0 right-0 w-[42%] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.16),_transparent_60%)]" />
          <div className="absolute -left-10 top-8 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute bottom-0 right-20 h-28 w-28 rounded-full bg-sky-300/10 blur-3xl" />
          <div className="relative z-10 max-w-3xl">
            <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-semibold tracking-[0.22em] text-emerald-200 uppercase">
              International Sector
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              International Student Sector
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-200">
              Explore the sector through a clear introduction, focused mission and vision, and a final section for the
              main sector plans.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100">
                Student support
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100">
                Academic direction
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100">
                Sector planning
              </span>
            </div>
          </div>
        </header>

        <section
          id="about-sector"
          className="mt-10 grid scroll-mt-40 grid-cols-1 gap-8 rounded-[2.1rem] border border-slate-200/80 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.35)] transition-transform duration-300 hover:-translate-y-1 lg:grid-cols-[1.02fr_0.98fr] lg:p-10 dark:border-slate-700 dark:bg-[#08132e]"
        >
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-300">
              {homeContent.about.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
              {aboutTitle}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
              {aboutText}
            </p>
            {!aboutSection?.contentText?.trim() && (
              <p className="mt-4 leading-8 text-slate-500 dark:text-slate-400">
                {homeContent.about.body}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                <Compass className="h-4 w-4" />
                Student guidance
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                <BookOpenText className="h-4 w-4" />
                Academic support
              </span>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className={aboutSectorPhotoFrameClassName}>
              <div className={aboutSectorPhotoGlowClassName} aria-hidden />
              <img src={aboutImage} alt="About sector" className={aboutSectorPhotoClassName} />
            </div>
          </div>
        </section>

        <section className="mt-10 space-y-6">
          <article
            id="mission"
            className="scroll-mt-40 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_24px_60px_-40px_rgba(15,23,42,0.35)] transition-transform duration-300 hover:-translate-y-1 dark:border-slate-700 dark:bg-[#08132e]"
          >
            <button
              type="button"
              onClick={() => togglePanel('mission')}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left lg:px-7"
            >
              <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                  <Target className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">
                    Core Direction
                  </p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">{missionTitle}</h3>
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-slate-500 transition-transform duration-300 dark:text-slate-300 ${
                  openPanels.mission ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div className={openPanels.mission ? 'block' : 'hidden'}>
              <div className="border-t border-slate-100 p-6 pt-6 dark:border-slate-700 lg:p-7">
                <div className="rounded-[1.75rem] border border-emerald-100 bg-[linear-gradient(135deg,rgba(236,253,245,0.95),rgba(255,255,255,0.92))] p-6 shadow-[0_18px_45px_-35px_rgba(16,185,129,0.45)] dark:border-emerald-500/20 dark:bg-[linear-gradient(135deg,rgba(6,35,28,0.92),rgba(8,19,46,0.96))]">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.35rem] bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 dark:bg-emerald-500">
                      <Target className="h-8 w-8" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-emerald-600/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200">
                          Mission
                        </span>
                        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                          Clear support for international students
                        </span>
                      </div>
                      <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                        {missionText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article
            id="vision"
            className="scroll-mt-40 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_24px_60px_-40px_rgba(15,23,42,0.35)] transition-transform duration-300 hover:-translate-y-1 dark:border-slate-700 dark:bg-[#08132e]"
          >
            <button
              type="button"
              onClick={() => togglePanel('vision')}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left lg:px-7"
            >
              <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                  <Eye className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700 dark:text-blue-300">
                    Future Outlook
                  </p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">{visionTitle}</h3>
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-slate-500 transition-transform duration-300 dark:text-slate-300 ${
                  openPanels.vision ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div className={openPanels.vision ? 'block' : 'hidden'}>
              <div className="border-t border-slate-100 p-6 pt-6 dark:border-slate-700 lg:p-7">
                <div className="rounded-[1.75rem] border border-blue-100 bg-[linear-gradient(135deg,rgba(239,246,255,0.96),rgba(255,255,255,0.92))] p-6 shadow-[0_18px_45px_-35px_rgba(59,130,246,0.45)] dark:border-blue-500/20 dark:bg-[linear-gradient(135deg,rgba(8,23,47,0.94),rgba(8,19,46,0.96))]">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.35rem] bg-blue-600 text-white shadow-lg shadow-blue-900/20 dark:bg-blue-500">
                      <Eye className="h-8 w-8" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-blue-600/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-blue-700 dark:bg-blue-500/15 dark:text-blue-200">
                          Vision
                        </span>
                        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                          Long-term direction and growth
                        </span>
                      </div>
                      <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                        {visionText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section id="sector-plan" className="mt-10 scroll-mt-40">
          <div className="rounded-[2.15rem] border border-slate-200/80 bg-[linear-gradient(135deg,#0b1633_0%,#142b61_100%)] p-6 text-white shadow-[0_24px_60px_-32px_rgba(15,23,42,0.45)] dark:border-slate-700 lg:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-200">
                  Sector Plan
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  {sectorPlanTitle}
                </h2>
                <p className="mt-3 leading-8 text-slate-200">
                  {homeContent.sectorPlan.summary}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100">
                <FileText className="h-4 w-4" />
                1 plan
              </div>
            </div>

            <div className="mt-8">
              <article className="group rounded-[1.7rem] border border-white/10 bg-white/10 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/14">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-indigo-100">
                    <ArrowDownToLine className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-100">
                    PDF
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-black leading-tight text-white">
                  {sectorPlanTitle}
                </h3>
                <p className="mt-3 max-w-3xl leading-7 text-slate-200">
                  {homeContent.sectorPlan.summary}
                </p>

                <a
                  href={sectorPlanFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-200 transition hover:text-white"
                >
                  {homeContent.sectorPlan.pdfLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
