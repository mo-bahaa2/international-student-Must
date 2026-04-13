import { useEffect, useState } from 'react';
import { NewsCarousel } from '../components/EventsNewsCarousels';

export default function NewsPage() {
  const [newsList, setNewsList] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const baseUrl = import.meta.env.VITE_CMS_URL || import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
        const res = await fetch(`${baseUrl}/api/news-items?populate=*`);
        const json = await res.json();
        
        if (json.data) {
          setNewsList(json.data.map((item: any) => {
            const attrs = item.attributes || item;
            const media = attrs.imageUrl || attrs.image;
            const imagePath = media?.url || media?.data?.attributes?.url;
            return {
              id: item.id.toString(),
              title: attrs.title,
              description: attrs.description,
              href: attrs.href || '#',
              imageUrl: imagePath ? (imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`) : '/accademics/news/news-1.jpg'
            };
          }));
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="bg-[#070d19] min-h-screen py-24 pt-32">
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-12">
        <div className="mb-16 text-center sm:text-left">
          <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">University News</h1>
          <p className="text-xl text-emerald-400 font-medium">Stay updated with the latest happenings around campus.</p>
        </div>
        <NewsCarousel news={newsList} />
      </div>
    </div>
  );
}