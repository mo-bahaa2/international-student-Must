import { useRef } from 'react';

interface EventCardItem {
  id: string;
  imageUrl: string;
  imageAlt?: string;
  day: string;
  month: string;
  timeRange: string;
  title: string;
  description: string;
  href?: string;
}

interface NewsCardItem {
  id: string;
  imageUrl: string;
  imageAlt?: string;
  title: string;
  description: string;
  href?: string;
}

interface RelatedEventsCarouselProps {
  events: EventCardItem[];
  onSeeAllEvents?: () => void;
}

interface NewsCarouselProps {
  news: NewsCardItem[];
}

interface EventsNewsSectionProps {
  events: EventCardItem[];
  news: NewsCardItem[];
  onSeeAllEvents?: () => void;
}

interface CarouselHeaderProps {
  title: string;
  onPrev: () => void;
  onNext: () => void;
}

const scrollStep = 360;

function CarouselHeader({ title, onPrev, onNext }: CarouselHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <h2 className="text-center text-3xl font-bold text-emerald-400 sm:text-left">{title}</h2>

      <div className="hidden items-center gap-2 sm:flex">
        <button
          type="button"
          aria-label={`Previous ${title}`}
          onClick={onPrev}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy-600 bg-navy-900 text-slate-200 transition-colors hover:border-emerald-500 hover:text-emerald-300"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label={`Next ${title}`}
          onClick={onNext}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy-600 bg-navy-900 text-slate-200 transition-colors hover:border-emerald-500 hover:text-emerald-300"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export function RelatedEventsCarousel({ events, onSeeAllEvents }: RelatedEventsCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (amount: number) => {
    if (!scrollContainerRef.current) {
      return;
    }

    scrollContainerRef.current.scrollBy({
      left: amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full">
      <CarouselHeader
        title="Related Events"
        onPrev={() => scrollByAmount(-scrollStep)}
        onNext={() => scrollByAmount(scrollStep)}
      />

      <div
        ref={scrollContainerRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {events.map((item) => (
          <article
            key={item.id}
            className="group min-w-[280px] max-w-[280px] snap-start"
          >
            <a href={item.href || '#'} className="block">
              <div className="relative overflow-hidden rounded-sm bg-navy-800">
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt || item.title}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute bottom-0 left-3 translate-y-1/2 rounded-md bg-[#162e67] px-4 py-2 text-center shadow-lg">
                  <p className="text-4xl font-bold leading-none text-slate-100">{item.day}</p>
                  <p className="mt-1 text-sm text-slate-300">{item.month}</p>
                </div>
              </div>

              <div className="pt-8">
                <p className="mb-3 flex items-center gap-2 text-sm text-slate-400">
                  <ClockIcon className="h-4 w-4 text-emerald-500" />
                  {item.timeRange}
                </p>
                <h3 className="line-clamp-2 text-xl font-bold text-slate-100">{item.title}</h3>
                <p className="mt-2 line-clamp-2 text-base text-slate-400">{item.description}</p>
              </div>
            </a>
          </article>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={onSeeAllEvents}
          className="rounded-full bg-emerald-600 px-12 py-3 text-lg font-semibold text-white transition-colors hover:bg-emerald-500"
        >
          See All Events
        </button>
      </div>
    </section>
  );
}

export function NewsCarousel({ news }: NewsCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (amount: number) => {
    if (!scrollContainerRef.current) {
      return;
    }

    scrollContainerRef.current.scrollBy({
      left: amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full">
      <CarouselHeader
        title="News"
        onPrev={() => scrollByAmount(-scrollStep)}
        onNext={() => scrollByAmount(scrollStep)}
      />

      <div
        ref={scrollContainerRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {news.map((item) => (
          <article
            key={item.id}
            className="group min-w-[320px] max-w-[320px] snap-start"
          >
            <a href={item.href || '#'} className="block">
              <div className="overflow-hidden rounded-sm bg-navy-800">
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt || item.title}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="pt-5">
                <h3 className="line-clamp-3 text-2xl font-bold leading-8 text-slate-100">{item.title}</h3>
                <p className="mt-2 line-clamp-2 text-base text-slate-400">{item.description}</p>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function EventsNewsSection({ events, news, onSeeAllEvents }: EventsNewsSectionProps) {
  return (
    <section className="w-full bg-[#0a111f] py-16">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-10">
        <RelatedEventsCarousel events={events} onSeeAllEvents={onSeeAllEvents} />
        <div className="mt-14">
          <NewsCarousel news={news} />
        </div>
      </div>
    </section>
  );
}

function ClockIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5v5l3.5 2" />
    </svg>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 6 6 6-6 6" />
    </svg>
  );
}

