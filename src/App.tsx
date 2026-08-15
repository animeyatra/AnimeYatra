import React, { useState, useEffect, useMemo } from 'react';
import { SAMPLE_ANIME, GENRE_LIST } from './data/animeData';
import { Anime, Episode, Language, ContactMessage } from './types';
import { Navbar } from './components/Navbar';
import { LanguageFilterBar } from './components/LanguageFilterBar';
import { HeroBanner } from './components/HeroBanner';
import { AnimeCard } from './components/AnimeCard';
import { AnimeDetailModal } from './components/AnimeDetailModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { WatchlistView } from './components/WatchlistView';
import { ScheduleView } from './components/ScheduleView';
import { ComingSoonView } from './components/ComingSoonView';
import { ContactView } from './components/ContactView';
import { AdminPanel } from './components/AdminPanel';
import { AdBlockHelperModal } from './components/AdBlockHelperModal';
import { Footer } from './components/Footer';
import { Sparkles, Flame, Film, Filter } from 'lucide-react';
import { supabase } from './lib/supabase';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'hindi-dubbed' | 'movies' | 'schedule' | 'watchlist' | 'coming-soon' | 'contact' | 'admin'>('home');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | 'All'>('All');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persistent Anime Data state (Loaded from Supabase / localStorage fallback)
  const [animeList, setAnimeList] = useState<Anime[]>(() => {
    try {
      const saved = localStorage.getItem('animeyatra_anime_data');
      return saved ? JSON.parse(saved) : SAMPLE_ANIME;
    } catch {
      return SAMPLE_ANIME;
    }
  });

  // Fetch from Supabase on mount
  useEffect(() => {
    const fetchAnimeFromSupabase = async () => {
      try {
        const { data, error } = await supabase.from('anime').select('*');
        if (error) {
          console.warn('Could not fetch from Supabase, using local fallback:', error.message);
          return;
        }

        if (data && data.length > 0) {
          const formattedData: Anime[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            englishTitle: item.english_title || item.englishTitle,
            japaneseTitle: item.japanese_title || item.japaneseTitle,
            slug: item.slug || item.id,
            poster: item.poster || item.cover_image,
            coverImage: item.cover_image || item.poster,
            bannerImage: item.banner_image || item.cover_image,
            synopsis: item.synopsis || item.description || '',
            rating: Number(item.rating) || 0,
            totalVotes: item.total_votes || 0,
            genres: item.genres || [],
            format: item.format || 'TV',
            status: item.status || 'Ongoing',
            releaseYear: item.release_year || new Date().getFullYear(),
            studio: item.studio || 'Unknown Studio',
            dubLanguages: item.dub_languages || [],
            subLanguages: item.sub_languages || [],
            totalEpisodes: item.total_episodes || 12,
            views: item.views || 0,
            isTrending: Boolean(item.is_trending),
            isFeatured: Boolean(item.is_featured),
            isHindiDubbed: Boolean(item.is_hindi_dubbed),
            cast: item.cast || [],
            reviews: item.reviews || [],
            externalLinks: item.external_links || {},
            seasons: item.seasons || [],
            addedBy: item.added_by || 'Admin', // <--- Added addedBy from Supabase!
            addedAt: item.created_at || item.added_at
          }));

          setAnimeList(formattedData);
        }
      } catch (err) {
        console.error('Error connecting to Supabase:', err);
      }
    };

    fetchAnimeFromSupabase();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('animeyatra_anime_data', JSON.stringify(animeList));
    } catch (e) {
      console.error('Failed to save anime data to localStorage', e);
    }
  }, [animeList]);

  // Site Notices State
  const [siteNotice, setSiteNotice] = useState<string>(() => {
    try {
      return localStorage.getItem('animeyatra_site_notice') || 'Welcome to AnimeYatra — 100% HD Hindi, Hinglish, Tamil & Telugu Dubbed Anime!';
    } catch {
      return 'Welcome to AnimeYatra — 100% HD Hindi, Hinglish, Tamil & Telugu Dubbed Anime!';
    }
  });

  const [noticeBanner, setNoticeBanner] = useState<string>(() => {
    try {
      return localStorage.getItem('animeyatra_notice_banner') || 'NO ZIP/BATCH LINKS FOUND - COMMENT';
    } catch {
      return 'NO ZIP/BATCH LINKS FOUND - COMMENT';
    }
  });

  // Home Page Customization State
  const [homeTitle, setHomeTitle] = useState<string>(() => {
    try {
      return localStorage.getItem('animeyatra_home_title') || 'Spring 2026 Lineup';
    } catch {
      return 'Spring 2026 Lineup';
    }
  });

  const [homeSubtitle, setHomeSubtitle] = useState<string>(() => {
    try {
      return localStorage.getItem('animeyatra_home_subtitle') || '42 new titles debuting in Hindi, Tamil & Telugu';
    } catch {
      return '42 new titles debuting in Hindi, Tamil & Telugu';
    }
  });

  const [pollQuestion, setPollQuestion] = useState<string>(() => {
    try {
      return localStorage.getItem('animeyatra_poll_question') || 'Which Hindi Dubbed Arc are you most excited for?';
    } catch {
      return 'Which Hindi Dubbed Arc are you most excited for?';
    }
  });

  const [pollOptions, setPollOptions] = useState<string>(() => {
    try {
      return localStorage.getItem('animeyatra_poll_options') || 'Solo Leveling Season 2 vs Jujutsu Kaisen Culling Game';
    } catch {
      return 'Solo Leveling Season 2 vs Jujutsu Kaisen Culling Game';
    }
  });

  const [featuredHeroId, setFeaturedHeroId] = useState<string>(() => {
    try {
      return localStorage.getItem('animeyatra_featured_hero_id') || '';
    } catch {
      return '';
    }
  });

  // Contact Us & Social Links State
  const [contactInstagram, setContactInstagram] = useState<string>(() => {
    try {
      return localStorage.getItem('animeyatra_contact_instagram') || 'https://instagram.com/animeyatra_official';
    } catch {
      return 'https://instagram.com/animeyatra_official';
    }
  });

  const [contactEmail, setContactEmail] = useState<string>(() => {
    try {
      return localStorage.getItem('animeyatra_contact_email') || 'support@animeyatra.in';
    } catch {
      return 'support@animeyatra.in';
    }
  });

  const [contactTelegram, setContactTelegram] = useState<string>(() => {
    try {
      return localStorage.getItem('animeyatra_contact_telegram') || 'https://t.me/animeyatra_official';
    } catch {
      return 'https://t.me/animeyatra_official';
    }
  });

  const [contactNote, setContactNote] = useState<string>(() => {
    try {
      return localStorage.getItem('animeyatra_contact_note') || 'Have an anime request, broken server link report, or sponsorship inquiry? Reach out via Instagram, Email, or Telegram!';
    } catch {
      return 'Have an anime request, broken server link report, or sponsorship inquiry? Reach out via Instagram, Email, or Telegram!';
    }
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem('animeyatra_contact_messages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Global Skip AD Shorteners State
  const [skipAdV1Url, setSkipAdV1Url] = useState<string>(() => {
    try {
      return localStorage.getItem('animeyatra_skipad_v1') || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    } catch {
      return 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    }
  });

  const [skipAdGplinksUrl, setSkipAdGplinksUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('animeyatra_skipad_gplinks') || 'https://gplinks.in';
    } catch {
      return 'https://gplinks.in';
    }
  });

  const [skipAdCuty1Url, setSkipAdCuty1Url] = useState<string>(() => {
    try {
      return localStorage.getItem('animeyatra_skipad_cuty1') || 'https://cuty.io';
    } catch {
      return 'https://cuty.io';
    }
  });

  const [skipAdCuty2Url, setSkipAdCuty2Url] = useState<string>(() => {
    try {
      return localStorage.getItem('animeyatra_skipad_cuty2') || 'https://cuty.io';
    } catch {
      return 'https://cuty.io';
    }
  });

  const [skipAdCuty3Url, setSkipAdCuty3Url] = useState<string>(() => {
    try {
      return localStorage.getItem('animeyatra_skipad_cuty3') || 'https://cuty.io';
    } catch {
      return 'https://cuty.io';
    }
  });

  // Real Analytics State
  const [siteVisitors, setSiteVisitors] = useState<number>(() => {
    try {
      const val = localStorage.getItem('animeyatra_site_visitors');
      return val ? parseInt(val, 10) || 0 : 1;
    } catch {
      return 1;
    }
  });

  const [uniqueVisitors, setUniqueVisitors] = useState<number>(() => {
    try {
      const val = localStorage.getItem('animeyatra_unique_visitors');
      return val ? parseInt(val, 10) || 0 : 1;
    } catch {
      return 1;
    }
  });

  const [actualStreamWatches, setActualStreamWatches] = useState<number>(() => {
    try {
      const val = localStorage.getItem('animeyatra_stream_watches');
      return val ? parseInt(val, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [useRealStats, setUseRealStats] = useState<boolean>(() => {
    try {
      return localStorage.getItem('animeyatra_use_real_stats') !== 'false';
    } catch {
      return true;
    }
  });

  // Save Settings Sync Effects
  useEffect(() => { try { localStorage.setItem('animeyatra_skipad_v1', skipAdV1Url); } catch (e) { console.error(e); } }, [skipAdV1Url]);
  useEffect(() => { try { localStorage.setItem('animeyatra_skipad_gplinks', skipAdGplinksUrl); } catch (e) { console.error(e); } }, [skipAdGplinksUrl]);
  useEffect(() => { try { localStorage.setItem('animeyatra_skipad_cuty1', skipAdCuty1Url); } catch (e) { console.error(e); } }, [skipAdCuty1Url]);
  useEffect(() => { try { localStorage.setItem('animeyatra_skipad_cuty2', skipAdCuty2Url); } catch (e) { console.error(e); } }, [skipAdCuty2Url]);
  useEffect(() => { try { localStorage.setItem('animeyatra_skipad_cuty3', skipAdCuty3Url); } catch (e) { console.error(e); } }, [skipAdCuty3Url]);
  useEffect(() => { try { localStorage.setItem('animeyatra_site_visitors', siteVisitors.toString()); } catch (e) { console.error(e); } }, [siteVisitors]);
  useEffect(() => { try { localStorage.setItem('animeyatra_unique_visitors', uniqueVisitors.toString()); } catch (e) { console.error(e); } }, [uniqueVisitors]);
  useEffect(() => { try { localStorage.setItem('animeyatra_stream_watches', actualStreamWatches.toString()); } catch (e) { console.error(e); } }, [actualStreamWatches]);
  useEffect(() => { try { localStorage.setItem('animeyatra_use_real_stats', useRealStats.toString()); } catch (e) { console.error(e); } }, [useRealStats]);
  useEffect(() => { try { localStorage.setItem('animeyatra_site_notice', siteNotice); } catch (e) { console.error(e); } }, [siteNotice]);
  useEffect(() => { try { localStorage.setItem('animeyatra_notice_banner', noticeBanner); } catch (e) { console.error(e); } }, [noticeBanner]);
  useEffect(() => { try { localStorage.setItem('animeyatra_home_title', homeTitle); } catch (e) { console.error(e); } }, [homeTitle]);
  useEffect(() => { try { localStorage.setItem('animeyatra_home_subtitle', homeSubtitle); } catch (e) { console.error(e); } }, [homeSubtitle]);
  useEffect(() => { try { localStorage.setItem('animeyatra_poll_question', pollQuestion); } catch (e) { console.error(e); } }, [pollQuestion]);
  useEffect(() => { try { localStorage.setItem('animeyatra_poll_options', pollOptions); } catch (e) { console.error(e); } }, [pollOptions]);
  useEffect(() => { try { localStorage.setItem('animeyatra_featured_hero_id', featuredHeroId); } catch (e) { console.error(e); } }, [featuredHeroId]);
  useEffect(() => { try { localStorage.setItem('animeyatra_contact_instagram', contactInstagram); } catch (e) { console.error(e); } }, [contactInstagram]);
  useEffect(() => { try { localStorage.setItem('animeyatra_contact_email', contactEmail); } catch (e) { console.error(e); } }, [contactEmail]);
  useEffect(() => { try { localStorage.setItem('animeyatra_contact_telegram', contactTelegram); } catch (e) { console.error(e); } }, [contactTelegram]);
  useEffect(() => { try { localStorage.setItem('animeyatra_contact_note', contactNote); } catch (e) { console.error(e); } }, [contactNote]);

  useEffect(() => {
    try {
      localStorage.setItem('animeyatra_contact_messages', JSON.stringify(contactMessages));
    } catch (e) {
      console.error('Failed to save contact messages', e);
    }
  }, [contactMessages]);

  // Track page visit on mount
  useEffect(() => {
    setSiteVisitors((prev) => prev + 1);

    if (!sessionStorage.getItem('animeyatra_session_active')) {
      try {
        sessionStorage.setItem('animeyatra_session_active', 'true');
      } catch (e) {
        console.error(e);
      }
      setUniqueVisitors((prev) => prev + 1);
    }
  }, []);

  const handleAddContactMessage = (msg: Omit<ContactMessage, 'id' | 'timestamp' | 'isRead'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg_${Date.now()}`,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      isRead: false
    };
    setContactMessages((prev) => [newMsg, ...prev]);
  };

  const handleResetDefaultData = () => {
    if (window.confirm('Reset all catalog data to default sample anime? Custom additions will be replaced.')) {
      setAnimeList(SAMPLE_ANIME);
      try {
        localStorage.removeItem('animeyatra_anime_data');
      } catch (e) {
        console.error(e);
      }
    }
  };

  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [watchingEpisode, setWatchingEpisode] = useState<{ anime: Anime; episode: Episode } | null>(null);
  const [showAdBlockModal, setShowAdBlockModal] = useState<boolean>(false);

  // Watchlist state
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('animeyatra_watchlist');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('animeyatra_watchlist', JSON.stringify(watchlist));
    } catch (e) {
      console.error(e);
    }
  }, [watchlist]);

  // Cleanup selected modal, player, and watchlist if anime is deleted
  useEffect(() => {
    const validIds = new Set(animeList.map((a) => a.id));
    if (selectedAnime && !validIds.has(selectedAnime.id)) {
      setSelectedAnime(null);
    }
    if (watchingEpisode && !validIds.has(watchingEpisode.anime.id)) {
      setWatchingEpisode(null);
    }
    setWatchlist((prev) => {
      const filtered = prev.filter((id) => validIds.has(id));
      return filtered.length !== prev.length ? filtered : prev;
    });
  }, [animeList, selectedAnime, watchingEpisode]);

  const handleToggleWatchlist = (animeId: string) => {
    setWatchlist((prev) =>
      prev.includes(animeId) ? prev.filter((id) => id !== animeId) : [...prev, animeId]
    );
  };

  const incrementAnimeViews = (animeId: string) => {
    setActualStreamWatches((prev) => prev + 1);

    setAnimeList((prev) => {
      const updated = prev.map((item) =>
        item.id === animeId ? { ...item, views: item.views + 1 } : item
      );
      try {
        localStorage.setItem('animeyatra_anime_data', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleResetCatalogViews = () => {
    setAnimeList((prev) => {
      const updated = prev.map((item) => ({ ...item, views: 0 }));
      try {
        localStorage.setItem('animeyatra_anime_data', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleWatchEpisodeNumber = (anime: Anime, epNum: number = 1) => {
    const allEpisodes = anime.seasons?.flatMap((s) => s.episodes) || [];
    const ep = allEpisodes.find((e) => e.episodeNumber === epNum) || allEpisodes[0];
    if (ep) {
      setWatchingEpisode({ anime, episode: ep });
      incrementAnimeViews(anime.id);
    }
  };

  const handleWatchSpecificEpisode = (anime: Anime, episode: Episode) => {
    setWatchingEpisode({ anime, episode });
    incrementAnimeViews(anime.id);
  };

  // Filter logic
  const filteredAnimeList = useMemo(() => {
    return animeList.filter((anime) => {
      if (
        searchQuery.trim() &&
        !anime.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !anime.englishTitle?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !anime.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        return false;
      }

      if (activeTab === 'hindi-dubbed' && !anime.isHindiDubbed) return false;
      if (activeTab === 'movies' && anime.format !== 'Movie') return false;

      if (selectedLanguage !== 'All' && !anime.dubLanguages.includes(selectedLanguage)) {
        return false;
      }

      if (selectedGenre !== 'All' && !anime.genres.includes(selectedGenre)) {
        return false;
      }

      return true;
    });
  }, [animeList, searchQuery, activeTab, selectedLanguage, selectedGenre]);

  const featuredAnime = useMemo(() => {
    if (featuredHeroId) {
      const topAnime = animeList.find((a) => a.id === featuredHeroId);
      if (topAnime) {
        const rest = animeList.filter((a) => a.id !== featuredHeroId);
        return [topAnime, ...rest];
      }
    }
    return animeList.filter((a) => a.isFeatured);
  }, [animeList, featuredHeroId]);

  const trendingAnime = useMemo(() => animeList.filter((a) => a.isTrending), [animeList]);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-violet-600 selection:text-white flex flex-col antialiased">
      
      {/* Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        animeList={animeList}
        onSelectAnime={setSelectedAnime}
        watchlistCount={watchlist.length}
        onOpenAdBlockModal={() => setShowAdBlockModal(true)}
        siteNotice={siteNotice}
      />

      {/* Language Filter Bar */}
      {activeTab !== 'admin' && (
        <LanguageFilterBar
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
      )}

      {/* Main Body Content */}
      <main className="flex-1 pb-16">
        {activeTab === 'admin' ? (
          <AdminPanel
            animeList={animeList}
            setAnimeList={setAnimeList}
            siteNotice={siteNotice}
            setSiteNotice={setSiteNotice}
            noticeBanner={noticeBanner}
            setNoticeBanner={setNoticeBanner}
            homeTitle={homeTitle}
            setHomeTitle={setHomeTitle}
            homeSubtitle={homeSubtitle}
            setHomeSubtitle={setHomeSubtitle}
            pollQuestion={pollQuestion}
            setPollQuestion={setPollQuestion}
            pollOptions={pollOptions}
            setPollOptions={setPollOptions}
            featuredHeroId={featuredHeroId}
            setFeaturedHeroId={setFeaturedHeroId}
            contactInstagram={contactInstagram}
            setContactInstagram={setContactInstagram}
            contactEmail={contactEmail}
            setContactEmail={setContactEmail}
            contactTelegram={contactTelegram}
            setContactTelegram={setContactTelegram}
            contactNote={contactNote}
            setContactNote={setContactNote}
            contactMessages={contactMessages}
            setContactMessages={setContactMessages}
            siteVisitors={siteVisitors}
            setSiteVisitors={setSiteVisitors}
            uniqueVisitors={uniqueVisitors}
            setUniqueVisitors={setUniqueVisitors}
            actualStreamWatches={actualStreamWatches}
            setActualStreamWatches={setActualStreamWatches}
            useRealStats={useRealStats}
            setUseRealStats={setUseRealStats}
            skipAdV1Url={skipAdV1Url}
            setSkipAdV1Url={setSkipAdV1Url}
            skipAdGplinksUrl={skipAdGplinksUrl}
            setSkipAdGplinksUrl={setSkipAdGplinksUrl}
            skipAdCuty1Url={skipAdCuty1Url}
            setSkipAdCuty1Url={setSkipAdCuty1Url}
            skipAdCuty2Url={skipAdCuty2Url}
            setSkipAdCuty2Url={setSkipAdCuty2Url}
            skipAdCuty3Url={skipAdCuty3Url}
            setSkipAdCuty3Url={setSkipAdCuty3Url}
            onResetCatalogViews={handleResetCatalogViews}
            onResetData={handleResetDefaultData}
          />
        ) : activeTab === 'contact' ? (
          <ContactView
            instagramUrl={contactInstagram}
            contactEmail={contactEmail}
            telegramUrl={contactTelegram}
            contactNote={contactNote}
            onSubmitMessage={handleAddContactMessage}
          />
        ) : activeTab === 'watchlist' ? (
          <WatchlistView
            animeList={animeList}
            watchlist={watchlist}
            onSelectAnime={setSelectedAnime}
            onQuickWatch={(anime) => handleWatchEpisodeNumber(anime, 1)}
            onToggleWatchlist={handleToggleWatchlist}
          />
        ) : activeTab === 'schedule' ? (
          <ScheduleView animeList={animeList} onSelectAnime={setSelectedAnime} />
        ) : activeTab === 'coming-soon' ? (
          <ComingSoonView />
        ) : (
          <>
            {/* Hero Spotlight (Only on Home tab when no search query) */}
            {activeTab === 'home' && !searchQuery.trim() && (
              <HeroBanner
                featuredList={featuredAnime}
                onSelectAnime={setSelectedAnime}
                onWatchEpisode={handleWatchEpisodeNumber}
                watchlist={watchlist}
                onToggleWatchlist={handleToggleWatchlist}
              />
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
              
              {/* Bento Grid Feature Section (Home Tab Only) */}
              {activeTab === 'home' && !searchQuery.trim() && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Season Info Bento Box */}
                  <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="text-violet-500 bg-violet-500/10 p-2.5 rounded-2xl">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] text-zinc-500 font-mono border border-zinc-800 px-2 py-0.5 rounded-full">v2.4.1</span>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-base font-bold text-white mb-1">{homeTitle}</h3>
                      <p className="text-zinc-500 text-xs">{homeSubtitle}</p>
                    </div>
                  </div>

                  {/* Active Community Bento Box */}
                  <div className="rounded-3xl bg-violet-600 p-6 flex flex-col items-center justify-center text-center text-white shadow-lg shadow-violet-600/20">
                    <div className="text-3xl font-black tracking-tight mb-1">1.2M+</div>
                    <div className="text-[10px] uppercase font-bold tracking-widest opacity-80">Active Anime Streams</div>
                    <div className="text-[11px] mt-2 font-medium bg-white/10 px-3 py-1 rounded-full border border-white/20">
                      100% HD Dubbed
                    </div>
                  </div>

                  {/* Community Poll Bento Box */}
                  <div className="md:col-span-2 rounded-3xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-violet-400">Community Poll</span>
                        <span className="text-[10px] text-zinc-500 font-mono">14.2k votes</span>
                      </div>
                      <h4 className="text-xs font-bold text-white mb-1">{pollQuestion}</h4>
                      <p className="text-[11px] text-zinc-500 mb-3">{pollOptions}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500 w-[78%]" />
                      </div>
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-zinc-300">Solo Leveling: Arise</span>
                        <span className="text-violet-400">78%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Category Header & Genre Filters */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    {activeTab === 'hindi-dubbed' ? (
                      <>
                        <Sparkles className="w-5 h-5 text-violet-400" />
                        <span>Hindi Dubbed Anime Series</span>
                      </>
                    ) : activeTab === 'movies' ? (
                      <>
                        <Film className="w-5 h-5 text-indigo-400" />
                        <span>Anime Movies (Hindi & Multi-Audio)</span>
                      </>
                    ) : (
                      <>
                        <Flame className="w-5 h-5 text-violet-400" />
                        <span>Anime Catalog</span>
                      </>
                    )}
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Streaming {filteredAnimeList.length} titles in HD Quality
                  </p>
                </div>

                {/* Genre Selector Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full pb-1">
                  <span className="text-xs text-zinc-500 flex items-center gap-1 shrink-0 font-bold uppercase tracking-wider text-[10px] mr-1">
                    <Filter className="w-3.5 h-3.5 text-zinc-400" /> Genre:
                  </span>
                  {GENRE_LIST.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
                        selectedGenre === genre
                          ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Catalog Grid */}
              {filteredAnimeList.length === 0 ? (
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center text-zinc-400 space-y-2">
                  <p className="text-lg font-bold text-white">No Anime Found</p>
                  <p className="text-xs text-zinc-500">Try clearing search filters or selecting a different language audio option.</p>
                  <button
                    onClick={() => {
                      setSelectedGenre('All');
                      setSelectedLanguage('All');
                      setSearchQuery('');
                    }}
                    className="mt-2 bg-violet-600 text-white text-xs px-5 py-2 rounded-full font-bold hover:bg-violet-500 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
                  {filteredAnimeList.map((anime) => (
                    <AnimeCard
                      key={anime.id}
                      anime={anime}
                      onSelect={setSelectedAnime}
                      onQuickWatch={(a) => handleWatchEpisodeNumber(a, 1)}
                      isInWatchlist={watchlist.includes(anime.id)}
                      onToggleWatchlist={handleToggleWatchlist}
                    />
                  ))}
                </div>
              )}

              {/* Bento Leaderboard / Trending Section */}
              {activeTab === 'home' && !searchQuery && (
                <div className="pt-8 space-y-4 border-t border-zinc-800">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Flame className="w-5 h-5 text-violet-400" />
                      <span>Top Leaderboard Anime</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {trendingAnime.map((anime) => (
                      <AnimeCard
                        key={`trending-${anime.id}`}
                        anime={anime}
                        onSelect={setSelectedAnime}
                        onQuickWatch={(a) => handleWatchEpisodeNumber(a, 1)}
                        isInWatchlist={watchlist.includes(anime.id)}
                        onToggleWatchlist={handleToggleWatchlist}
                      />
                    ))}
                  </div>
                </div>
              )}

            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setActiveTab('admin')} onOpenContact={() => setActiveTab('contact')} />

      {/* Modals */}
      {selectedAnime && (
        <AnimeDetailModal
          anime={selectedAnime}
          onClose={() => setSelectedAnime(null)}
          onWatchEpisode={(anime, ep) => {
            setSelectedAnime(null);
            handleWatchSpecificEpisode(anime, ep);
          }}
          isInWatchlist={watchlist.includes(selectedAnime.id)}
          onToggleWatchlist={handleToggleWatchlist}
        />
      )}

      {watchingEpisode && (
        <VideoPlayerModal
          anime={watchingEpisode.anime}
          episode={watchingEpisode.episode}
          skipAdV1Url={skipAdV1Url}
          skipAdGplinksUrl={skipAdGplinksUrl}
          skipAdCuty1Url={skipAdCuty1Url}
          skipAdCuty2Url={skipAdCuty2Url}
          skipAdCuty3Url={skipAdCuty3Url}
          onClose={() => setWatchingEpisode(null)}
          onNextEpisode={() => {
            const allEps = watchingEpisode.anime.seasons?.flatMap((s) => s.episodes) || [];
            const currentEpNum = watchingEpisode.episode.episodeNumber;
            const nextEp = allEps.find((e) => e.episodeNumber === currentEpNum + 1);
            if (nextEp) {
              setWatchingEpisode({ anime: watchingEpisode.anime, episode: nextEp });
            }
          }}
          onPrevEpisode={() => {
            const allEps = watchingEpisode.anime.seasons?.flatMap((s) => s.episodes) || [];
            const currentEpNum = watchingEpisode.episode.episodeNumber;
            const prevEp = allEps.find((e) => e.episodeNumber === currentEpNum - 1);
            if (prevEp) {
              setWatchingEpisode({ anime: watchingEpisode.anime, episode: prevEp });
            }
          }}
        />
      )}

      {showAdBlockModal && (
        <AdBlockHelperModal onClose={() => setShowAdBlockModal(false)} />
      )}

    </div>
  );
}