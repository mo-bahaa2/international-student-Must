import { useEffect, useState } from 'react';
import { PlaygroundVideo } from '../../../components/PlaygroundVideo';
import { getRegistrationVideos, getStudentResourcesByCategory, type RegistrationVideo, type StudentResourceItem } from '../../../services/cmsApi';

type VideoEntry = {
  id: string;
  title: string;
  src: string;
  isExternal: boolean;
  externalUrl?: string;
};

export default function Registeration() {
  const [videos, setVideos] = useState<VideoEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const dedicated = await getRegistrationVideos();

        if (dedicated.length > 0) {
          setVideos(dedicated.map((v: RegistrationVideo) => {
            const yt = v.youtubeUrl?.trim();
            const isYoutube = v.sourceType === 'youtube' && Boolean(yt);
            const src = isYoutube && yt ? yt : (v.videoUrl ?? '');
            return {
              id: v.id,
              title: v.title,
              src,
              isExternal: isYoutube,
              externalUrl: isYoutube && yt ? yt : undefined,
            };
          }));
          setStatus('');
        } else {
          const fallback = await getStudentResourcesByCategory('Registration Guide');
          const valid = fallback.filter((r: StudentResourceItem) => r.resourceUrl && r.resourceUrl !== '#');
          if (valid.length > 0) {
            setVideos(valid.map((r: StudentResourceItem) => ({
              id: r.id,
              title: r.title,
              src: r.resourceUrl,
              isExternal: true,
              externalUrl: r.resourceUrl,
            })));
          } else {
            setStatus('No registration guides available yet.');
          }
        }
      } catch (error) {
        console.error('Error fetching registration guides:', error);
        setStatus('Network error: Could not load registration guides.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-white py-24 pt-32 dark:bg-[#070d19]">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8">
        <h1 className="mb-8 text-4xl font-bold text-slate-900 dark:text-slate-100">Registration Guides</h1>

        {isLoading && (
          <div className="animate-pulse text-emerald-600 dark:text-emerald-400">Loading registration guides...</div>
        )}

        {!isLoading && status && (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-emerald-700 dark:border-slate-700 dark:text-emerald-400">
            {status}
          </div>
        )}

        {!isLoading && !status && (
          <div className="grid grid-cols-1 gap-6">
            {videos.map((video) => (
              <PlaygroundVideo
                key={video.id}
                src={video.src}
                externalUrl={video.externalUrl}
                title={video.title}
                description={
                  video.externalUrl
                    ? 'Click anywhere on the card to open this guide in a new tab.'
                    : 'Use the player below to watch this registration guide.'
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
