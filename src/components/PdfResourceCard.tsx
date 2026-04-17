interface PdfResourceCardProps {
  title: string;
  url: string;
  className?: string;
}

export function PdfResourceCard({ title, url, className = '' }: PdfResourceCardProps) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 ${className}`}
    >
      <div className="flex-1 dark:border-slate-700/50">
        <h4 className="text-xl font-semibold text-[#0A2540] dark:text-white">{title}</h4>
      </div>
      <hr />
      <p className="-mb-1 mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">PDF</p>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <a
          href={url}
          download
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25325A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1A2340] sm:w-auto dark:bg-[#34467c] dark:hover:bg-[#2c3d6c]"
        >
          <i className="fa-solid fa-download text-lg"></i>
          Download PDF
        </a>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#25325A] bg-white px-6 py-3 text-sm font-semibold text-[#25325A] transition-colors hover:bg-slate-50 sm:w-auto dark:border-slate-400 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          <i className="fa-solid fa-arrow-up-right-from-square text-lg"></i>
          Open PDF
        </a>
      </div>
    </div>
  );
}
