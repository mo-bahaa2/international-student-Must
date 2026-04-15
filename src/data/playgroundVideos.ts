export type PlaygroundVideoItem = {
  /** File name only, inside `public/videos/` */
  fileName: string;
  title: string;
  caption?: string;
};

function videoSrc(fileName: string) {
  return `/videos/${encodeURIComponent(fileName)}`;
}

export const playgroundVideoItems: PlaygroundVideoItem[] = [
  {
    fileName: 'How to withdraw from a course.mp4',
    title: 'How to withdraw from a course',
  },
  {
    fileName: 'Banner Registration Errors & Problems.mp4',
    title: 'Banner registration — errors and problems',
  },
  {
    fileName: 'Banner Registration Using CRN.mp4',
    title: 'Banner registration using CRN',
  },
];

export { videoSrc };
