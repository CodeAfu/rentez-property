"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PropertyImageCarouselProps {
  images: string[];
}

export function PropertyImageCarousel({ images }: PropertyImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    setCount(emblaApi.scrollSnapList().length);
    setCurrentIndex(emblaApi.selectedScrollSnap());

    emblaApi.on("select", () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[400px] bg-muted flex items-center justify-center rounded-xl">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <div className="relative group rounded-xl overflow-hidden mb-8">
      {/* Carousel Viewport */}
      <div className="overflow-hidden bg-black/5" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative flex-[0_0_100%] min-w-0 h-[400px] md:h-[500px]"
            >
              <img
                src={src}
                alt={`Property image ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons (Only show if multiple images) */}
      {count > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full h-10 w-10 shadow-lg"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full h-10 w-10 shadow-lg"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Image Counter Badge */}
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
            {currentIndex + 1} / {count}
          </div>

          {/* Optional: Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => emblaApi?.scrollTo(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all shadow-sm",
                  idx === currentIndex
                    ? "bg-white w-4"
                    : "bg-white/50 hover:bg-white/80",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
