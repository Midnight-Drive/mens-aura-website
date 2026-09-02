import { useEffect, useState, useRef, type VideoHTMLAttributes } from 'react';

interface SafeVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export function SafeVideo({ src, className, autoPlay, loop, muted, playsInline, controls, ...props }: SafeVideoProps) {
  const [videoSrc, setVideoSrc] = useState<string>(src);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let isMounted = true;
    let objectUrl: string | null = null;

    // Fetch MP4 and convert to blob URL to bypass IDM download interceptor
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error('Video fetch failed');
        return res.blob();
      })
      .then((blob) => {
        if (isMounted) {
          objectUrl = URL.createObjectURL(blob);
          setVideoSrc(objectUrl);
        }
      })
      .catch(() => {
        // Fallback to original src if blob fetch fails
        if (isMounted) {
          setVideoSrc(src);
        }
      });

    return () => {
      isMounted = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src]);

  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy handling
      });
    }
  }, [videoSrc, autoPlay]);

  return (
    <video
      ref={videoRef}
      src={videoSrc}
      className={className}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      controls={controls}
      preload="auto"
      {...props}
    />
  );
}
