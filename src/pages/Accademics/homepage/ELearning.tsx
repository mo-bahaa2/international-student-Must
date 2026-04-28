import { useEffect, useState } from 'react';
import { PlaygroundVideo } from '../../../components/PlaygroundVideo';
import { getSmartElearningVideos, type SmartElearningVideo } from '../../../services/cmsApi';
import { LinkResourceCard } from '../../../components/LinkResourceCard';

const FALLBACK_URL = 'https://smartlearning.must.edu.eg/';

export default function ELearning() {
  const [videos, setVideos] = useState<SmartElearningVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const rows = await getSmartElearningVideos();
        if (rows.length === 0) {
          setUseFallback(true);
        } else {
          setVideos(rows);
        }
      } catch {
        setUseFallback(true);
      } finally {
        setIsLoading(false);
      }
    };
    void fetch();
  }, []);

  return (
    <section className="min-h-screen bg-slate-50 py-24 pt-32 dark:bg-[#070d19]">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">E-Learning</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          Access e-learning videos or the university Smart Learning portal.
        </p>

        {isLoading && (
          <div className="mt-8 animate-pulse text-emerald-600 dark:text-emerald-400">Loading...</div>
        )}

        {!isLoading && useFallback && (
          <div className="mt-8 max-w-3xl">
            <LinkResourceCard title="E-Learning Portal" href={FALLBACK_URL} />
          </div>
        )}

        {!isLoading && !useFallback && (
          <div className="mt-8 grid grid-cols-1 gap-6">
            {videos.map((video) => {
              const isYoutube = video.sourceType === 'youtube' && video.youtubeUrl;
              const src = isYoutube ? video.youtubeUrl! : (video.videoUrl || '');
              return (
                <PlaygroundVideo
                  key={video.id}
                  src={src}
                  externalUrl={isYoutube ? video.youtubeUrl! : undefined}
                  title={video.title}
                  description="Click play to open this e-learning video."
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
