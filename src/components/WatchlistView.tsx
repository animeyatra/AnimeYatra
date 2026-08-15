import React from 'react';
import { Bookmark, Trash2, Play, Star } from 'lucide-react';
import { Anime } from '../types';
import { AnimeCard } from './AnimeCard';

interface WatchlistViewProps {
  animeList: Anime[];
  watchlist: string[];
  onSelectAnime: (anime: Anime) => void;
  onQuickWatch: (anime: Anime) => void;
  onToggleWatchlist: (animeId: string) => void;
}

export const WatchlistView: React.FC<WatchlistViewProps> = ({
  animeList,
  watchlist,
  onSelectAnime,
  onQuickWatch,
  onToggleWatchlist
}) => {
  const savedAnime = animeList.filter((a) => watchlist.includes(a.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span>My Watchlist ({savedAnime.length})</span>
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Track your saved anime and easily resume episodes anytime.
          </p>
        </div>
      </div>

      {savedAnime.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto">
          <Bookmark className="w-12 h-12 text-violet-500 mx-auto opacity-50" />
          <h3 className="text-base font-bold text-white">Your Watchlist is Empty</h3>
          <p className="text-xs text-zinc-500">
            Click the plus (+) bookmark button on any anime card to save it to your personal list.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {savedAnime.map((anime) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              onSelect={onSelectAnime}
              onQuickWatch={onQuickWatch}
              isInWatchlist={true}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};
