import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export type LightboxProps = {
  isOpen: boolean;
  currentIndex: number;
  items: { id: number; title: string; src: string; caption: string; category: string }[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({ isOpen, currentIndex, items, onClose, onPrev, onNext }: LightboxProps) {
  if (!isOpen || !items.length) return null;

  const currentItem = items[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-3 md:p-6 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Fullscreen gallery view"
      >
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-2 text-white hover:bg-black/70 hover:text-secondary"
          aria-label="Close lightbox"
        >
          <X className="h-6 w-6" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          onClick={(event) => {
            event.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/35 p-3 text-white hover:bg-black/60 md:block"
          aria-label="Previous image"
        >
          <ArrowLeft className="h-5 w-5" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/35 p-3 text-white hover:bg-black/60 md:block"
          aria-label="Next image"
        >
          <ArrowRight className="h-5 w-5" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative flex w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-black/70 shadow-2xl md:flex-row"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex-1 bg-black">
            <img
              src={currentItem.src}
              alt={currentItem.title}
              className="max-h-[70vh] w-full object-contain md:max-h-[82vh]"
            />
          </div>
          <div className="w-full max-w-md border-t border-white/10 bg-white/5 p-5 text-white md:border-l md:border-t-0">
            <p className="text-[11px] uppercase tracking-[0.35em] text-secondary">{currentItem.category}</p>
            <h3 className="mt-3 text-2xl font-semibold">{currentItem.title}</h3>
            <p className="mt-3 text-sm text-white/80">{currentItem.caption}</p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/8 p-4 text-sm text-white/85">
              <p>Use ← and → to move between images, or press Esc to close.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
