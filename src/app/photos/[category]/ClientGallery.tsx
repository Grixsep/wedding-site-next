"use client";

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";

type Photo = { url: string };

export default function ClientGallery({ category }: { category: string }) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPhotos([]);
    setCursor(0);
    setHasMore(true);
    loadMore(0, category, true);
  }, [category]);

  async function loadMore(start = cursor, cat = category, reset = false) {
    // hit your Next API which will inject the token for you
    const res = await fetch(
      `/api/photos?photoCursor=${start}&category=${encodeURIComponent(cat)}`,
    );
    const { page, next } = await res.json();
    setPhotos((prev) => (reset ? page : [...prev, ...page]));
    if (next !== null) setCursor(next);
    else setHasMore(false);
  }

  return (
    <InfiniteScroll
      dataLength={photos.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<h4 className="text-center mt-4">Loading…</h4>}
      scrollableTarget="scrollMobile"
    >
      <div className="websiteContainerSection mt30 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {photos.map((p, i) => (
          <div key={i} className="relative w-full aspect-square">
            <Image
              src={p.url}
              alt={`Photo ${i + 1}`}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}
