"use client";

import { useEffect, useRef } from "react";

type HeroVideoProps = {
  className?: string;
  src: string;
  poster?: string;
  playbackRate?: number;
};

export function HeroVideo({ className, src, poster, playbackRate = 1.6 }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const rate = playbackRate;
    video.playbackRate = rate;

    const handleLoaded = () => {
      video.playbackRate = rate;
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    return () => video.removeEventListener("loadedmetadata", handleLoaded);
  }, [playbackRate]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      autoPlay
      muted
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
    />
  );
}
