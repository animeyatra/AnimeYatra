import React, { useState, useEffect } from 'react';
import { Bell, BellRing, Calendar, Sparkles, Clock, Star, Film, CheckCircle, Info, Filter, Search, Check } from 'lucide-react';

export interface UpcomingAnime {
  id: string;
  title: string;
  japaneseTitle: string;
  poster: string;
  coverImage: string;
  expectedRelease: string; // e.g. "Fall 2026", "October 2026", "Q1 2027"
  releaseDateExact?: string;
  format: 'TV' | 'Movie' | 'OVA' | 'Special';
  studio: string;
  genres: string[];
  isHindiDubConfirmed: boolean;
  synopsis: string;
  source: string; // e.g. "Manga", "Light Novel", "Original"
  trailerUrl?: string;
  excitementRating: number; // e.g. 9.8
}

const UPCOMING_ANIME_DATA: UpcomingAnime[] = [
  {
    id: 'up-1',
    title: 'Solo Leveling Season 2: Arise from the Shadow',
    japaneseTitle: '俺だけレベルアップな件 2nd Season',
    poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop&q=80',
    expectedRelease: 'October 2026',
    format: 'TV',
    studio: 'A-1 Pictures',
    genres: ['Action', 'Fantasy', 'Supernatural'],
    isHindiDubConfirmed: true,
    synopsis: 'Sung Jinwoo faces the Monarchs and uncovers the true origins of the System as the shadow army expands beyond imagination.',
    source: 'Web Novel',
    excitementRating: 9.9
  },
  {
    id: 'up-2',
    title: 'Demon Slayer: Kimetsu no Yaiba – Infinity Castle Arc (Movie 1)',
    japaneseTitle: '鬼滅の刃 無限城編',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    expectedRelease: 'November 2026',
    format: 'Movie',
    studio: 'ufotable',
    genres: ['Action', 'Demons', 'Historical', 'Shounen'],
    isHindiDubConfirmed: true,
    synopsis: 'The Demon Slayer Corps plunges into Muzan Kibutsuji’s dimensional Infinity Castle for the final, bloody showdown against the Upper Rank Demons.',
    source: 'Manga',
    excitementRating: 9.9
  },
  {
    id: 'up-3',
    title: 'Jujutsu Kaisen Season 3: Culling Game Arc',
    japaneseTitle: '呪術廻戦 死滅回游編',
    poster: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1200&auto=format&fit=crop&q=80',
    expectedRelease: 'January 2027',
    format: 'TV',
    studio: 'MAPPA',
    genres: ['Action', 'Supernatural', 'Dark Fantasy'],
    isHindiDubConfirmed: true,
    synopsis: 'Following the tragic Shibuya Incident, Yuji Itadori and surviving sorcerers enter Kenjaku’s deadly battle royale known as the Culling Game.',
    source: 'Manga',
    excitementRating: 9.8
  },
  {
    id: 'up-4',
    title: 'Chainsaw Man Movie: Reze Arc',
    japaneseTitle: 'チェンソーマン レゼ篇',
    poster: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&auto=format&fit=crop&q=80',
    expectedRelease: 'December 2026',
    format: 'Movie',
    studio: 'MAPPA',
    genres: ['Action', 'Gore', 'Romance', 'Supernatural'],
    isHindiDubConfirmed: true,
    synopsis: 'Denji meets Reze, a mysterious phone-booth girl who brings unexpected romance and explosive danger into his chaotic life as Chainsaw Man.',
    source: 'Manga',
    excitementRating: 9.7
  },
  {
    id: 'up-5',
    title: 'One Punch Man Season 3',
    japaneseTitle: 'ワンパンマン 3rd Season',
    poster: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    expectedRelease: 'Spring 2027',
    format: 'TV',
    studio: 'J.C.Staff',
    genres: ['Action', 'Comedy', 'Parody', 'Super Power'],
    isHindiDubConfirmed: true,
    synopsis: 'The Monster Association declares all-out war on the Hero Association. Garou undergoes horrifying monsterfication while Saitama searches for a real challenge.',
    source: 'Manga',
    excitementRating: 9.6
  },
  {
    id: 'up-6',
    title: 'Bleach: Thousand-Year Blood War – Part 3 (The Conflict)',
    japaneseTitle: 'BLEACH 千年血戦篇-相剋譚-',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop&q=80',
    expectedRelease: 'October 2026',
    format: 'TV',
    studio: 'Studio Pierrot',
    genres: ['Action', 'Supernatural', 'Shounen'],
    isHindiDubConfirmed: true,
    synopsis: 'Ichigo Kurosaki breaches Yhwach’s Royal Realm to prevent the total destruction of the Soul King and the collapse of the three worlds.',
    source: 'Manga',
    excitementRating: 9.8
  },
  {
    id: 'up-7',
    title: 'Kaiju No. 8 Season 2',
    japaneseTitle: '怪獣8号 第2期',
    poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1200&auto=format&fit=crop&q=80',
    expectedRelease: 'Winter 2027',
    format: 'TV',
    studio: 'Production I.G',
    genres: ['Action', 'Sci-Fi', 'Military'],
    isHindiDubConfirmed: true,
    synopsis: 'Kafka Hibino balances his identity as Defense Force cleaner turned Kaiju No. 8 while new humanoid Kaiju threaten Japan.',
    source: 'Manga',
    excitementRating: 9.5
  },
  {
    id: 'up-8',
    title: 'Dragon Ball DAIMA',
    japaneseTitle: 'ドラゴンボールDAIMA',
    poster: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&auto=format&fit=crop&q=80',
    expectedRelease: 'November 2026',
    format: 'TV',
    studio: 'Toei Animation',
    genres: ['Action', 'Adventure', 'Fantasy'],
    isHindiDubConfirmed: true,
    synopsis: 'Due to a mysterious conspiracy, Goku and his friends are turned small. To undo the curse, they head off into an unknown galactic realm.',
    source: 'Original',
    excitementRating: 9.4
  }
];

