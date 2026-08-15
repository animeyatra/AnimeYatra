import React, { useState, useEffect } from 'react';
import { Play, Plus, Check, Star, Volume2, Sparkles, ChevronRight, Info } from 'lucide-react';
import { Anime } from '../types';

interface HeroBannerProps {
  featuredList: Anime[];
  onSelectAnime: (anime: Anime) => void;
  onWatchEpisode: (anime: Anime, episodeNumber: number) => void;
  watchlist: string[];
  onToggleWatchlist: (animeId: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  featuredList,
  onSelectAnime,
  onWatchEpisode,
  watchlist,
  onToggleWatchlist
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredList.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredList.length]);

  if (!featuredList || featuredList.length === 0) return null;

  const currentAnime = featuredList[currentIndex];
  const isInWatchlist = watchlist.includes(currentAnime.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div className="relative w-full h-[460px] sm:h-[500px] lg:h-[540px] rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden group">
        {/* Background Cover Image with Radial Glow & Vignette */}
        <div className="absolute inset-0">
          <img
            src={currentAnime.bannerImage || currentAnime.coverImage}
            alt={currentAnime.title}
            className="w-full h-full object-cover object-center brightness-75 scale-105 transition-all duration-1000 opacity-60 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-zinc-950/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/80 to-transparent z-10" />
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_#8b5cf6_0%,_transparent_70%)] pointer-events-none" />
        </div>

        {/* Content Overlay - Bento Design */}
        <div className="relative z-20 h-full p-6 sm:p-10 lg:p-12 flex flex-col justify-end">
          <div className="max-w-2xl space-y-3">
            
            {/* Bento Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-violet-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-md shadow-violet-600/30">
                <Sparkles className="w-3.5 h-3.5" />
                TRENDING NOW
              </span>
              <span className="bg-zinc-900 border border-zinc-800 text-amber-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {currentAnime.rating} / 10
              </span>
              {currentAnime.isHindiDubbed && (
                <span className="bg-zinc-900 border border-zinc-800 text-violet-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5" />
                  Hindi Dub
                </span>
              )}
              <span className="bg-zinc-900/90 text-zinc-400 text-xs px-3 py-1 rounded-full border border-zinc-800 font-mono">
                {currentAnime.releaseYear} • {currentAnime.format}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {currentAnime.title}
            </h1>

            {/* Audio Tracks */}
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold">Audio Tracks:</span>
              <div className="flex flex-wrap gap-1">
                {currentAnime.dubLanguages.map((lang) => (
                  <span
                    key={lang}
                    className="bg-zinc-800 text-violet-300 border border-zinc-700 px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Synopsis */}
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl line-clamp-2 leading-relaxed">
              {currentAnime.synopsis}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onWatchEpisode(currentAnime, 1)}
                className="bg-white text-zinc-950 px-6 py-2.5 rounded-full text-xs font-bold hover:bg-violet-600 hover:text-white transition-colors flex items-center gap-2 shadow-lg"
              >
                <Play className="w-4 h-4 fill-current ml-0.5" />
                <span>Watch Episode 1</span>
              </button>

              <button
                onClick={() => onSelectAnime(currentAnime)}
                className="bg-zinc-900 text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-zinc-800 border border-zinc-800 transition-colors flex items-center gap-2"
              >
                <Info className="w-4 h-4 text-violet-400" />
                <span>Details & Cast</span>
              </button>

              <button
                onClick={() => onToggleWatchlist(currentAnime.id)}
                className={`p-2.5 rounded-full border transition-colors ${
                  isInWatchlist
                    ? 'bg-violet-600 text-white border-violet-500'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:text-white hover:bg-zinc-800'
                }`}
                title={isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              >
                {isInWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        {featuredList.length > 1 && (
          <div className="absolute bottom-6 right-8 flex items-center gap-2 z-30">
            {featuredList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-8 bg-violet-500' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
