import { SpiralGallery } from '@/components/atlantis/SpiralGallery';

export default function GalleryPage() {
    return (
        <main className="relative min-h-screen bg-[#4f6b52]">
            {/* Small title block like reference */}
            <div className="fixed top-16 left-20 z-50 text-white/90 leading-tight tracking-wide">
                <p className="text-sm font-semibold">Poseidon</p>
                <p className="text-sm font-semibold">Gallery</p>
            </div>

            {/* Minimal timeline marker at top center */}
            <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 text-white/70">
                <span className="text-xs font-semibold tracking-[0.2em]">JAN</span>
                <div className="w-56 h-px bg-white/25" />
                <span className="text-xs font-semibold tracking-[0.2em]">DEC</span>
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

            {/* Bottom-left play marker */}
            <div className="fixed bottom-16 left-10 z-50 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-[10px] text-white/50">
                ▶
            </div>

            {/* Bottom-right social markers */}
            <div className="fixed bottom-12 right-12 z-50 flex items-center gap-6 text-xs tracking-[0.2em] text-white/45">
                <span>FB</span>
                <span>TW</span>
                <span>YT</span>
            </div>

            {/* 3D Spiral Gallery */}
            <SpiralGallery />
        </main>
    );
}
