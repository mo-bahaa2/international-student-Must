import { useEffect, useState } from 'react';
import { RelatedEventsCarousel } from '../components/EventsNewsCarousels';

export default function EventsPage() {
  const [eventsList, setEventsList] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const baseUrl = import.meta.env.VITE_CMS_URL || import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
      const res = await fetch(`${baseUrl}/api/events?populate=*`);
      const json = await res.json();
      
      if (json.data) {
        setEventsList(json.data.map((item: any) => {
          const attrs = item.attributes || item;
          const media = attrs.imageUrl || attrs.image;
          const imagePath = media?.url || media?.data?.attributes?.url;
          return {
            id: item.id.toString(),
            title: attrs.title,
            description: attrs.description,
            day: attrs.day,
            month: attrs.month,
            timeRange: attrs.timeRange,
            href: attrs.href || '#',
            imageUrl: imagePath ? (imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`) : '/accademics/events/event-1.jpg'
          };
        }));
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="bg-[#070d19] min-h-screen py-24 pt-32">
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-12">
        <div className="mb-16 text-center sm:text-left">
          <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">Upcoming Events</h1>
          <p className="text-xl text-emerald-400 font-medium">Don't miss out on important academic and social events.</p>
        </div>
        <RelatedEventsCarousel events={eventsList} />
      </div>
    </div>
  );
}