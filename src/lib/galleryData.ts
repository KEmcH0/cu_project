import { readdirSync } from "fs";
import { join } from "path";

export type GalleryImage = {
  id: number;
  url: string;
  alt: string;
  title?: string;
  description?: string;
  category?: string;
  aspectRatio?: "square" | "landscape" | "portrait";
  featured?: boolean;
};

const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

function getGalleryImages(): GalleryImage[] {
  const galleryDir = join(process.cwd(), "public", "gallery");

  try {
    const files = readdirSync(galleryDir);

    const images = files
      .filter((file) => {
        const ext = file.toLowerCase().substring(file.lastIndexOf("."));
        return imageExtensions.includes(ext);
      })
      .sort()
      .map((file, index) => ({
        id: index + 1,
        url: `/gallery/${file}`,
        alt: file.replace(/[_-]/g, " ").split(".")[0],
        title: file.replace(/[_-]/g, " ").split(".")[0],
        aspectRatio: ["square", "landscape", "portrait"][index % 3] as "square" | "landscape" | "portrait",
      }));

    return images;
  } catch (error) {
    console.error("Failed to load gallery images:", error);
    return [];
  }
}

export const galleryImages = getGalleryImages();
