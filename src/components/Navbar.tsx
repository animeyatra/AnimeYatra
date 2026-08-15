import React, { useState } from 'react';
import { Search, Bookmark, Calendar, Film, Sparkles, Menu, X, PlayCircle, Globe, ChevronDown, ShieldCheck, Clock, Mail, MessageSquare } from 'lucide-react';
import { Anime, Language } from '../types';
import { LANGUAGE_OPTIONS } from '../data/animeData';
import logoImg from '../assets/images/animeyatra_logo_1786562300553.jpg';

interface NavbarProps {
  activeTab: 'home' | 'hindi-dubbed' | 'movies' | 'schedule' | 'watchlist' | 'coming-soon' | 'contact' | 'admin';
  setActiveTab: (tab: 'home' | 'hindi-dubbed' | 'movies' | 'schedule' | 'watchlist' | 'coming-soon' | 'contact' | 'admin') => void;
  selectedLanguage: Language | 'All';
  setSelectedLanguage: (lang: Language | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  animeList: Anime[];
  onSelectAnime: (anime: Anime) => void;
  watchlistCount: number;
  onOpenAdBlockModal: () => void;
  siteNotice?: string;
}


export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedLanguage,
  setSelectedLanguage,
  searchQuery,
  setSearchQuery,
  animeList,
  onSelectAnime,
  watchlistCount,
  onOpenAdBlockModal,
  siteNotice
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchResults = searchQuery.trim()
    ? animeList.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.englishTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800 text-zinc-100">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-violet-950 via-zinc-900 to-violet-950 px-4 py-1.5 text-xs text-zinc-300 text-center font-medium flex items-center justify-center gap-2 border-b border-zinc-800">
        <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
        <span>{siteNotice || 'Welcome to AnimeYatra — 100% HD Hindi, Hinglish, Tamil & Telugu Dubbed Anime!'}</span>
        <button
          onClick={onOpenAdBlockModal}
          className="ml-2 bg-zinc-800 hover:bg-violet-600 text-white text-[11px] px-2.5 py-0.5 rounded-full font-semibold transition-colors border border-zinc-700"
        >
          Skip AD Guide
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand - AnimeYatra.app */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <img 
              src={logoImg} 
              alt="AnimeYatra.app Logo" 
              className="w-10 h-10 object-cover rounded-xl border border-amber-500/30 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform bg-black"
            />
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                Anime<span className="text-amber-400">Yatra</span>
                <span className="bg-amber-400 text-black text-[9px] font-black px-1.5 py-0.5 rounded-md tracking-wide lowercase shadow-sm">.app</span>
              </span>
              <span className="block text-[9px] text-zinc-400 font-mono tracking-widest uppercase -mt-0.5">
                HD Anime Network
              </span>
            </div>
          </div>

          {/* Desktop Search Bar with Bento Hotkey Badge */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search anime, movies, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-10 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition"
              />
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-2.5" />
              <div className="absolute right-3 top-2 bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-[10px] text-zinc-400 font-mono pointer-events-none">
                /
              </div>
            </div>

            {/* Live Autocomplete Suggestions */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50">
                <div className="p-2.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800 bg-zinc-900/80">
                  Search Results ({searchResults.length})
                </div>
                {searchResults.map((anime) => (
                  <div
                    key={anime.id}
                    onClick={() => {
                      onSelectAnime(anime);
                      setSearchQuery('');
                      setIsSearchFocused(false);
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-zinc-800 cursor-pointer transition border-b border-zinc-800/60 last:border-0"
                  >
                    <img src={anime.poster} alt={anime.title} className="w-10 h-12 object-cover rounded-xl" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-zinc-100 truncate">{anime.title}</h4>
                      <p className="text-[11px] text-zinc-400 truncate">{anime.genres.join(', ')} • ⭐ {anime.rating}</p>
                    </div>
                    {anime.isHindiDubbed && (
                      <span className="text-[10px] bg-violet-600/30 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded-full font-bold uppercase">
                        Hindi
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links - Pill Bento Buttons */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-medium">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-1.5 rounded-full transition ${
                activeTab === 'home'
                  ? 'bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Browse
            </button>
            <button
              onClick={() => setActiveTab('hindi-dubbed')}
              className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 ${
                activeTab === 'hindi-dubbed'
                  ? 'bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-300" />
              Hindi Dubbed
            </button>
            <button
              onClick={() => setActiveTab('movies')}
              className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 ${
                activeTab === 'movies'
                  ? 'bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-indigo-300" />
              Movies
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 ${
                activeTab === 'schedule'
                  ? 'bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-pink-300" />
              Schedule
            </button>
            <button
              onClick={() => setActiveTab('coming-soon')}
              className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 ${
                activeTab === 'coming-soon'
                  ? 'bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-pink-400" />
              Coming Soon
            </button>
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 relative ${
                activeTab === 'watchlist'
                  ? 'bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-300" />
              Watchlist
              {watchlistCount > 0 && (
                <span className="bg-white text-zinc-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {watchlistCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 ${
                activeTab === 'contact'
                  ? 'bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>Contact Us</span>
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30'
                  : 'text-zinc-300 bg-zinc-900 border border-zinc-800 hover:bg-violet-600 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Panel</span>
            </button>

          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden pb-3 pt-1">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-1.5 pl-9 pr-4 text-xs text-zinc-100"
            />
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#09090b] border-b border-zinc-800 px-4 py-4 space-y-3">
          <div className="flex flex-col gap-2 text-xs font-semibold">
            <button
              onClick={() => {
                setActiveTab('home');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-4 py-2.5 rounded-2xl bg-zinc-900 text-zinc-200 border border-zinc-800"
            >
              🏠 Home
            </button>
            <button
              onClick={() => {
                setActiveTab('hindi-dubbed');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-4 py-2.5 rounded-2xl bg-zinc-900 text-violet-300 font-bold border border-zinc-800"
            >
              ✨ Hindi Dubbed Anime
            </button>
            <button
              onClick={() => {
                setActiveTab('movies');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-4 py-2.5 rounded-2xl bg-zinc-900 text-zinc-200 border border-zinc-800"
            >
              🎬 Anime Movies
            </button>
            <button
              onClick={() => {
                setActiveTab('schedule');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-4 py-2.5 rounded-2xl bg-zinc-900 text-zinc-200 border border-zinc-800"
            >
              📅 Weekly Schedule
            </button>
            <button
              onClick={() => {
                setActiveTab('coming-soon');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-4 py-2.5 rounded-2xl bg-zinc-900 text-pink-300 font-bold border border-zinc-800"
            >
              ⏳ Coming Soon Anime
            </button>
            <button
              onClick={() => {
                setActiveTab('watchlist');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-4 py-2.5 rounded-2xl bg-zinc-900 text-amber-300 font-bold border border-zinc-800 flex justify-between"
            >
              <span>🔖 My Watchlist</span>
              {watchlistCount > 0 && <span className="bg-violet-600 text-white px-2 rounded-full text-xs">{watchlistCount}</span>}
            </button>
            <button
              onClick={() => {
                setActiveTab('contact');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-4 py-2.5 rounded-2xl bg-zinc-900 text-sky-300 font-bold border border-zinc-800 flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-sky-400" />
              <span>💬 Contact Us & Social Links</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('admin');
                setIsMobileMenuOpen(false);
              }}
              className="text-left px-4 py-2.5 rounded-2xl bg-violet-950 text-emerald-400 font-bold border border-violet-800 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>⚙️ Admin Control Panel</span>
            </button>

          </div>
        </div>
      )}
    </header>
  );
};
