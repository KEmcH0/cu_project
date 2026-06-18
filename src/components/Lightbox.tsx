"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryImage } from "@/lib/galleryData";

interface LightboxProps {
  image: GalleryImage | null;
  allImages: GalleryImage[];
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function Lightbox({
  image,
  allImages,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const currentIndex = image ? allImages.findIndex((img) => img.id === image.id) : -1;

  const handlePrev = useCallback(() => {
    if (onPrev) onPrev();
  }, [onPrev]);

  const handleNext = useCallback(() => {
    if (onNext) onNext();
  }, [onNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!image) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          e.preventDefault();
          handlePrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          handleNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [image, onClose, handlePrev, handleNext]);

  if (!image) return null;

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onClose}
            className="absolute top-4 md:top-8 right-4 md:right-8 z-50 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-300 group"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-gray-200 transition-colors" />
          </motion.button>

          {/* Image container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                key={image.id}
                src={image.url}
                alt={image.alt}
                fill
                priority
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </motion.div>

          {/* Navigation buttons */}
          {allImages.length > 1 && (
            <>
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentIndex === 0}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-gray-200 transition-colors group-disabled:text-gray-400" />
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentIndex === allImages.length - 1}
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-gray-200 transition-colors group-disabled:text-gray-400" />
              </motion.button>
            </>
          )}

          {/* Image info and counter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 z-50 flex items-end justify-between"
          >
            <div>
              {image.title && (
                <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
                  {image.title}
                </h3>
              )}
              {image.category && (
                <p className="text-sm text-gray-300">
                  {image.category}
                </p>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="bg-white/10 backdrop-blur-md px-3 md:px-4 py-2 rounded-full border border-white/20">
                <p className="text-sm font-medium text-white">
                  {currentIndex + 1} / {allImages.length}
                </p>
              </div>
            )}
          </motion.div>

          {/* Keyboard hints */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 hidden md:flex gap-4 text-xs text-gray-400"
          >
            <span>↑↓ Navigation</span>
            <span>Esc to close</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
