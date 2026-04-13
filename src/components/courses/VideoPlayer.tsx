
'use client';

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
}

export function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  // Extract YouTube video ID
  const getYoutubeID = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeID(videoUrl);

  if (!videoId) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center p-4 text-center border-dashed border-2 border-muted-foreground/20">
        <p className="text-muted-foreground flex flex-col gap-2">
          <span className="font-semibold">Invalid Video URL</span>
          <span className="text-xs">Could not play video: {videoUrl}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl bg-black group transition-all duration-300 hover:shadow-primary/20">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
        title={title || "Course Video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className="absolute inset-0 pointer-events-none border-2 border-white/5 rounded-lg group-hover:border-primary/20 transition-colors" />
    </div>
  );
}
