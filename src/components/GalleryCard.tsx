"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GalleryImage } from "@/lib/galleryData";

interface GalleryCardProps {
  image: GalleryImage;
  index: number;
  onClick: (image: GalleryImage) => void;
  isLoading?: boolean;
}

export function GalleryCard({
  image,
  index,
  onClick,
  isLoading = false,
}: GalleryCardProps) {
  const getGridColSpan = (aspectRatio?: string, featured?: boolean) => {
    if (featured) return "md:col-span-2 md:row-span-2";
    if (aspectRatio === "landscape") return "md:col-span-2";
    if (aspectRatio === "portrait") return "md:row-span-2";
    return "";
  };

  const getAspectClass = (aspectRatio?: string) => {
    if (aspectRatio === "landscape") return "aspect-[16/9]";
    if (aspectRatio === "portrait") return "aspect-[9/16]";
    return "aspect-square";
  };

  const easing = [0.22, 1, 0.36, 1] as const;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.05,
        ease: easing,
      },
    },
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.08,
      transition: {
        duration: 0.4,
        ease: easing,
      },
    },
  };

  if (isLoading) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={`${getGridColSpan(
          image.aspectRatio,
          image.featured
        )} rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700 animate-pulse`}
      />
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={containerVariants}
      onClick={() => onClick(image)}
      className={`${getGridColSpan(
        image.aspectRatio,
        image.featured
      )} group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-all duration-300 hover:shadow-2xl`}
      role="button"
      tabIndex={0}
      aria-label={`${image.alt}${image.title ? ` - ${image.title}` : ""}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(image);
        }
      }}
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 dark:from-white/10 dark:via-transparent dark:to-white/10 pointer-events-none z-10" />

      {/* Image container */}
      <motion.div
        className={`relative w-full h-full ${getAspectClass(image.aspectRatio)}`}
        variants={imageVariants}
      >
        <Image
          src={image.url}
          alt={image.alt}
          fill
          priority={image.featured}
          loading={image.featured ? "eager" : "lazy"}
          className="object-cover w-full h-full"
          sizes={
            image.featured
              ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          }
        />
      </motion.div>

      {/* Overlay gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-4 md:p-6"
      >
        {image.title && (
          <h3 className="text-lg md:text-xl font-semibold text-white mb-1 line-clamp-2">
            {image.title}
          </h3>
        )}
        {image.category && (
          <p className="text-sm text-gray-200 font-medium">
            {image.category}
          </p>
        )}
        {image.description && (
          <p className="text-sm text-gray-300 mt-2 line-clamp-2">
            {image.description}
          </p>
        )}
      </motion.div>

      {/* Featured badge */}
      {image.featured && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-3 right-3 md:top-4 md:right-4 z-30 bg-white/20 backdrop-blur-md px-3 py-1 md:px-4 md:py-2 rounded-full border border-white/30"
        >
          <span className="text-xs md:text-sm font-semibold text-white">
            Featured
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