export const ComingSoonView: React.FC = () => {
  const [notifiedIds, setNotifiedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('animeyatra_notified_anime');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [filterFormat, setFilterFormat] = useState<string>('All');
  const [filterOnlyNotified, setFilterOnlyNotified] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persist notification preferences to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('animeyatra_notified_anime', JSON.stringify(notifiedIds));
    } catch (e) {
      console.error('Failed to save notification choices', e);
    }
  }, [notifiedIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleNotification = (anime: UpcomingAnime) => {
    setNotifiedIds((prev) => {
      const isCurrentlyNotified = prev.includes(anime.id);
      let updated: string[];
      if (isCurrentlyNotified) {
        updated = prev.filter((id) => id !== anime.id);
        showToast(`Notification removed for "${anime.title}"`);
      } else {
        updated = [...prev, anime.id];
        showToast(`🔔 Notification set! We'll alert you when "${anime.title}" releases!`);
      }
      return updated;
    });
  };

  const filteredList = UPCOMING_ANIME_DATA.filter((anime) => {
    if (filterOnlyNotified && !notifiedIds.includes(anime.id)) return false;
    if (filterFormat !== 'All' && anime.format !== filterFormat) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        anime.title.toLowerCase().includes(q) ||
        anime.japaneseTitle.toLowerCase().includes(q) ||
        anime.studio.toLowerCase().includes(q) ||
        anime.genres.some((g) => g.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-violet-600 text-white px-5 py-3 rounded-2xl shadow-2xl font-bold text-xs flex items-center gap-2 border border-violet-400 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-950 via-zinc-900 to-indigo-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-violet-600/20 text-violet-300 text-xs font-bold px-3 py-1 rounded-full border border-violet-500/30">
            <Clock className="w-3.5 h-3.5 text-pink-400" />
            <span>Upcoming Releases Radar</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Coming Soon to <span className="text-violet-400">AnimeYatra</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Stay ahead of the hype! Track upcoming blockbuster anime seasons, upcoming movies, and confirmed 
            Hindi, Hinglish, Tamil & Telugu dub releases. Click <strong className="text-white font-bold">"Notify Me"</strong> to get saved release alerts directly in your browser.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl px-4 py-2 text-zinc-300 font-bold flex items-center gap-2">
              <Bell className="w-4 h-4 text-violet-400" />
              <span>
                My Alerts: <strong className="text-amber-400 font-mono">{notifiedIds.length}</strong> releases tracked
              </span>
            </div>

            {notifiedIds.length > 0 && (
              <button
                onClick={() => setFilterOnlyNotified(!filterOnlyNotified)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 border ${
                  filterOnlyNotified
                    ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-lg'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-amber-400'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{filterOnlyNotified ? 'Showing My Alerts' : 'Filter My Alerts'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-zinc-900/80 border border-zinc-800 rounded-3xl p-4 backdrop-blur-md">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search upcoming anime, studio, genre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-2 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition"
          />
        </div>

        {/* Format Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-zinc-500 font-bold flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            Format:
          </span>
          {['All', 'TV', 'Movie'].map((fmt) => (
            <button
              key={fmt}
              onClick={() => setFilterFormat(fmt)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
                filterFormat === fmt
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Upcoming Anime Cards */}
      {filteredList.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center space-y-3 max-w-md mx-auto">
          <Clock className="w-12 h-12 text-violet-500 mx-auto opacity-50" />
          <h3 className="text-base font-bold text-white">No Upcoming Releases Found</h3>
          <p className="text-xs text-zinc-400">
            Try adjusting your search query or removing filters to see upcoming releases.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterFormat('All');
              setFilterOnlyNotified(false);
            }}
            className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs px-4 py-2 rounded-full transition mt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredList.map((anime) => {
            const isNotified = notifiedIds.includes(anime.id);

            return (
              <div
                key={anime.id}
                className="bg-zinc-900 border border-zinc-800 hover:border-violet-500/60 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-violet-950/20 transition-all duration-300 flex flex-col sm:flex-row group"
              >
                {/* Poster Image */}
                <div className="relative w-full sm:w-48 aspect-[3/4] sm:aspect-auto shrink-0 bg-zinc-950 overflow-hidden">
                  <img
                    src={anime.poster}
                    alt={anime.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent sm:hidden" />

                  <span className="absolute top-3 left-3 bg-zinc-950/80 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-zinc-800 flex items-center gap-1 backdrop-blur-md">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {anime.excitementRating} Hype
                  </span>

                  <span className="absolute bottom-3 left-3 bg-violet-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-md">
                    {anime.format}
                  </span>
                </div>

                {/* Info Container */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-base text-white group-hover:text-violet-400 transition-colors line-clamp-2">
                          {anime.title}
                        </h3>
                        <p className="text-[11px] text-zinc-500 font-medium">{anime.japaneseTitle}</p>
                      </div>
                    </div>

                    {/* Metadata Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="bg-zinc-950 text-pink-300 border border-zinc-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-pink-400" />
                        {anime.expectedRelease}
                      </span>

                      <span className="bg-zinc-950 text-indigo-300 border border-zinc-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        Studio: {anime.studio}
                      </span>

                      {anime.isHindiDubConfirmed && (
                        <span className="bg-violet-950 text-violet-300 border border-violet-800/60 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-violet-400" />
                          Hindi Dub Confirmed
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed pt-1">
                      {anime.synopsis}
                    </p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="flex items-center justify-between border-t border-zinc-800/80 pt-3.5">
                    <div className="text-[11px] text-zinc-500 font-mono">
                      Source: <strong className="text-zinc-300">{anime.source}</strong>
                    </div>

                    {/* Notify Me Button */}
                    <button
                      onClick={() => toggleNotification(anime)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2 shadow-lg ${
                        isNotified
                          ? 'bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-amber-400/20'
                          : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/30'
                      }`}
                    >
                      {isNotified ? (
                        <>
                          <BellRing className="w-4 h-4 text-zinc-950" />
                          <span>Notified (Saved)</span>
                        </>
                      ) : (
                        <>
                          <Bell className="w-4 h-4" />
                          <span>Notify Me</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
