import { motion } from "framer-motion";

export type GalleryCardProps = {
  item: {
    id: number;
    title: string;
    category: string;
    caption: string;
    src: string;
    year: string;
    location: string;
  };
  onOpen: (id: number) => void;
};

export default function GalleryCard({ item, onOpen }: GalleryCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/70 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-black/30"
      aria-label={`Open gallery image ${item.title}`}
    >
      <button
        type="button"
        className="block h-full w-full text-left"
        onClick={() => onOpen(item.id)}
        aria-label={`View ${item.title}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
          <img
            src={item.src}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-white backdrop-blur-md">
            {item.category}
          </span>
        </div>

        <div className="space-y-1 p-4 md:p-5">
          <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.25em] text-primary/80 dark:text-primary/90">
            <span>{item.year}</span>
            <span>{item.location}</span>
          </div>
          <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.caption}</p>
        </div>
      </button>
    </motion.article>
  );
}
