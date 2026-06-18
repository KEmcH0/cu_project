import fs from "fs";
import path from "path";

import { Gallery } from "@/components/Gallery";
import type { GalleryImage } from "@/lib/galleryData";

export const metadata = {
  title: "Gallery | BMMSWC",
  description: "Explore our collection of community events and activities",
};

export default function GalleryPage() {
  const galleryDir = path.join(process.cwd(), "public", "gallery");

  const galleryImages: GalleryImage[] = fs.existsSync(galleryDir)
    ? fs
        .readdirSync(galleryDir)
        .filter((fileName) => /\.(jpe?g|png|webp|gif|avif)$/i.test(fileName))
        .map((fileName, index) => ({
          id: index + 1,
          url: `/gallery/${fileName}`,
          alt: `BMMSWC gallery image ${index + 1}`,
          title: `Gallery Image ${index + 1}`,
          description: "Community photo from BMMSWC",
          category: "Events",
          aspectRatio: index % 3 === 0 ? "landscape" : index % 2 === 0 ? "portrait" : "square",
          featured: index === 0,
        }))
    : [];

  return <Gallery images={galleryImages} />;
}
