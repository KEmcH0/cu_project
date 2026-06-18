"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import GalleryCard from "./GalleryCard";
import Lightbox from "./Lightbox";
import { galleryItems } from "./galleryData";

export default function Gallery() {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 500);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredItems = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    return galleryItems.filter((item) => {
      const matchesQuery =
        searchTerm.length === 0 ||
        [item.title, item.caption, item.category, item.location].some((field) => field.toLowerCase().includes(searchTerm));

      return matchesQuery;
    });
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowRight") setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % filteredItems.length));
      if (event.key === "ArrowLeft") setSelectedIndex((prev) => (prev === null ? 0 : (prev - 1 + filteredItems.length) % filteredItems.length));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredItems.length]);

  const openItem = (id: number) => {
    const index = filteredItems.findIndex((item) => item.id === id);
    if (index >= 0) setSelectedIndex(index);
  };

  const currentItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto mb-10 max-w-4xl text-center"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-primary font-semibold">Gallery</p>
          <h2 className="mt-3 text-4xl font-bold text-primary md:text-5xl">BMMSWC Photo Gallery</h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Explore events, alumni moments, committee work, and cultural highlights through a premium, responsive showcase.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mb-8 flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/70 p-4 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:bg-black/30 md:flex-row md:items-center md:justify-between"
        >
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, category, or location"
            aria-label="Search gallery items"
            className="w-full rounded-full border border-primary/10 bg-background/90 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 md:max-w-md"
          />

        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-72 animate-pulse rounded-[24px] border border-white/10 bg-white/60 dark:bg-black/30" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-primary/20 bg-white/60 p-10 text-center text-muted-foreground shadow-sm dark:bg-black/30">
            No gallery items match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 xl:auto-rows-[18rem]">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className={[
                  "min-h-[18rem]",
                  index % 5 === 0 ? "xl:col-span-2 xl:row-span-2" : "",
                  index % 3 === 1 ? "xl:col-span-2" : "",
                ].join(" ")}
              >
                <GalleryCard item={item} onOpen={openItem} />
              </motion.div>
            ))}
          </div>
        )}

        <Lightbox
          isOpen={currentItem !== null}
          currentIndex={selectedIndex ?? 0}
          items={filteredItems.map((item) => ({
            id: item.id,
            title: item.title,
            src: item.src,
            caption: item.caption,
            category: item.category,
          }))}
          onClose={() => setSelectedIndex(null)}
          onPrev={() => setSelectedIndex((prev) => (prev === null ? 0 : (prev - 1 + filteredItems.length) % filteredItems.length))}
          onNext={() => setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % filteredItems.length))}
        />
      </div>
    </section>
  );
}
