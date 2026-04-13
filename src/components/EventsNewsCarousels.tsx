import React from 'react';

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

export function RelatedEventsCarousel({ events, onSeeAllEvents }: RelatedEventsCarouselProps) {
  return (
    <section className="w-full">
      {/* CHANGED: xl:grid-cols-3 and increased gap so cards are wider */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 pb-12">
        {events.map((item) => (
          <article
            key={item.id}
            className="group w-full flex flex-col bg-navy-800/40 rounded-2xl border border-navy-700 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-emerald-500/10"
          >
            <a href={item.href || '#'} className="block flex-1 flex flex-col">
              {/* CHANGED: Image height from 280px to 360px */}
              <div className="relative overflow-hidden bg-navy-800 h-[360px]">
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt || item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute bottom-5 left-5 rounded-xl bg-navy-900/90 backdrop-blur-sm border border-navy-600 px-6 py-4 text-center shadow-2xl">
                  <p className="text-5xl font-black leading-none text-white">{item.day}</p>
                  <p className="mt-1 text-base font-bold uppercase tracking-wider text-emerald-400">{item.month}</p>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <p className="mb-4 flex items-center gap-2 text-sm font-medium text-emerald-400">
                  <ClockIcon className="h-4 w-4" />
                  {item.timeRange}
                </p>
                <h3 className="line-clamp-2 text-3xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors">{item.title}</h3>
                <p className="line-clamp-3 text-xl text-slate-400 leading-relaxed flex-1">{item.description}</p>
              </div>
            </a>
          </article>
        ))}
      </div>

      {onSeeAllEvents && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onSeeAllEvents}
            className="rounded-full bg-emerald-600 px-12 py-4 text-lg font-bold text-white transition-all hover:bg-emerald-500"
          >
            See All Events
          </button>
        </div>
      )}
    </section>
  );
}

export function NewsCarousel({ news }: NewsCarouselProps) {
  return (
    <section className="w-full">
      {/* CHANGED: xl:grid-cols-3 and increased gap so cards are wider */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 pb-12">
        {news.map((item) => (
          <article
            key={item.id}
            className="group w-full flex flex-col bg-navy-800/40 rounded-2xl border border-navy-700 hover:border-blue-500/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-blue-500/10"
          >
            <a href={item.href || '#'} className="block flex-1 flex flex-col">
              {/* CHANGED: Image height from 280px to 360px */}
              <div className="overflow-hidden bg-navy-800 h-[360px]">
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt || item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-5">
                   <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold uppercase tracking-wider border border-blue-500/30">News</span>
                </div>
                <h3 className="line-clamp-3 text-3xl font-bold leading-tight text-white mb-4 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                <p className="line-clamp-3 text-xl text-slate-400 leading-relaxed flex-1">{item.description}</p>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function EventsNewsSection({ events, news, onSeeAllEvents }: { events: EventCardItem[], news: NewsCardItem[], onSeeAllEvents?: () => void }) {
  return (
    <section className="w-full bg-[#0a111f] py-16">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-8 lg:px-10">
        <h2 className="text-4xl font-bold text-emerald-400 mb-10">Related Events</h2>
        <RelatedEventsCarousel events={events} onSeeAllEvents={onSeeAllEvents} />
        
        <div className="mt-24">
          <h2 className="text-4xl font-bold text-blue-400 mb-10">Latest News</h2>
          <NewsCarousel news={news} />
        </div>
      </div>
    </section>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5v5l3.5 2" />
    </svg>
  );
}