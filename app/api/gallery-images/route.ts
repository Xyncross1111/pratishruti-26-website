import { NextResponse } from 'next/server';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const SUPPORTED_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.avif',
  '.gif',
  '.bmp',
  '.svg',
]);

async function readGalleryFilesRecursively(dirPath: string, rootPath: string): Promise<string[]> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absoluteEntryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      const nestedFiles = await readGalleryFilesRecursively(absoluteEntryPath, rootPath);
      files.push(...nestedFiles);
      continue;
    }

    if (!entry.isFile()) continue;

    const extension = path.extname(entry.name).toLowerCase();
    if (!SUPPORTED_EXTENSIONS.has(extension)) continue;

    const relativePath = path.relative(rootPath, absoluteEntryPath);
    const urlPath = `/${relativePath.split(path.sep).map(encodeURIComponent).join('/')}`;
    files.push(urlPath);
  }

  return files;
}

export async function GET() {
  try {
    const publicRoot = path.join(process.cwd(), 'public');
    const galleryRoot = path.join(publicRoot, 'gallery');
    const images = await readGalleryFilesRecursively(galleryRoot, publicRoot);

    images.sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
    );

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Failed to load gallery images:', error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}
