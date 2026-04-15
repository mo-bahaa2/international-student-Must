import { useMemo, useState } from 'react';
import type {
  CurriculumKey,
  StudyPlanResourceConfigUnion,
  StudyTrackKey,
  StudyTrackSpecialty,
  UndergradSpecialtyKey,
} from './newStudyPlanResourcesMockData';

interface NewStudyPlanResourcesProps {
  config: StudyPlanResourceConfigUnion;
}

const trackOrder: StudyTrackKey[] = ['msc', 'phd', 'professional'];
const undergradSpecialtyOrder: UndergradSpecialtyKey[] = ['cs', 'is', 'ai'];
const curriculumOrder: CurriculumKey[] = ['old', 'new'];

const studyTrackSpecialtyLabels: Record<StudyTrackSpecialty, string> = {
  CS: 'Computer Science',
  IS: 'Information Systems',
};

function getTrackTitleLabel(trackKey: StudyTrackKey, fallbackLabel: string): string {
  if (trackKey === 'msc') {
    return 'MSc.';
  }

  if (trackKey === 'phd') {
    return 'Ph.D';
  }

  return fallbackLabel;
}

function isSharePointVideoLink(url: string): boolean {
  return url.startsWith('https://mustedueg.sharepoint.com/');
}

function parseSharePointVideoLink(url: string): { href: string; title: string | null } {
  const titleMatch = url.match(/\(([^()]+)\)\s*$/);
  let title = titleMatch?.[1]?.trim() || null;
  const href = url
    .replace(/\([^()]+\)\s*$/, '')
    .replace(/%28.*%29\s*$/i, '');

  if (!title) {
    try {
      const decoded = decodeURIComponent(url);
      title = decoded.match(/\(([^()]+)\)\s*$/)?.[1]?.trim() || null;
    } catch {
      title = null;
    }
  }

  return { href, title };
}

