import React from 'react';
import { Star, Play, Plus, Check, Volume2, Film } from 'lucide-react';
import { Anime } from '../types';

interface AnimeCardProps {
  anime: Anime;
  onSelect: (anime: Anime) => void;
  onQuickWatch: (anime: Anime) => void;
  isInWatchlist: boolean;
  onToggleWatchlist: (animeId: string) => void;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({
  anime,
  onSelect,
  onQuickWatch,
  isInWatchlist,
  onToggleWatchlist
}) => {
  return (
    <div
      onClick={() => onSelect(anime)}
      className="group relative bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-violet-500/60 shadow-lg hover:shadow-2xl hover:shadow-violet-950/20 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950">
        <img
          src={anime.poster}
          alt={anime.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Dark Overlay Gradient on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="bg-zinc-900/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-zinc-800 flex items-center gap-1 backdrop-blur-md">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {anime.rating}
          </span>

          <div className="flex items-center gap-1">
            {anime.isHindiDubbed && (
              <span className="bg-violet-600 text-white text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full backdrop-blur-md shadow-sm">
                Hindi
              </span>
            )}
            <span className="bg-zinc-900/90 text-zinc-300 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-zinc-800">
              {anime.format}
            </span>
          </div>
        </div>

        {/* Quick Watch Play Trigger Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickWatch(anime);
            }}
            className="w-12 h-12 rounded-full bg-violet-600 hover:bg-violet-500 text-white flex items-center justify-center shadow-xl shadow-violet-600/40 transform hover:scale-110 transition"
            title="Watch Episode 1"
          >
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </button>
        </div>

        {/* Watchlist Bookmark Icon Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWatchlist(anime.id);
          }}
          className={`absolute bottom-2.5 right-2.5 p-2 rounded-full backdrop-blur-md border transition ${
            isInWatchlist
              ? 'bg-violet-600 text-white border-violet-400'
              : 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:text-white hover:bg-zinc-800'
          }`}
          title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        >
          {isInWatchlist ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </button>

        {/* Total Episodes Pill */}
        <div className="absolute bottom-2.5 left-2.5 text-[9px] font-bold uppercase tracking-wider bg-zinc-900/90 text-zinc-300 border border-zinc-800 px-2 py-0.5 rounded-full backdrop-blur-md">
          {anime.totalEpisodes} Ep{anime.totalEpisodes > 1 ? 's' : ''}
        </div>
      </div>

      {/* Card Info Section */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <h3 className="font-bold text-xs text-zinc-100 group-hover:text-violet-400 transition-colors line-clamp-1">
            {anime.title}
          </h3>
          <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5 font-medium">
            {anime.genres.slice(0, 3).join(' • ')}
          </p>
        </div>

        {/* Languages tags */}
        <div className="flex items-center gap-1 overflow-hidden">
          <Volume2 className="w-3 h-3 text-violet-400 shrink-0" />
          <div className="flex gap-1 overflow-x-auto no-scrollbar text-[10px] text-zinc-400">
            {anime.dubLanguages.slice(0, 3).map((lang) => (
              <span key={lang} className="bg-zinc-800 text-violet-300 px-1.5 py-0.2 rounded font-mono text-[9px] font-semibold">
                {lang}
              </span>
            ))}
            {anime.dubLanguages.length > 3 && (
              <span className="text-[9px] text-zinc-500">+{anime.dubLanguages.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
