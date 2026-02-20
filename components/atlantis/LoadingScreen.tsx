'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onFinished?: () => void;
}

export default function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showPlayBtn, setShowPlayBtn] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => setFadeOut(true);
    const handleError = () => setFadeOut(true);

    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    // Try autoplay — show play button if blocked
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setShowPlayBtn(true);
      });
    }

    // Safety timeout: dismiss after 15s no matter what
    const safety = setTimeout(() => {
      if (!video.ended) setFadeOut(true);
    }, 15000);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      clearTimeout(safety);
    };
  }, []);

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setShowPlayBtn(false);
    video.play().catch(() => setFadeOut(true));
  }, []);

  // Remove from DOM after fade-out transition
  useEffect(() => {
    if (fadeOut) {
      const t = setTimeout(() => {
        setHidden(true);
        onFinished?.();
      }, 800);
      return () => clearTimeout(t);
    }
  }, [fadeOut, onFinished]);

  if (hidden) return null;

  return (
    <div
      className={`loading-screen ${fadeOut ? 'loading-screen--fade-out' : ''}`}
      aria-label="Loading"
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        // @ts-ignore — webkit-playsinline is needed for older iOS Safari
        webkit-playsinline="true"
        className="loading-screen__video"
      >
        <source src="/PratishrutiLogoReveal.mp4" type="video/mp4" />
      </video>

      {/* Play button shown when autoplay is blocked */}
      {showPlayBtn && (
        <div className="loading-screen__play-overlay">
          <Image
            src="/logo.png"
            alt="Pratishruti Logo"
            width={120}
            height={120}
            className="loading-screen__play-logo"
            priority
          />
          <button
            onClick={handlePlay}
            className="loading-screen__play-btn"
            aria-label="Play intro video"
          >
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="2" opacity="0.4" />
              <path d="M26 20L46 32L26 44V20Z" fill="currentColor" />
            </svg>
          </button>
          <p className="loading-screen__play-text">Tap to play</p>
        </div>
      )}
    </div>
  );
}