export default function NewStudyPlanResources({ config }: NewStudyPlanResourcesProps) {
  const [activeTrack, setActiveTrack] = useState<StudyTrackKey | null>(null);
  const [activeSpecialty, setActiveSpecialty] = useState<StudyTrackSpecialty | null>(null);
  const [activeUndergradSpecialty, setActiveUndergradSpecialty] = useState<UndergradSpecialtyKey | null>(null);
  const [activeCurriculum, setActiveCurriculum] = useState<CurriculumKey | null>(null);

  const currentTrack = useMemo(() => {
    if (config.mode !== 'degree-tracks' || !activeTrack) {
      return null;
    }

    return config.tracks[activeTrack];
  }, [config, activeTrack]);

  const resources = useMemo(() => {
    if (config.mode === 'undergrad-specialties') {
      if (!activeUndergradSpecialty || !activeCurriculum) {
        return [];
      }

      return config.specialties[activeUndergradSpecialty].resourcesByCurriculum[activeCurriculum];
    }

    if (!currentTrack) {
      return [];
    }

    if (currentTrack.type === 'research' && activeSpecialty) {
      return currentTrack.resourcesBySpecialty[activeSpecialty];
    }

    if (currentTrack.type === 'research') {
      return [];
    }

    return currentTrack.resources;
  }, [config, currentTrack, activeSpecialty, activeUndergradSpecialty, activeCurriculum]);

  const undergradSpecialtyLabel =
    config.mode === 'undergrad-specialties' && activeUndergradSpecialty
      ? config.specialties[activeUndergradSpecialty].label
      : null;

  const curriculumLabel = activeCurriculum
    ? activeCurriculum === 'old'
      ? 'Old Curriculum'
      : 'New Curriculum'
    : null;

  const currentTitle = useMemo(() => {
    if (config.mode === 'undergrad-specialties') {
      if (undergradSpecialtyLabel && curriculumLabel) {
        return `Study Plans (${undergradSpecialtyLabel} ${curriculumLabel})`;
      }

      if (undergradSpecialtyLabel) {
        return `Study Plans (${undergradSpecialtyLabel})`;
      }

      return config.title;
    }

    if (activeTrack) {
      const parentLabel = getTrackTitleLabel(activeTrack, config.tracks[activeTrack].label);

      if (activeSpecialty) {
        return `Study Plans (${parentLabel} ${studyTrackSpecialtyLabels[activeSpecialty]})`;
      }

      return `Study Plans (${parentLabel})`;
    }

    return config.title;
  }, [config, activeTrack, activeSpecialty, undergradSpecialtyLabel, curriculumLabel]);

  const canGoBack =
    config.mode === 'undergrad-specialties'
      ? Boolean(activeUndergradSpecialty || activeCurriculum)
      : Boolean(activeTrack || activeSpecialty);

  const handleGoBack = () => {
    setActiveTrack(null);
    setActiveSpecialty(null);
    setActiveUndergradSpecialty(null);
    setActiveCurriculum(null);
  };

  const tileButtonBase = 'rounded-2xl border px-6 py-6 text-left transition-colors';

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-3xl font-bold text-slate-900 md:text-3xl dark:text-slate-100">{currentTitle}</h3>
        {canGoBack && (
          <button
            type="button"
            onClick={handleGoBack}
            className="shrink-0 rounded-xl border border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Go Back
          </button>
        )}
      </div>

      {config.mode === 'degree-tracks' && (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {!activeTrack &&
            trackOrder.map((trackKey) => {
              const track = config.tracks[trackKey];

              return (
                <button
                  key={trackKey}
                  type="button"
                  onClick={() => {
                    setActiveTrack(trackKey);
                    setActiveSpecialty(null);
                  }}
                  className={`${tileButtonBase} border-slate-300 bg-white text-slate-700 hover:border-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-500`}
                >
                  <p className="text-2xl font-semibold">{track.label}</p>
                </button>
              );
            })}

          {activeTrack && currentTrack?.type === 'research' &&
            (['CS', 'IS'] as StudyTrackSpecialty[]).map((specialty) => {
              const isActive = activeSpecialty === specialty;
              const specialtyLabel = studyTrackSpecialtyLabels[specialty];

              return (
                <button
                  key={specialty}
                  type="button"
                  onClick={() => setActiveSpecialty(specialty)}
                  aria-pressed={isActive}
                  className={`${tileButtonBase} ${
                    isActive
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-500'
                  }`}
                >
                  <p className="text-2xl font-semibold">{specialtyLabel}</p>
                </button>
              );
            })}
        </div>
      )}

      {config.mode === 'undergrad-specialties' && (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {!activeUndergradSpecialty &&
            undergradSpecialtyOrder.map((specialtyKey) => {
              const specialty = config.specialties[specialtyKey];

              return (
                <button
                  key={specialtyKey}
                  type="button"
                  onClick={() => {
                    setActiveUndergradSpecialty(specialtyKey);
                    setActiveCurriculum(null);
                  }}
                  className={`${tileButtonBase} border-slate-300 bg-white text-slate-700 hover:border-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-500`}
                >
                  <p className="text-2xl font-semibold">{specialty.label}</p>
                </button>
              );
            })}

          {activeUndergradSpecialty &&
            curriculumOrder.map((curriculum) => {
              const isActive = activeCurriculum === curriculum;
              const label = curriculum === 'old' ? 'Old Curriculum' : 'New Curriculum';

              return (
                <button
                  key={curriculum}
                  type="button"
                  onClick={() => setActiveCurriculum(curriculum)}
                  aria-pressed={isActive}
                  className={`${tileButtonBase} ${
                    isActive
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-500'
                  }`}
                >
                  <p className="text-2xl font-semibold">{label}</p>
                </button>
              );
            })}
        </div>
      )}

      {resources.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {resources.map((resource) => {
            if (isSharePointVideoLink(resource.url)) {
              const { href, title } = parseSharePointVideoLink(resource.url);

              return (
                <a
                  key={resource.id}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-6 text-sky-700 transition-opacity hover:opacity-80 dark:border-slate-700 dark:bg-slate-800 dark:text-sky-300"
                >
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                    <VideoIcon className="h-8 w-8" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xl font-semibold underline break-words text-slate-900 dark:text-slate-100">
                      {title || 'Video'}
                    </p>
                  </div>
                  <ExternalLinkIcon className="h-5 w-5 shrink-0 text-slate-500 dark:text-slate-300" />
                </a>
              );
            }

            return (
              <a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-6 text-green-700 transition-opacity hover:opacity-80 dark:border-slate-700 dark:bg-slate-800 dark:text-emerald-300"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                  <PdfIcon className="h-8 w-8" />
                </span>
                <div className="min-w-0">
                  <p className="text-xl font-semibold underline break-words text-slate-900 dark:text-slate-100">{resource.title}</p>
                  <p className="text-base text-gray-600 dark:text-slate-400">Download PDF resource</p>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}

function PdfIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.5 3.75H7.5A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5V8.25L14.5 3.75Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 3.75v4.5h4.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.75 14.25h6.5M8.75 16.75h4M8.75 11.75h6.5" />
    </svg>
  );
}

function VideoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.5" y="5" width="12.5" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 12 8.5 10.5v3L11 12Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m16 10 4-2v8l-4-2" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14 19 5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" />
    </svg>
  );
}
