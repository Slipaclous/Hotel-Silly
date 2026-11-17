'use client';

// Loader global next/image (déclaré dans next.config.ts) — logique dans image-url.ts
import { imageUrl } from './image-url';

export default function imageLoader(params: { src: string; width: number; quality?: number }) {
    return imageUrl(params);
}
