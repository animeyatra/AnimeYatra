import React, { useState } from 'react';
import { X, Play, Star, Share2, MessageSquare, ExternalLink, ChevronDown, ChevronUp, Users, Info, Bookmark, Check, ArrowRight, Volume2, Sparkles, Copy } from 'lucide-react';
import { Anime, Episode, Language } from '../types';

interface AnimeDetailModalProps {
  anime: Anime;
  onClose: () => void;
  onWatchEpisode: (anime: Anime, episode: Episode) => void;
  isInWatchlist: boolean;
  onToggleWatchlist: (animeId: string) => void;
}

export const AnimeDetailModal: React.FC<AnimeDetailModalProps> = ({
  anime,
  onClose,
  onWatchEpisode,
  isInWatchlist,
  onToggleWatchlist
}) => {
  const [activeSeasonNumber, setActiveSeasonNumber] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showVoiceCast, setShowVoiceCast] = useState(false);

  const activeSeason = anime.seasons.find((s) => s.seasonNumber === activeSeasonNumber) || anime.seasons[0];

  const handleShare = (platform?: string) => {
    const url = window.location.href;
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=Watch ${encodeURIComponent(anime.title)} on AnimeYatra&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const scrollToEpisodes = () => {
    const element = document.getElementById('episodes-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md overflow-y-auto flex justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-auto text-zinc-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-900/90 text-zinc-400 hover:text-white border border-zinc-800 transition hover:bg-violet-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Cover Banner */}
        <div className="relative h-64 sm:h-80 w-full bg-zinc-900">
          <img
            src={anime.coverImage || anime.poster}
            alt={anime.title}
            className="w-full h-full object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />

          {/* Quick Stats Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <img
              src={anime.poster}
              alt={anime.title}
              className="w-24 h-36 sm:w-32 sm:h-48 object-cover rounded-2xl border-2 border-zinc-800 shadow-2xl shrink-0"
            />
            <div className="flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-violet-600 text-white text-xs px-3 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  {anime.format}
                </span>
                <span className="bg-zinc-900 text-amber-300 text-xs px-3 py-0.5 rounded-full font-bold border border-zinc-800 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {anime.rating} ({anime.totalVotes.toLocaleString()} votes)
                </span>
                <span className="bg-zinc-900 text-zinc-300 text-xs px-3 py-0.5 rounded-full border border-zinc-800">
                  {anime.status}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {anime.title}
              </h1>
              {anime.japaneseTitle && (
                <p className="text-xs text-violet-300 font-mono">{anime.japaneseTitle}</p>
              )}
            </div>
          </div>
        </div>

        {/* Main Body */}
        <div className="p-4 sm:p-6 space-y-6">

          {/* Cast Info Bar */}
          {anime.cast && anime.cast.length > 0 && (
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-3 text-xs text-zinc-300">
              <span className="text-violet-400 font-bold mr-1 uppercase text-[10px] tracking-wider">Cast:</span>
              <span>{anime.cast.map((c) => c.name).join(', ')}</span>
            </div>
          )}

          {/* Voice Cast / AniTally Bento Card */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 text-center space-y-3">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              Checkout [Hindi Dub] Dubbing Actors/Cast, Reviews & More
            </h3>
            <div className="flex justify-center">
              <a
                href={anime.externalLinks.aniTally || '#'}
                target="_blank"
                rel="noreferrer"
                className="bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold px-5 py-2 rounded-full border border-violet-500 inline-flex items-center gap-1.5 transition shadow-md"
              >
                <Users className="w-4 h-4 text-violet-200" />
                AniTally Page
              </a>
            </div>
          </div>

          {/* External Databases Badges */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-zinc-400 text-center uppercase tracking-wider text-[10px]">
              Checkout Reviews, Full Details & Upcoming Season Releases
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
              {anime.externalLinks.myAnimeList && (
                <a
                  href={anime.externalLinks.myAnimeList}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-zinc-950 hover:bg-zinc-800 text-zinc-200 px-4 py-1.5 rounded-full border border-zinc-800 hover:border-violet-500 transition flex items-center gap-1.5 font-bold text-xs"
                >
                  MyAnimeList
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </a>
              )}
              {anime.externalLinks.aniList && (
                <a
                  href={anime.externalLinks.aniList}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-zinc-950 hover:bg-zinc-800 text-zinc-200 px-4 py-1.5 rounded-full border border-zinc-800 hover:border-violet-500 transition flex items-center gap-1.5 font-bold text-xs"
                >
                  AniList
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </a>
              )}
              {anime.externalLinks.theMovieDB && (
                <a
                  href={anime.externalLinks.theMovieDB}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-zinc-950 hover:bg-zinc-800 text-zinc-200 px-4 py-1.5 rounded-full border border-zinc-800 hover:border-violet-500 transition flex items-center gap-1.5 font-bold text-xs"
                >
                  TheMovieDB
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </a>
              )}
            </div>
          </div>

          {/* Share Links Bar */}
          <div className="flex items-center justify-center gap-3 py-2 border-y border-zinc-800 text-xs">
            <button
              onClick={() => handleShare()}
              className="text-violet-400 font-bold flex items-center gap-1 hover:text-violet-300"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
            <span className="text-zinc-700">•</span>
            <button
              onClick={() => handleShare('twitter')}
              className="text-zinc-300 hover:text-white font-semibold"
            >
              Twitter
            </button>
            <span className="text-zinc-700">•</span>
            <button
              onClick={() => handleShare('facebook')}
              className="text-zinc-300 hover:text-white font-semibold"
            >
              Facebook
            </button>
            <span className="text-zinc-700">•</span>
            <button
              onClick={() => handleShare()}
              className="text-zinc-400 hover:text-white flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
              {copiedLink ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          {/* Notice Alert Banner */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-3 text-center text-amber-300 text-xs font-bold tracking-wider">
            NO ZIP/BATCH LINKS FOUND - COMMENT
          </div>

          {/* Go to Latest Episode / Comments Shortcut Button */}
          <div className="flex justify-center">
            <button
              onClick={scrollToEpisodes}
              className="bg-white text-zinc-950 text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full shadow-lg hover:bg-violet-600 hover:text-white flex items-center gap-2 transition"
            >
              <ArrowRight className="w-4 h-4 bg-zinc-200 rounded-full p-0.5 text-zinc-900" />
              Go to Latest Episode/Comments
            </button>
          </div>

          {/* Synopsis */}
          <div className="space-y-2 pt-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Info className="w-4 h-4 text-violet-400" />
              Synopsis
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
              {anime.synopsis}
            </p>
          </div>

          {/* Voice Cast Profiles Section */}
          {anime.cast && anime.cast.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-violet-400" />
                  Voice Actors & Character Cast
                </h3>
                <button
                  onClick={() => setShowVoiceCast(!showVoiceCast)}
                  className="text-xs text-violet-400 hover:text-violet-300 font-bold"
                >
                  {showVoiceCast ? 'Hide Cast' : 'View Full Cast Grid'}
                </button>
              </div>

              {showVoiceCast && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 animate-fadeIn">
                  {anime.cast.map((actor) => (
                    <div
                      key={actor.id}
                      className="bg-zinc-950 p-3 rounded-2xl border border-zinc-800 flex items-center gap-2.5"
                    >
                      <img
                        src={actor.photo}
                        alt={actor.name}
                        className="w-10 h-10 object-cover rounded-full border border-violet-500/40"
                      />
                      <div className="min-w-0 flex-1 text-xs">
                        <p className="font-bold text-zinc-100 truncate">{actor.name}</p>
                        <p className="text-[11px] text-violet-300 truncate">as {actor.characterName}</p>
                        <span className="text-[9px] bg-zinc-800 text-zinc-400 px-1.5 py-0.2 rounded font-mono">
                          {actor.language}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Seasons & Episodes Section */}
          <div id="episodes-section" className="space-y-4 pt-4 border-t border-zinc-800">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Play className="w-5 h-5 text-violet-400 fill-violet-400" />
                Seasons & Episodes
              </h2>

              {/* Season Selector */}
              {anime.seasons.length > 1 && (
                <div className="flex items-center gap-1.5">
                  {anime.seasons.map((s) => (
                    <button
                      key={s.seasonNumber}
                      onClick={() => setActiveSeasonNumber(s.seasonNumber)}
                      className={`text-xs px-3.5 py-1 rounded-full font-bold transition ${
                        activeSeasonNumber === s.seasonNumber
                          ? 'bg-violet-600 text-white'
                          : 'bg-zinc-950 text-zinc-400 hover:bg-zinc-800'
                      }`}
                    >
                      Season {s.seasonNumber}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Season Header Bento Box */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-3.5 flex items-center justify-between text-xs font-bold text-zinc-200">
              <div className="flex items-center gap-2">
                <span className="text-base">📺</span>
                <span>{activeSeason.title}</span>
                <span className="text-xs text-violet-400 font-normal">({activeSeason.episodesCount} Episodes)</span>
              </div>
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            </div>

            {/* Episodes List */}
            <div className="space-y-2.5">
              {activeSeason.episodes.map((ep) => (
                <div
                  key={ep.id}
                  className="bg-zinc-950 border border-zinc-800 hover:border-violet-500/60 rounded-2xl p-3 flex items-center justify-between gap-3 transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-zinc-900 shrink-0">
                      <img src={ep.thumbnail} alt={ep.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                      <Play className="w-5 h-5 text-white absolute inset-0 m-auto opacity-80 group-hover:scale-110 transition-transform" />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-100 group-hover:text-violet-400 transition-colors truncate">
                        {ep.title}
                      </h4>
                      <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                        {ep.duration} • Air Date: {ep.airDate}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {ep.availableLanguages.map((l) => (
                          <span
                            key={l}
                            className="text-[9px] bg-zinc-800 text-violet-300 border border-zinc-700 px-1.5 py-0.2 rounded font-mono font-bold"
                          >
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onWatchEpisode(anime, ep)}
                    className="bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs px-4 py-2 rounded-full shadow-md transition flex items-center gap-1 shrink-0"
                  >
                    <span>Watch</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
