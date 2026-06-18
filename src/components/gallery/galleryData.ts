import { readdirSync } from "fs";
import { join } from "path";

export type GalleryItem = {
  id: number;
  src: string;
};

function getGalleryItems(): GalleryItem[] {
  const galleryDir = join(process.cwd(), "public", "gallery");

  try {
    const files = readdirSync(galleryDir);

    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

    const items = files
      .filter((file) => {
        const ext = file.toLowerCase().substring(file.lastIndexOf("."));
        return imageExtensions.includes(ext);
      })
      .sort()
      .map((file, index) => ({
        id: index + 1,
        src: `/gallery/${file}`,
      }));

    return items;
  } catch (error) {
    console.error("Failed to load gallery items:", error);
    return [];
  }
}

export const galleryItems = getGalleryItems();
