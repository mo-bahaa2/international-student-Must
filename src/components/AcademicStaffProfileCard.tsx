interface ExperienceItem {
  title: string;
  period: string;
  description: string;
}

interface AcademicStaffProfileCardProps {
  name: string;
  role: string;
  specialty: string;
  email: string;
  imageUrl: string;
  imageAlt?: string;
  cvLabel: string;
  cvUrl: string;
  bio: string;
  qualifications: string[];
  experience: ExperienceItem[];
  researchDirections: string[];
}

export default function AcademicStaffProfileCard({
  name,
  role,
  specialty,
  email,
  imageUrl,
  imageAlt,
  cvLabel,
  cvUrl,
  bio,
  qualifications,
  experience,
  researchDirections,
}: AcademicStaffProfileCardProps) {
  return (
    <article className="w-full rounded-xl border border-navy-700 bg-navy-900/95 p-6 md:p-8 shadow-[0_10px_30px_rgba(4,12,33,0.45)]">
      <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <img
            src={imageUrl}
            alt={imageAlt || name}
            className="h-24 w-24 rounded-lg object-cover border border-blue-400/30"
          />

          <div className="min-w-0">
            <h2 className="text-3xl font-bold text-emerald-400 break-words">{name}</h2>
            <p className="mt-1 text-xl text-blue-200">{role}</p>
            <span className="mt-3 inline-flex rounded-full bg-emerald-500/20 px-4 py-1 text-sm font-semibold text-emerald-300 border border-emerald-500/40">
              {specialty}
            </span>
            <p className="mt-3 text-lg text-slate-300 break-all">{email}</p>
          </div>
        </div>

        <a
          href={cvUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-fit items-center gap-2 rounded-lg border border-blue-500/40 bg-blue-900/20 px-4 py-2 text-blue-200 hover:bg-blue-800/40 transition-colors"
        >
          <PdfIcon className="h-5 w-5" />
          <span className="font-medium">{cvLabel}</span>
        </a>
      </header>

      <div className="mt-8 space-y-5">
        <SectionCard title="Bio">
          <p className="text-lg leading-8 text-slate-300">{bio}</p>
        </SectionCard>

        <SectionCard title="Qualifications">
          <ul className="list-disc pl-6 text-lg leading-8 text-slate-300">
            {qualifications.map((qualification, idx) => (
              <li key={idx}>{qualification}</li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Experience">
          <div className="space-y-5">
            {experience.map((item, idx) => (
              <div key={idx} className="border-l-2 border-blue-600/50 pl-4">
                <p className="text-xl font-semibold text-slate-100">{item.title}</p>
                <p className="text-base text-slate-400">{item.period}</p>
                <p className="mt-2 text-lg leading-8 text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Research Direction">
          <div className="flex flex-wrap gap-2">
            {researchDirections.map((direction, idx) => (
              <span
                key={idx}
                className="rounded-full border border-blue-500/30 bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-200"
              >
                {direction}
              </span>
            ))}
          </div>
        </SectionCard>
      </div>
    </article>
  );
}

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

function SectionCard({ title, children }: SectionCardProps) {
  return (
    <section className="rounded-xl border border-navy-700 bg-navy-900/70 p-5 md:p-6">
      <h3 className="text-2xl font-bold uppercase tracking-wide text-emerald-400">{title}</h3>
      <div className="my-3 h-px w-full bg-navy-700" />
      {children}
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

export const academicStaffProfileCardMock: AcademicStaffProfileCardProps = {
  name: 'Dr. Eman Karam',
  role: 'Professor',
  specialty: 'Computer Science',
  email: 'e.karam@must.edu.eg',
  imageUrl: '/accademics/staff/eman-karam.jpg',
  cvLabel: 'Download CV (PDF)',
  cvUrl: '/accademics/cv/eman-karam-cv.pdf',
  bio: 'Featured academic staff in postgraduate studies; research supervision and graduate programme leadership in computer science.',
  qualifications: ['PhD, Computer Science · MUST · 2005', 'MSc, Computer Science · MUST · 2000'],
  experience: [
    {
      title: 'Faculty & postgraduate supervisor - MUST, Computer Science',
      period: '2005-present',
      description: 'MSc and PhD supervision, thesis examination committees, and departmental research coordination.',
    },
  ],
  researchDirections: [
    'Postgraduate supervision',
    'Computer science research',
    'Thesis examination',
    'Curriculum development',
  ],
};
