import { SpiralGallery } from '@/components/atlantis/SpiralGallery';
import Link from 'next/link';

export default function GalleryPage() {
    return (
        <main className="relative min-h-screen bg-[#4f6b52]">
            {/* Navigation back to home */}
            <div className="fixed top-8 left-8 z-50">
                <Link
                    href="/"
                    className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-black/10 text-white/80 hover:text-white hover:border-white/40 transition-all duration-300"
                >
                    <svg
                        className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    <span className="font-medium">Back to Home</span>
                </Link>
            </div>

            {/* Scroll indicator */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-white/50 text-sm">Scroll Down</span>
                    <svg
                        className="w-6 h-6 text-white/50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </div>

            {/* 3D Spiral Gallery */}
            <SpiralGallery />
        </main>
    );
}
