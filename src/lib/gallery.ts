import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { url } from './site';

export interface Photo { src: string; caption: string; width: number; height: number }

// Drop image files into public/gallery/ (jpg, jpeg, png, webp). Order is by filename.
// Optional captions: public/gallery/captions.json, { "file.jpg": "Caption" }. Without one, the filename is used.
export async function getGallery(): Promise<Photo[]> {
  const dir = 'public/gallery';
  if (!existsSync(dir)) return [];
  const captions: Record<string, string> = existsSync(`${dir}/captions.json`) ? JSON.parse(readFileSync(`${dir}/captions.json`, 'utf-8')) : {};
  const sharp = (await import('sharp')).default;
  const files = readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
  return Promise.all(files.map(async (f) => {
    const m = await sharp(`${dir}/${f}`).metadata();
    const fallback = f.replace(/\.[^.]+$/, '').replace(/^\d+[-_]/, '').replace(/[-_]+/g, ' ');
    return { src: url(`/gallery/${f}`), caption: captions[f] ?? fallback, width: m.width ?? 0, height: m.height ?? 0 };
  }));
}
