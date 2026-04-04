import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface FrameSequenceProps {
  alt: string;
  className?: string;
  eagerCount?: number;
  frameIndex: number;
  frames: string[];
  imageClassName?: string;
}

const preloadFrame = (src: string) => {
  const image = new Image();
  image.decoding = "async";
  image.src = src;
};

const FrameSequence = ({
  alt,
  className,
  eagerCount = 6,
  frameIndex,
  frames,
  imageClassName,
}: FrameSequenceProps) => {
  const safeIndex = frames.length === 0 ? 0 : Math.max(0, Math.min(frames.length - 1, frameIndex));

  useEffect(() => {
    if (typeof window === "undefined" || frames.length === 0) {
      return;
    }

    frames.slice(0, Math.min(eagerCount, frames.length)).forEach(preloadFrame);

    const nearbyFrames = frames.slice(
      Math.max(0, safeIndex - 2),
      Math.min(frames.length, safeIndex + 3),
    );
    const idleHandle = window.setTimeout(() => {
      nearbyFrames.forEach(preloadFrame);
    }, 0);

    return () => window.clearTimeout(idleHandle);
  }, [eagerCount, frames, safeIndex]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <img
        src={frames[safeIndex]}
        alt={alt}
        className={cn("h-full w-full object-cover", imageClassName)}
        draggable={false}
        loading="eager"
      />
    </div>
  );
};

export default FrameSequence;
