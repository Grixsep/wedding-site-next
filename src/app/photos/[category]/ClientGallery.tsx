"use client";

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";

type Photo = { url: string };

export default function ClientGallery({ category }: { category: string }) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    setPhotos([]);
    setCursor(0);
    setHasMore(true);
    loadMore(0, category, true);
  }, [category]);

  async function loadMore(start = cursor, cat = category, reset = false) {
    const res = await fetch(
      `/api/photos?photoCursor=${start}&category=${encodeURIComponent(cat)}`,
    );
    const { page, next } = await res.json();
    setPhotos((prev) => (reset ? page : [...prev, ...page]));
    if (next !== null) setCursor(next);
    else setHasMore(false);
  }

  return (
    <>
      {photos.length === 0 && !hasMore ? (
        <div className="text-center text-gray-500 mt-6">
          No Photos, for now ...
        </div>
      ) : (
        <InfiniteScroll
          dataLength={photos.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<h4 className="text-center mt-4">Loading...</h4>}
          scrollableTarget="scrollMobile"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2">
            {photos.map((p, i) => (
              <div
                key={i}
                className="overflow-hidden rounded cursor-pointer aspect-square"
                onClick={() => setSelectedIndex(i)}
              >
                <Image
                  src={p.url}
                  alt={`Photo ${i + 1}`}
                  width={800}
                  height={800}
                  className="rounded object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}

      {/* Fullscreen Lightbox Viewer */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black bg-opacity-90">
          {/* Padding for top nav bar */}
          <div className="h-16 sm:h-20 md:h-24 lg:h-28" />

          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-16 sm:top-16 md:top-28 lg:top-28 right-4 text-white text-3xl sm:text-4xl p-2 z-50"
            aria-label="Close fullscreen viewer"
          >
            ×
          </button>

          <div className="flex-1 flex items-center justify-center relative px-4">
            {selectedIndex > 0 && (
              <button
                onClick={() => setSelectedIndex(selectedIndex - 1)}
                className="absolute left-2 sm:left-6 top-1/2 transform -translate-y-1/2 text-white text-4xl sm:text-6xl p-3 sm:p-5 rounded hover:bg-white/10"
                aria-label="Previous image"
              >
                ‹
              </button>
            )}

            {selectedIndex < photos.length - 1 && (
              <button
                onClick={() => setSelectedIndex(selectedIndex + 1)}
                className="absolute right-2 sm:right-6 top-1/2 transform -translate-y-1/2 text-white text-4xl sm:text-6xl p-3 sm:p-5 rounded hover:bg-white/10"
                aria-label="Next image"
              >
                ›
              </button>
            )}

            <Image
              src={photos[selectedIndex].url}
              alt={`Full image ${selectedIndex + 1}`}
              width={1200}
              height={900}
              className="rounded max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
