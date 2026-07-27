"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageComparisonProps {
  beforeImage: string;
  afterImage: string;
  altBefore?: string;
  altAfter?: string;
}

/** Two-image before/after slider. Drag the handle to compare. */
export const ImageComparison: React.FC<ImageComparisonProps> = ({ beforeImage, afterImage, altBefore = "Before", altAfter = "After" }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      let newPosition = ((clientX - rect.left) / rect.width) * 100;
      newPosition = Math.max(0, Math.min(100, newPosition));
      setSliderPosition(newPosition);
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto select-none rounded-xl overflow-hidden shadow-2xl"
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseLeave={handleMouseUp}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* After image (top layer, clipped) */}
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={afterImage} alt={altAfter} className="h-full w-full object-cover object-left" draggable={false} />
      </div>

      {/* Before image (bottom layer) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={beforeImage} alt={altBefore} className="block h-full w-full object-cover object-left" draggable={false} />

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1.5 bg-white/80 cursor-ew-resize flex items-center justify-center"
        style={{ left: `calc(${sliderPosition}% - 0.375rem)` }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        <div className={`bg-white rounded-full h-12 w-12 flex items-center justify-center shadow-md transition-all duration-200 ease-in-out ${isDragging ? "scale-110 shadow-xl" : ""}`}>
          <ChevronLeft className="h-4 w-4 text-gray-700 -mr-1" />
          <ChevronRight className="h-4 w-4 text-gray-700 -ml-1" />
        </div>
      </div>
    </div>
  );
};

export default ImageComparison;
