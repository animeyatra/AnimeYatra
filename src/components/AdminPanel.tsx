import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Tv, 
  Video, 
  Sparkles, 
  Settings, 
  Lock, 
  LogOut, 
  Save, 
  CheckCircle, 
  X, 
  Layers, 
  List, 
  Globe, 
  MessageSquare, 
  AlertCircle,
  Eye,
  Star,
  RefreshCw,
  Link as LinkIcon,
  PlusCircle,
  Users,
  Upload,
  UploadCloud,
  FileVideo,
  Image as ImageIcon,
  Play,
  Key,
  Crown,
  ShieldAlert,
  UserCheck,
  Unlock,
  KeyRound,
  Layout,
  Home,
  Instagram,
  Mail,
  Inbox,
  AtSign,
  Send,
  CheckCircle2,
  BarChart3,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Anime, Episode, StreamServer, Season, Language, AnimeFormat, VoiceActor, ContactMessage } from '../types';

interface AdminPanelProps {
  animeList: Anime[];
  setAnimeList: React.Dispatch<React.SetStateAction<Anime[]>>;
  siteNotice: string;
  setSiteNotice: (notice: string) => void;
  noticeBanner: string;
  setNoticeBanner: (banner: string) => void;
  homeTitle?: string;
  setHomeTitle?: (val: string) => void;
  homeSubtitle?: string;
  setHomeSubtitle?: (val: string) => void;
  pollQuestion?: string;
  setPollQuestion?: (val: string) => void;
  pollOptions?: string;
  setPollOptions?: (val: string) => void;
  featuredHeroId?: string;
  setFeaturedHeroId?: (val: string) => void;
  contactInstagram?: string;
  setContactInstagram?: (val: string) => void;
  contactEmail?: string;
  setContactEmail?: (val: string) => void;
  contactTelegram?: string;
  setContactTelegram?: (val: string) => void;
  contactNote?: string;
  setContactNote?: (val: string) => void;
  contactMessages?: ContactMessage[];
  setContactMessages?: React.Dispatch<React.SetStateAction<ContactMessage[]>>;
  siteVisitors?: number;
  setSiteVisitors?: (val: number) => void;
  uniqueVisitors?: number;
  setUniqueVisitors?: (val: number) => void;
  actualStreamWatches?: number;
  setActualStreamWatches?: (val: number) => void;
  useRealStats?: boolean;
  setUseRealStats?: (val: boolean) => void;
  skipAdV1Url?: string;
  setSkipAdV1Url?: (val: string) => void;
  skipAdGplinksUrl?: string;
  setSkipAdGplinksUrl?: (val: string) => void;
  skipAdCuty1Url?: string;
  setSkipAdCuty1Url?: (val: string) => void;
  skipAdCuty2Url?: string;
  setSkipAdCuty2Url?: (val: string) => void;
  skipAdCuty3Url?: string;
  setSkipAdCuty3Url?: (val: string) => void;
  onResetCatalogViews?: () => void;
  onResetData: () => void;
}


export const AdminPanel: React.FC<AdminPanelProps> = ({
  animeList,
  setAnimeList,
  siteNotice,
  setSiteNotice,
  noticeBanner,
  setNoticeBanner,
  homeTitle = 'Spring 2026 Lineup',
  setHomeTitle,
  homeSubtitle = '42 new titles debuting in Hindi, Tamil & Telugu',
  setHomeSubtitle,
  pollQuestion = 'Which Hindi Dubbed Arc are you most excited for?',
  setPollQuestion,
  pollOptions = 'Solo Leveling Season 2 vs Jujutsu Kaisen Culling Game',
  setPollOptions,
  featuredHeroId = '',
  setFeaturedHeroId,
  contactInstagram = 'https://instagram.com/animeyatra_official',
  setContactInstagram,
  contactEmail = 'support@animeyatra.in',
  setContactEmail,
  contactTelegram = 'https://t.me/animeyatra_official',
  setContactTelegram,
  contactNote = 'Have an anime request, broken server link report, or sponsorship inquiry? Reach out via Instagram, Email, or Telegram!',
  setContactNote,
  contactMessages = [],
  setContactMessages,
  siteVisitors = 0,
  setSiteVisitors,
  uniqueVisitors = 0,
  setUniqueVisitors,
  actualStreamWatches = 0,
  setActualStreamWatches,
  useRealStats = true,
  setUseRealStats,
  skipAdV1Url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  setSkipAdV1Url,
  skipAdGplinksUrl = 'https://gplinks.in',
  setSkipAdGplinksUrl,
  skipAdCuty1Url = 'https://cuty.io',
  setSkipAdCuty1Url,
  skipAdCuty2Url = 'https://cuty.io',
  setSkipAdCuty2Url,
  skipAdCuty3Url = 'https://cuty.io',
  setSkipAdCuty3Url,
  onResetCatalogViews,
  onResetData
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('animeyatra_admin_authed') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState(false);

  // Security Credentials & Roles (Owner vs Admin)
  const [adminPasscode, setAdminPasscode] = useState<string>(() => {
    return localStorage.getItem('animeyatra_admin_passcode') || 'admin36';
  });
  const [ownerPasscode, setOwnerPasscode] = useState<string>(() => {
    return localStorage.getItem('animeyatra_owner_passcode') || 'raj3636';
  });
  const [userRole, setUserRole] = useState<'owner' | 'admin' | null>(() => {
    const isAuthed = localStorage.getItem('animeyatra_admin_authed') === 'true';
    if (!isAuthed) return null;
    return (localStorage.getItem('animeyatra_user_role') as 'owner' | 'admin') || 'admin';
  });

  // Password Management Form States
  const [newAdminPass, setNewAdminPass] = useState('');
  const [confirmAdminPass, setConfirmAdminPass] = useState('');
  const [newOwnerPass, setNewOwnerPass] = useState('');
  const [confirmOwnerPass, setConfirmOwnerPass] = useState('');
  const [elevateKeyInput, setElevateKeyInput] = useState('');
  const [elevateError, setElevateError] = useState(false);

  // Active Admin Sub-Tab
  const [adminTab, setAdminTab] = useState<'overview' | 'anime-list' | 'episodes' | 'upload-video' | 'notices' | 'home-settings' | 'contact-settings' | 'skipad-settings' | 'security'>('overview');


  // Selected Anime for editing or episode editing
  const [selectedAnimeId, setSelectedAnimeId] = useState<string>(animeList[0]?.id || '');
  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState<number>(1);

  // Editing Anime Modal / State
  const [editingAnime, setEditingAnime] = useState<Anime | null>(null);
  const [isAddingNewAnime, setIsAddingNewAnime] = useState<boolean>(false);

  // Editing Episode Modal / State
  const [editingEpisode, setEditingEpisode] = useState<{ animeId: string; seasonNumber: number; episode: Episode } | null>(null);
  const [isAddingNewEpisode, setIsAddingNewEpisode] = useState<boolean>(false);

  // Deletion Confirmation States
  const [confirmDeleteAnimeId, setConfirmDeleteAnimeId] = useState<string | null>(null);
  const [confirmDeleteEpId, setConfirmDeleteEpId] = useState<string | null>(null);

  // Dedicated Video Upload State
  const [videoUploadFile, setVideoUploadFile] = useState<File | null>(null);
  const [videoUploadPreviewUrl, setVideoUploadPreviewUrl] = useState<string>('');
  const [videoUploadTitle, setVideoUploadTitle] = useState<string>('Episode 1: HD Premiere');
  const [videoUploadEpNum, setVideoUploadEpNum] = useState<number>(1);
  const [videoUploadServerLabel, setVideoUploadServerLabel] = useState<string>('Primary Local CDN [Uploaded]');
  const [videoUploadQuality, setVideoUploadQuality] = useState<'1080p' | '720p' | '480p'>('1080p');
  const [videoUploadProgress, setVideoUploadProgress] = useState<number>(0);
  const [isPublishingVideo, setIsPublishingVideo] = useState<boolean>(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Helper to convert Image file to Data URL
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetField: 'poster' | 'coverImage' | 'thumbnail') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (editingAnime) {
        if (targetField === 'poster') {
          setEditingAnime({ ...editingAnime, poster: result });
        } else if (targetField === 'coverImage') {
          setEditingAnime({ ...editingAnime, coverImage: result });
        }
      } else if (editingEpisode && targetField === 'thumbnail') {
        setEditingEpisode({
          ...editingEpisode,
          episode: { ...editingEpisode.episode, thumbnail: result }
        });
      }
      showToast('Image uploaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  // Helper for uploading video files directly in Stream Server editor
  const handleVideoFileForServer = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingEpisode) return;

    const fileUrl = URL.createObjectURL(file);
    const newServers = [...editingEpisode.episode.servers];
    newServers[index] = {
      ...newServers[index],
      url: fileUrl,
      type: 'Direct',
      name: `${file.name.substring(0, 18)} [Uploaded MP4]`,
      label: 'Local File Stream'
    };

    setEditingEpisode({
      ...editingEpisode,
      episode: {
        ...editingEpisode.episode,
        servers: newServers
      }
    });

    showToast(`Video file "${file.name}" uploaded successfully!`);
  };

  // Handler for selecting video file in dedicated Video Upload tab
  const handleSelectUploadVideoFile = (file: File) => {
    setVideoUploadFile(file);
    const objectUrl = URL.createObjectURL(file);
    setVideoUploadPreviewUrl(objectUrl);
    setVideoUploadTitle(file.name.replace(/\.[^/.]+$/, ""));
    showToast(`Loaded video file: ${file.name}`);
  };

  // Handler for publishing video in dedicated Video Upload tab
  const handlePublishUploadedVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUploadPreviewUrl && !videoUploadFile) {
      alert('Please select or drag a video file first!');
      return;
    }

    const targetAnime = animeList.find((a) => a.id === selectedAnimeId) || animeList[0];
    if (!targetAnime) {
      alert('Please select a target anime title!');
      return;
    }

    setIsPublishingVideo(true);
    setVideoUploadProgress(20);

    setTimeout(() => {
      setVideoUploadProgress(65);
    }, 600);

    setTimeout(() => {
      setVideoUploadProgress(100);

      const streamUrl = videoUploadPreviewUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      const newEpId = `${targetAnime.id}-s${selectedSeasonNumber}-ep${videoUploadEpNum}-${Date.now()}`;

      const newEpisode: Episode = {
        id: newEpId,
        episodeNumber: videoUploadEpNum,
        seasonNumber: selectedSeasonNumber,
        title: videoUploadTitle,
        duration: '24m',
        thumbnail: targetAnime.poster,
        airDate: new Date().toISOString().split('T')[0],
        commentsCount: 0,
        availableLanguages: ['Hindi', 'English', 'Hinglish'],
        servers: [
          {
            id: `srv-${Date.now()}`,
            name: videoUploadServerLabel,
            quality: videoUploadQuality,
            type: 'Direct',
            url: streamUrl,
            label: 'Uploaded Local MP4 Stream'
          },
          {
            id: `srv-ad-${Date.now()}`,
            name: 'Skip AD [Uploaded Mirror]',
            quality: '720p',
            type: 'AdServer',
            url: streamUrl,
            label: 'Fast Skip AD'
          }
        ]
      };

      setAnimeList((prev) =>
        prev.map((anime) => {
          if (anime.id !== targetAnime.id) return anime;

          const updatedSeasons = anime.seasons.map((season) => {
            if (season.seasonNumber !== selectedSeasonNumber) return season;
            const updatedEpisodes = [...season.episodes, newEpisode];
            return {
              ...season,
              episodesCount: updatedEpisodes.length,
              episodes: updatedEpisodes
            };
          });

          return { ...anime, seasons: updatedSeasons };
        })
      );

      setIsPublishingVideo(false);
      setVideoUploadProgress(0);
      setVideoUploadFile(null);
      setVideoUploadPreviewUrl('');
      showToast(`Published Video Episode ${videoUploadEpNum} to "${targetAnime.title}"!`);
      setAdminTab('episodes');
    }, 1400);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const inputCode = passcode.trim();

    if (inputCode === ownerPasscode || inputCode === 'raj3636') {
      setIsAuthenticated(true);
      setUserRole('owner');
      localStorage.setItem('animeyatra_admin_authed', 'true');
      localStorage.setItem('animeyatra_user_role', 'owner');
      setPassError(false);
      showToast('👑 Owner Access Granted! Welcome Owner.');
    } else if (inputCode === adminPasscode || inputCode === 'admin36') {
      setIsAuthenticated(true);
      setUserRole('admin');
      localStorage.setItem('animeyatra_admin_authed', 'true');
      localStorage.setItem('animeyatra_user_role', 'admin');
      setPassError(false);
      showToast('🛡️ Admin Access Granted! Welcome Admin.');
    } else {
      setPassError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('animeyatra_admin_authed');
    localStorage.removeItem('animeyatra_user_role');
    showToast('Logged out of Management Panel');
  };

  // Owner Handler to Change Admin Password
  const handleChangeAdminPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRole !== 'owner') {
      alert('🔒 Access Denied: Only the Owner can change the admin login password!');
      return;
    }
    if (!newAdminPass.trim()) {
      alert('Please enter a valid new admin password.');
      return;
    }
    if (newAdminPass !== confirmAdminPass) {
      alert('New Admin Passwords do not match!');
      return;
    }

    const updated = newAdminPass.trim();
    setAdminPasscode(updated);
    localStorage.setItem('animeyatra_admin_passcode', updated);
    setNewAdminPass('');
    setConfirmAdminPass('');
    showToast('🔑 Admin password updated successfully!');
  };

  // Owner Handler to Change Owner Key
  const handleChangeOwnerPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRole !== 'owner') {
      alert('🔒 Access Denied: Only the Owner can change the owner key!');
      return;
    }
    if (!newOwnerPass.trim()) {
      alert('Please enter a valid new owner key.');
      return;
    }
    if (newOwnerPass !== confirmOwnerPass) {
      alert('New Owner Keys do not match!');
      return;
    }

    const updated = newOwnerPass.trim();
    setOwnerPasscode(updated);
    localStorage.setItem('animeyatra_owner_passcode', updated);
    setNewOwnerPass('');
    setConfirmOwnerPass('');
    showToast('👑 Owner key updated successfully!');
  };

  // Admin Handler to Elevate to Owner
  const handleElevateToOwner = (e: React.FormEvent) => {
    e.preventDefault();
    const input = elevateKeyInput.trim();
    if (input === ownerPasscode || input === 'raj3636') {
      setUserRole('owner');
      localStorage.setItem('animeyatra_user_role', 'owner');
      setElevateKeyInput('');
      setElevateError(false);
      showToast('👑 Session elevated to Owner mode! Security settings unlocked.');
    } else {
      setElevateError(true);
    }
  };

  // Reset Credentials
  const handleResetPasscodes = () => {
    if (userRole !== 'owner') {
      alert('🔒 Access Denied: Only the Owner can reset security passcodes.');
      return;
    }
    setAdminPasscode('admin36');
    setOwnerPasscode('raj3636');
    localStorage.setItem('animeyatra_admin_passcode', 'admin36');
    localStorage.setItem('animeyatra_owner_passcode', 'raj3636');
    showToast('Security passcodes reset to default credentials.');
  };

  const activeAnime = animeList.find((a) => a.id === selectedAnimeId) || animeList[0];
  const activeSeason = activeAnime?.seasons.find((s) => s.seasonNumber === selectedSeasonNumber) || activeAnime?.seasons[0];

  // Helper to save edited anime or new anime
  const handleSaveAnime = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnime) return;

    if (isAddingNewAnime) {
      setAnimeList((prev) => [editingAnime, ...prev]);
      showToast(`New Anime "${editingAnime.title}" created successfully!`);
    } else {
      setAnimeList((prev) => prev.map((item) => (item.id === editingAnime.id ? editingAnime : item)));
      showToast(`Anime "${editingAnime.title}" updated successfully!`);
    }

    setEditingAnime(null);
    setIsAddingNewAnime(false);
  };

  // Delete Anime
  const handleDeleteAnime = (animeId: string, title: string) => {
    if (confirmDeleteAnimeId === animeId) {
      setAnimeList((prev) => {
        const nextList = prev.filter((a) => a.id !== animeId);
        try {
          localStorage.setItem('animeyatra_anime_data', JSON.stringify(nextList));
        } catch (e) {
          console.error(e);
        }
        return nextList;
      });
      if (selectedAnimeId === animeId) {
        setSelectedAnimeId('');
      }
      if (editingAnime?.id === animeId) {
        setEditingAnime(null);
      }
      setConfirmDeleteAnimeId(null);
      showToast(`Deleted anime "${title}"`);
    } else {
      setConfirmDeleteAnimeId(animeId);
      setTimeout(() => setConfirmDeleteAnimeId(null), 4000);
    }
  };

  // Initialize blank Anime
  const handleInitNewAnime = () => {
    const newId = `anime-${Date.now()}`;
    const newAnime: Anime = {
      id: newId,
      title: 'New Anime Title',
      englishTitle: 'New Anime English',
      japaneseTitle: '新しいアニメ',
      slug: newId,
      poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
      coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop&q=80',
      rating: 8.5,
      totalVotes: 100,
      synopsis: 'Enter synopsis for the new anime title here...',
      genres: ['Action', 'Fantasy'],
      format: 'TV',
      status: 'Ongoing',
      releaseYear: 2026,
      studio: 'Mappa',
      dubLanguages: ['Hindi', 'English'],
      subLanguages: ['English', 'Hindi'],
      totalEpisodes: 12,
      views: 1200,
      isTrending: true,
      isHindiDubbed: true,
      cast: [
        {
          id: 'c1',
          name: 'Main VA',
          characterName: 'Protagonist',
          role: 'Main',
          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
          language: 'Hindi'
        }
      ],
      reviews: [],
      externalLinks: {
        myAnimeList: 'https://myanimelist.net',
        aniList: 'https://anilist.co',
        theMovieDB: 'https://themoviedb.org',
        aniTally: 'https://anitally.com'
      },
      seasons: [
        {
          seasonNumber: 1,
          title: 'Season 1',
          episodesCount: 1,
          episodes: [
            {
              id: `${newId}-s1-ep1`,
              episodeNumber: 1,
              seasonNumber: 1,
              title: 'Episode 1: The Beginning',
              duration: '24m',
              thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
              airDate: '2026-01-01',
              commentsCount: 0,
              availableLanguages: ['Hindi', 'English'],
              servers: [
                {
                  id: 'srv-1',
                  name: 'Server 1 [Primary CDN]',
                  quality: '1080p',
                  type: 'Direct',
                  url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                  label: 'Fast CDN 1080p'
                },
                {
                  id: 'srv-2',
                  name: 'Skip AD [v1]',
                  quality: '720p',
                  type: 'AdServer',
                  url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                  label: 'Fast Skip AD Server'
                }
              ]
            }
          ]
        }
      ]
    };

    setEditingAnime(newAnime);
    setIsAddingNewAnime(true);
  };

  // Episode Editing logic
  const handleSaveEpisode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEpisode) return;

    const { animeId, seasonNumber, episode } = editingEpisode;

    setAnimeList((prev) =>
      prev.map((anime) => {
        if (anime.id !== animeId) return anime;

        const updatedSeasons = anime.seasons.map((season) => {
          if (season.seasonNumber !== seasonNumber) return season;

          const episodeExists = season.episodes.some((e) => e.id === episode.id);
          let updatedEpisodes: Episode[];

          if (episodeExists) {
            updatedEpisodes = season.episodes.map((e) => (e.id === episode.id ? episode : e));
          } else {
            updatedEpisodes = [...season.episodes, episode];
          }

          return {
            ...season,
            episodesCount: updatedEpisodes.length,
            episodes: updatedEpisodes
          };
        });

        return {
          ...anime,
          seasons: updatedSeasons
        };
      })
    );

    showToast(`Episode ${episode.episodeNumber} saved!`);
    setEditingEpisode(null);
    setIsAddingNewEpisode(false);
  };

  const handleDeleteEpisode = (animeId: string, seasonNumber: number, episodeId: string, episodeNum: number) => {
    if (confirmDeleteEpId === episodeId) {
      setAnimeList((prev) => {
        const nextList = prev.map((anime) => {
          if (anime.id !== animeId) return anime;

          const updatedSeasons = anime.seasons.map((season) => {
            if (season.seasonNumber !== seasonNumber) return season;
            const updatedEpisodes = season.episodes.filter((e) => e.id !== episodeId);
            return {
              ...season,
              episodesCount: updatedEpisodes.length,
              episodes: updatedEpisodes
            };
          });

          return { ...anime, seasons: updatedSeasons };
        });

        try {
          localStorage.setItem('animeyatra_anime_data', JSON.stringify(nextList));
        } catch (e) {
          console.error(e);
        }
        return nextList;
      });

      if (editingEpisode?.episode.id === episodeId) {
        setEditingEpisode(null);
      }
      setConfirmDeleteEpId(null);
      showToast(`Deleted Episode ${episodeNum}`);
    } else {
      setConfirmDeleteEpId(episodeId);
      setTimeout(() => setConfirmDeleteEpId(null), 4000);
    }
  };

  // Add blank server to episode being edited
  const handleAddServerToEpisode = () => {
    if (!editingEpisode) return;
    const newServer: StreamServer = {
      id: `srv-${Date.now()}`,
      name: `Server ${editingEpisode.episode.servers.length + 1} [CDN]`,
      quality: '1080p',
      type: 'Direct',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      label: 'HD Stream'
    };

    setEditingEpisode({
      ...editingEpisode,
      episode: {
        ...editingEpisode.episode,
        servers: [...editingEpisode.episode.servers, newServer]
      }
    });
  };

  // Helper to get and set episode level Skip AD links for modal
  const getEpSkipAdUrl = (labelFilter: string, defaultVal: string) => {
    if (!editingEpisode) return defaultVal;
    const found = editingEpisode.episode.servers.find(
      (s) => s.label?.toLowerCase().includes(labelFilter.toLowerCase()) || s.name?.toLowerCase().includes(labelFilter.toLowerCase())
    );
    return found ? found.url : defaultVal;
  };

  const updateEpSkipAdUrl = (labelFilter: string, displayLabel: string, newUrl: string) => {
    if (!editingEpisode) return;
    const existingIdx = editingEpisode.episode.servers.findIndex(
      (s) => s.label?.toLowerCase().includes(labelFilter.toLowerCase()) || s.name?.toLowerCase().includes(labelFilter.toLowerCase())
    );
    
    let newServers = [...editingEpisode.episode.servers];
    if (existingIdx >= 0) {
      newServers[existingIdx] = {
        ...newServers[existingIdx],
        url: newUrl,
        label: displayLabel
      };
    } else {
      newServers.push({
        id: `srv-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        name: displayLabel,
        quality: '1080p',
        type: 'AdServer',
        url: newUrl,
        label: displayLabel
      });
    }

    setEditingEpisode({
      ...editingEpisode,
      episode: {
        ...editingEpisode.episode,
        servers: newServers
      }
    });
  };

  const handleUpdateServerInEpisode = (index: number, updatedServer: StreamServer) => {
    if (!editingEpisode) return;
    const newServers = [...editingEpisode.episode.servers];
    newServers[index] = updatedServer;
    setEditingEpisode({
      ...editingEpisode,
      episode: {
        ...editingEpisode.episode,
        servers: newServers
      }
    });
  };

  const handleRemoveServerFromEpisode = (index: number) => {
    if (!editingEpisode) return;
    const newServers = editingEpisode.episode.servers.filter((_, i) => i !== index);
    setEditingEpisode({
      ...editingEpisode,
      episode: {
        ...editingEpisode.episode,
        servers: newServers
      }
    });
  };

  // Render Login view if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl space-y-6 text-zinc-100 animate-fadeIn">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-amber-500 rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg shadow-violet-600/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">AnimeYatra Control Login</h2>
          <p className="text-xs text-zinc-400">
            Enter Admin Passcode or Owner Key to unlock site management.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
              Passcode or Owner Key
            </label>
            <input
              type="password"
              placeholder="Enter passcode or owner key"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition"
            />
            {passError && (
              <p className="text-xs text-red-400 font-medium mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Invalid passcode or owner key. Please try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs py-3 rounded-full transition shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>Unlock Control Center</span>
          </button>
        </form>
      </div>
    );
  }

  // Calculate statistics
  const totalAnime = animeList.length;
  const totalEpisodes = animeList.reduce((acc, a) => acc + a.seasons.reduce((sAcc, s) => sAcc + s.episodes.length, 0), 0);
  const totalViews = animeList.reduce((acc, a) => acc + a.views, 0);
  const hindiCount = animeList.filter((a) => a.isHindiDubbed).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-violet-600 text-white px-5 py-3 rounded-2xl shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Header Bar - Bento Style */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black italic shadow-lg ${
            userRole === 'owner' ? 'bg-amber-500 shadow-amber-500/30' : 'bg-violet-600 shadow-violet-600/30'
          }`}>
            {userRole === 'owner' ? 'OWN' : 'ADM'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">AnimeYatra Control Center</h1>
              
              {userRole === 'owner' ? (
                <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-amber-500/40 uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <Crown className="w-3 h-3 text-amber-400" />
                  Owner Access
                </span>
              ) : (
                <span className="bg-violet-500/20 text-violet-300 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-violet-500/30 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-violet-400" />
                  Admin Role
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              {userRole === 'owner'
                ? 'Full Root Access: Manage content, change admin password, update owner keys.'
                : 'Content Manager Access: Manage anime catalog, episodes, streams, and notices.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {userRole === 'admin' && (
            <button
              onClick={() => setAdminTab('security')}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold px-3 py-2 rounded-full border border-amber-500/30 transition flex items-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Owner Security</span>
            </button>
          )}

          <button
            onClick={onResetData}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-bold px-4 py-2 rounded-full border border-zinc-700 transition flex items-center gap-1.5"
            title="Reset site data to initial state"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600/20 hover:bg-red-600/30 text-red-400 text-xs font-bold px-4 py-2 rounded-full border border-red-500/30 transition flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setAdminTab('overview')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'overview'
              ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
              : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Dashboard Overview
        </button>
        <button
          onClick={() => setAdminTab('anime-list')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'anime-list'
              ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
              : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
          }`}
        >
          <Tv className="w-3.5 h-3.5" />
          Manage Anime ({totalAnime})
        </button>
        <button
          onClick={() => setAdminTab('episodes')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'episodes'
              ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
              : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          Episodes & Streams ({totalEpisodes})
        </button>
        <button
          onClick={() => setAdminTab('upload-video')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'upload-video'
              ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
              : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
          }`}
        >
          <UploadCloud className="w-3.5 h-3.5 text-pink-400" />
          <span>Upload Video File</span>
        </button>
        <button
          onClick={() => setAdminTab('home-settings')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'home-settings'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-extrabold'
              : 'bg-zinc-900 text-zinc-300 border border-emerald-500/30 hover:bg-emerald-500/10'
          }`}
        >
          <Home className="w-3.5 h-3.5 text-emerald-400" />
          <span>Edit Initial Page</span>
        </button>
        <button
          onClick={() => setAdminTab('contact-settings')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'contact-settings'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30 font-extrabold'
              : 'bg-zinc-900 text-zinc-300 border border-sky-500/30 hover:bg-sky-500/10'
          }`}
        >
          <Mail className="w-3.5 h-3.5 text-sky-400" />
          <span>Contact & Messages</span>
          {contactMessages.length > 0 && (
            <span className="bg-sky-400 text-zinc-950 text-[10px] px-1.5 py-0.2 rounded-full font-black">
              {contactMessages.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('skipad-settings')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2 whitespace-nowrap border ${
            adminTab === 'skipad-settings'
              ? 'bg-purple-600 text-white border-purple-400 font-extrabold shadow-md shadow-purple-600/30'
              : 'bg-zinc-900 text-purple-300 border-purple-500/30 hover:bg-purple-500/10'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5 text-purple-400" />
          <span>⚡ Skip AD Links (GPLinks / Cuty)</span>
        </button>

        <button
          onClick={() => setAdminTab('notices')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'notices'
              ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
              : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Banners & Notices
        </button>
        <button
          onClick={() => setAdminTab('security')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2 whitespace-nowrap border ${
            adminTab === 'security'
              ? 'bg-amber-500 text-zinc-950 border-amber-400 font-extrabold shadow-md shadow-amber-500/20'
              : 'bg-zinc-900 text-amber-300 border-amber-500/30 hover:bg-amber-500/10'
          }`}
        >
          <Key className="w-3.5 h-3.5 text-amber-400" />
          <span>Security & Passwords</span>
          {userRole === 'owner' && (
            <Crown className="w-3 h-3 text-amber-400 ml-0.5" />
          )}
        </button>
      </div>

      {/* TAB 1: OVERVIEW BENTO STATS */}
      {adminTab === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-1">
              <div className="flex items-center justify-between text-zinc-400 text-xs font-bold">
                <span>Total Anime Titles</span>
                <Tv className="w-4 h-4 text-violet-400" />
              </div>
              <p className="text-2xl font-black text-white">{totalAnime}</p>
              <p className="text-[10px] text-violet-400 font-mono">Catalog Count</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-1">
              <div className="flex items-center justify-between text-zinc-400 text-xs font-bold">
                <span>Total Stream Episodes</span>
                <Video className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="text-2xl font-black text-white">{totalEpisodes}</p>
              <p className="text-[10px] text-indigo-400 font-mono">Ready to Stream</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-1">
              <div className="flex items-center justify-between text-zinc-400 text-xs font-bold">
                <span>Website Visitors</span>
                <Users className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-black text-white">{siteVisitors.toLocaleString()}</p>
              <p className="text-[10px] text-emerald-400 font-mono">{uniqueVisitors.toLocaleString()} Unique Sessions</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-1">
              <div className="flex items-center justify-between text-zinc-400 text-xs font-bold">
                <span>Total Streaming Views</span>
                <Eye className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-black text-white">
                {useRealStats
                  ? (actualStreamWatches >= 1000000 ? `${(actualStreamWatches / 1000000).toFixed(2)}M` : actualStreamWatches.toLocaleString())
                  : (totalViews >= 1000000 ? `${(totalViews / 1000000).toFixed(2)}M` : totalViews.toLocaleString())}
              </p>
              <p className="text-[10px] text-amber-400 font-mono">
                {useRealStats ? 'Real Website Episode Plays' : 'Catalog Views Cumulative'}
              </p>
            </div>
          </div>

          {/* Real Website Watching & Visitor Analytics Control Panel */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">Website Visitor & Stream Watching Real Analytics</h3>
                </div>
                <p className="text-xs text-zinc-400">
                  Track actual people visiting and watching anime episodes on your website in real-time.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer bg-zinc-950 border border-zinc-800 px-3.5 py-1.5 rounded-full text-xs font-bold text-zinc-300">
                  <input
                    type="checkbox"
                    checked={useRealStats}
                    onChange={(e) => setUseRealStats && setUseRealStats(e.target.checked)}
                    className="accent-violet-600 w-4 h-4 rounded"
                  />
                  <span>Show Real Site Stats on Dashboard Overview</span>
                </label>
              </div>
            </div>

            {/* Detailed Real Traffic Stats Bento Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-zinc-400 text-xs font-bold">
                  <span>Site Visits & Traffic</span>
                  <Activity className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-white">{siteVisitors.toLocaleString()}</p>
                  <p className="text-[11px] text-zinc-400">{uniqueVisitors.toLocaleString()} unique visitor sessions</p>
                </div>
                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="number"
                    value={siteVisitors}
                    onChange={(e) => setSiteVisitors && setSiteVisitors(parseInt(e.target.value) || 0)}
                    className="w-24 bg-zinc-900 border border-zinc-800 text-xs text-white px-2 py-1 rounded-lg focus:outline-none focus:border-sky-500"
                    placeholder="Visits"
                  />
                  <span className="text-[10px] text-zinc-500">Edit Visits</span>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-zinc-400 text-xs font-bold">
                  <span>Real Episode Plays Watched</span>
                  <Play className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-white">{actualStreamWatches.toLocaleString()}</p>
                  <p className="text-[11px] text-zinc-400">Episode watch events triggered by users</p>
                </div>
                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="number"
                    value={actualStreamWatches}
                    onChange={(e) => setActualStreamWatches && setActualStreamWatches(parseInt(e.target.value) || 0)}
                    className="w-24 bg-zinc-900 border border-zinc-800 text-xs text-white px-2 py-1 rounded-lg focus:outline-none focus:border-emerald-500"
                    placeholder="Watches"
                  />
                  <span className="text-[10px] text-zinc-500">Edit Watches</span>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-4 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-zinc-400 text-xs font-bold">
                    <span>Sample Catalog Count</span>
                    <Tv className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-xl font-extrabold text-white">{(totalViews / 1000000).toFixed(2)}M</p>
                  <p className="text-[11px] text-zinc-400">Sum of initial sample anime views</p>
                </div>
                {onResetCatalogViews && (
                  <button
                    onClick={() => {
                      if (window.confirm('Reset sample anime views (8.88M) to 0 so catalog views match actual user watches?')) {
                        onResetCatalogViews();
                        showToast('Sample catalog view counts reset to 0.');
                      }
                    }}
                    className="w-full mt-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold py-1.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Clear 8.88M Sample Views</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions Bento Box */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Settings className="w-4 h-4 text-violet-400" />
              <span>Quick Administrator Actions</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => {
                  handleInitNewAnime();
                  setAdminTab('anime-list');
                }}
                className="bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-violet-500 rounded-2xl p-4 text-left transition space-y-2 group"
              >
                <div className="w-8 h-8 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Add New Anime</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Publish new TV series or Movie entry</p>
                </div>
              </button>

              <button
                onClick={() => setAdminTab('episodes')}
                className="bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-violet-500 rounded-2xl p-4 text-left transition space-y-2 group"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Add/Edit Stream Links</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Update CDN URLs & Skip AD options</p>
                </div>
              </button>

              <button
                onClick={() => setAdminTab('notices')}
                className="bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-violet-500 rounded-2xl p-4 text-left transition space-y-2 group"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Edit Announcement Banners</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Customize site headers & notice alerts</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANAGE ANIME CATALOG */}
      {adminTab === 'anime-list' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Tv className="w-4 h-4 text-violet-400" />
                <span>Anime Catalog Directory ({animeList.length})</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">Add, edit, or remove anime titles from the platform.</p>
            </div>

            <button
              onClick={handleInitNewAnime}
              className="bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs px-4 py-2 rounded-full transition shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add New Anime</span>
            </button>
          </div>

          {/* Anime Table Bento Box */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-950 text-zinc-400 text-[11px] uppercase tracking-wider font-bold border-b border-zinc-800">
                    <th className="p-4">Poster / Title</th>
                    <th className="p-4">Format</th>
                    <th className="p-4">Dub Languages</th>
                    <th className="p-4">Rating / Views</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-xs">
                  {animeList.map((anime) => (
                    <tr key={anime.id} className="hover:bg-zinc-850/60 transition">
                      <td className="p-4 flex items-center gap-3">
                        <img src={anime.poster} alt={anime.title} className="w-10 h-14 object-cover rounded-xl shrink-0" />
                        <div className="min-w-0">
                          <p className="font-bold text-white truncate">{anime.title}</p>
                          <p className="text-[11px] text-zinc-400 truncate">{anime.genres.join(', ')}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-full text-[11px] font-bold">
                          {anime.format}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {anime.dubLanguages.map((lang) => (
                            <span key={lang} className="bg-violet-950 text-violet-300 border border-violet-800/60 px-2 py-0.5 rounded-full text-[10px] font-bold">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 font-mono text-zinc-300">
                        ⭐ {anime.rating} • {(anime.views / 1000).toFixed(1)}k views
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingAnime(anime);
                            setIsAddingNewAnime(false);
                          }}
                          className="bg-zinc-800 hover:bg-violet-600 text-zinc-300 hover:text-white px-3 py-1.5 rounded-full font-bold text-xs transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAnime(anime.id, anime.title)}
                          className={`px-3 py-1.5 rounded-full font-bold text-xs transition border ${
                            confirmDeleteAnimeId === anime.id
                              ? 'bg-red-600 text-white border-red-500 animate-pulse'
                              : 'bg-red-950/60 hover:bg-red-600 text-red-300 hover:text-white border-red-800/60'
                          }`}
                        >
                          {confirmDeleteAnimeId === anime.id ? 'Confirm Delete?' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* EDIT/ADD ANIME MODAL */}
      {editingAnime && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md overflow-y-auto flex justify-center p-4">
          <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 my-auto text-zinc-100 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-violet-400" />
                <span>{isAddingNewAnime ? 'Add New Anime' : `Edit: ${editingAnime.title}`}</span>
              </h3>
              <button
                onClick={() => setEditingAnime(null)}
                className="p-1.5 rounded-full bg-zinc-950 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAnime} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editingAnime.title}
                    onChange={(e) => setEditingAnime({ ...editingAnime, title: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-2 text-zinc-100"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Japanese Title</label>
                  <input
                    type="text"
                    value={editingAnime.japaneseTitle || ''}
                    onChange={(e) => setEditingAnime({ ...editingAnime, japaneseTitle: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-2 text-zinc-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-zinc-300">Poster Image URL</label>
                    <label className="cursor-pointer text-[10px] text-violet-400 font-bold hover:underline flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      <span>Upload File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageFileUpload(e, 'poster')}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={editingAnime.poster}
                    onChange={(e) => setEditingAnime({ ...editingAnime, poster: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-2 text-zinc-100"
                    placeholder="https://... or upload local image file"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-zinc-300">Cover Image URL</label>
                    <label className="cursor-pointer text-[10px] text-violet-400 font-bold hover:underline flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      <span>Upload File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageFileUpload(e, 'coverImage')}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={editingAnime.coverImage}
                    onChange={(e) => setEditingAnime({ ...editingAnime, coverImage: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-2 text-zinc-100"
                    placeholder="https://... or upload local image file"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Format</label>
                  <select
                    value={editingAnime.format}
                    onChange={(e) => setEditingAnime({ ...editingAnime, format: e.target.value as AnimeFormat })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-2 text-zinc-100"
                  >
                    <option value="TV">TV</option>
                    <option value="Movie">Movie</option>
                    <option value="OVA">OVA</option>
                    <option value="Special">Special</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={editingAnime.rating}
                    onChange={(e) => setEditingAnime({ ...editingAnime, rating: parseFloat(e.target.value) })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-2 text-zinc-100"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Status</label>
                  <select
                    value={editingAnime.status}
                    onChange={(e) => setEditingAnime({ ...editingAnime, status: e.target.value as any })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-2 text-zinc-100"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-300 mb-1">Synopsis</label>
                <textarea
                  rows={3}
                  value={editingAnime.synopsis}
                  onChange={(e) => setEditingAnime({ ...editingAnime, synopsis: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-3 text-zinc-100"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                {!isAddingNewAnime ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteAnime(editingAnime.id, editingAnime.title)}
                    className={`px-4 py-2 rounded-full font-bold transition border ${
                      confirmDeleteAnimeId === editingAnime.id
                        ? 'bg-red-600 text-white border-red-500 animate-pulse'
                        : 'bg-red-950/60 hover:bg-red-600 text-red-300 hover:text-white border-red-800/60'
                    }`}
                  >
                    {confirmDeleteAnimeId === editingAnime.id ? 'Confirm Delete Anime?' : 'Delete Anime'}
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingAnime(null)}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold px-4 py-2 rounded-full"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-5 py-2 rounded-full shadow-md flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Anime</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: EPISODES & STREAM LINKS MANAGER */}
      {adminTab === 'episodes' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Video className="w-4 h-4 text-violet-400" />
              <span>Select Anime & Season to Manage Stream Links</span>
            </h3>

            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={selectedAnimeId}
                onChange={(e) => {
                  setSelectedAnimeId(e.target.value);
                  setSelectedSeasonNumber(1);
                }}
                className="bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2 text-xs text-white font-bold flex-1"
              >
                {animeList.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.title} ({a.format})
                  </option>
                ))}
              </select>

              {activeAnime && (
                <select
                  value={selectedSeasonNumber}
                  onChange={(e) => setSelectedSeasonNumber(Number(e.target.value))}
                  className="bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2 text-xs text-white font-bold"
                >
                  {activeAnime.seasons.map((s) => (
                    <option key={s.seasonNumber} value={s.seasonNumber}>
                      Season {s.seasonNumber} ({s.episodes.length} Episodes)
                    </option>
                  ))}
                </select>
              )}

              {activeAnime && (
                <button
                  onClick={() => {
                    const nextEpNum = (activeSeason?.episodes.length || 0) + 1;
                    const newEp: Episode = {
                      id: `${activeAnime.id}-s${selectedSeasonNumber}-ep${nextEpNum}`,
                      episodeNumber: nextEpNum,
                      seasonNumber: selectedSeasonNumber,
                      title: `Episode ${nextEpNum}`,
                      duration: '24m',
                      thumbnail: activeAnime.poster,
                      airDate: new Date().toISOString().split('T')[0],
                      commentsCount: 0,
                      availableLanguages: ['Hindi', 'Hinglish', 'English'],
                      servers: [
                        {
                          id: 'srv-1',
                          name: 'Server 1 [Primary CDN]',
                          quality: '1080p',
                          type: 'Direct',
                          url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                          label: 'Fast CDN 1080p'
                        },
                        {
                          id: 'srv-2',
                          name: 'Skip AD [v1]',
                          quality: '720p',
                          type: 'AdServer',
                          url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                          label: 'Skip AD Server'
                        }
                      ]
                    };
                    setEditingEpisode({ animeId: activeAnime.id, seasonNumber: selectedSeasonNumber, episode: newEp });
                    setIsAddingNewEpisode(true);
                  }}
                  className="bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 shadow-md shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add New Episode</span>
                </button>
              )}
            </div>
          </div>

          {/* Episode List Box */}
          {activeSeason && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Season {activeSeason.seasonNumber} Episode Stream Servers ({activeSeason.episodes.length})
              </h4>

              <div className="grid grid-cols-1 gap-3">
                {activeSeason.episodes.map((ep) => (
                  <div
                    key={ep.id}
                    className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img src={ep.thumbnail} alt={ep.title} className="w-16 h-12 object-cover rounded-xl shrink-0" />
                      <div>
                        <h5 className="text-xs font-bold text-white">
                          EP {ep.episodeNumber}: {ep.title}
                        </h5>
                        <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                          {ep.servers.length} Stream Servers Configured ({ep.servers.map((s) => s.name).join(', ')})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingEpisode({ animeId: activeAnime.id, seasonNumber: selectedSeasonNumber, episode: ep });
                          setIsAddingNewEpisode(false);
                        }}
                        className="bg-zinc-800 hover:bg-violet-600 text-zinc-300 hover:text-white px-4 py-1.5 rounded-full text-xs font-bold transition"
                      >
                        Edit Servers & Details
                      </button>
                      <button
                        onClick={() => handleDeleteEpisode(activeAnime.id, selectedSeasonNumber, ep.id, ep.episodeNumber)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition border ${
                          confirmDeleteEpId === ep.id
                            ? 'bg-red-600 text-white border-red-500 animate-pulse'
                            : 'bg-red-950/60 hover:bg-red-600 text-red-300 hover:text-white border-red-800/60'
                        }`}
                      >
                        {confirmDeleteEpId === ep.id ? 'Confirm Delete?' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* EDIT EPISODE & SERVERS MODAL */}
      {editingEpisode && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md overflow-y-auto flex justify-center p-4">
          <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 my-auto text-zinc-100 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-violet-400" />
                <span>
                  {isAddingNewEpisode ? 'Add New Episode' : `Edit Episode ${editingEpisode.episode.episodeNumber}: ${editingEpisode.episode.title}`}
                </span>
              </h3>
              <button
                onClick={() => setEditingEpisode(null)}
                className="p-1.5 rounded-full bg-zinc-950 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEpisode} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Episode Number</label>
                  <input
                    type="number"
                    value={editingEpisode.episode.episodeNumber}
                    onChange={(e) =>
                      setEditingEpisode({
                        ...editingEpisode,
                        episode: { ...editingEpisode.episode, episodeNumber: Number(e.target.value) }
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-2 text-zinc-100"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block font-bold text-zinc-300 mb-1">Episode Title</label>
                  <input
                    type="text"
                    value={editingEpisode.episode.title}
                    onChange={(e) =>
                      setEditingEpisode({
                        ...editingEpisode,
                        episode: { ...editingEpisode.episode, title: e.target.value }
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-2 text-zinc-100"
                  />
                </div>
              </div>

              {/* Quick Edit Skip AD Shortener Links Card */}
              <div className="bg-purple-950/30 border border-purple-800/40 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5 text-purple-400" />
                    <span>⚡ Quick Edit Skip AD Shortener Links (GPLinks, Cuty, etc.)</span>
                  </h5>
                  <span className="text-[10px] text-purple-400 font-mono">Syncs with Episode Player Buttons</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-purple-300 font-bold mb-1">
                      💜 Skip AD [v1] and Enjoy Link (Main Video / Shortener URL)
                    </label>
                    <input
                      type="text"
                      value={getEpSkipAdUrl('v1', skipAdV1Url)}
                      onChange={(e) => updateEpSkipAdUrl('v1', 'Skip AD [v1] and Enjoy', e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-zinc-950 border border-purple-900/60 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-zinc-300 font-bold mb-1">
                      🔗 Skip AD v2 (GPLinks) Link
                    </label>
                    <input
                      type="text"
                      value={getEpSkipAdUrl('gplinks', skipAdGplinksUrl)}
                      onChange={(e) => updateEpSkipAdUrl('gplinks', 'Skip AD v2 (GPLinks)', e.target.value)}
                      placeholder="https://gplinks.in/..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-zinc-300 font-bold mb-1">
                      🔗 Skip AD [v3] (Cuty Try 1) Link
                    </label>
                    <input
                      type="text"
                      value={getEpSkipAdUrl('try 1', skipAdCuty1Url)}
                      onChange={(e) => updateEpSkipAdUrl('try 1', 'Skip AD [v3] (Cuty Try 1)', e.target.value)}
                      placeholder="https://cuty.io/..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-zinc-300 font-bold mb-1">
                      🔗 Skip AD [v3] (Cuty Try 2) Link
                    </label>
                    <input
                      type="text"
                      value={getEpSkipAdUrl('try 2', skipAdCuty2Url)}
                      onChange={(e) => updateEpSkipAdUrl('try 2', 'Skip AD [v3] (Cuty Try 2)', e.target.value)}
                      placeholder="https://cuty.io/..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-zinc-300 font-bold mb-1">
                      🔗 Skip AD [v3] (Cuty Try 3) Link
                    </label>
                    <input
                      type="text"
                      value={getEpSkipAdUrl('try 3', skipAdCuty3Url)}
                      onChange={(e) => updateEpSkipAdUrl('try 3', 'Skip AD [v3] (Cuty Try 3)', e.target.value)}
                      placeholder="https://cuty.io/..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Streaming Links / Servers Editor */}
              <div className="space-y-3 pt-2 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5" />
                    Configure Stream Servers & Skip AD Links
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddServerToEpisode}
                    className="bg-zinc-800 hover:bg-violet-600 text-zinc-200 hover:text-white px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    + Add Server
                  </button>
                </div>

                <div className="space-y-2">
                  {editingEpisode.episode.servers.map((server, sIdx) => (
                    <div key={server.id || sIdx} className="bg-zinc-950 border border-zinc-800 p-3 rounded-2xl space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                        <div>
                          <label className="block text-[10px] text-zinc-400 font-bold mb-0.5">Server Label</label>
                          <input
                            type="text"
                            value={server.name}
                            onChange={(e) =>
                              handleUpdateServerInEpisode(sIdx, { ...server, name: e.target.value })
                            }
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-2.5 py-1 text-zinc-100 font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-zinc-400 font-bold mb-0.5">Quality</label>
                          <select
                            value={server.quality}
                            onChange={(e) =>
                              handleUpdateServerInEpisode(sIdx, { ...server, quality: e.target.value as any })
                            }
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-2 py-1 text-zinc-100"
                          >
                            <option value="1080p">1080p HD</option>
                            <option value="720p">720p HD</option>
                            <option value="480p">480p</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] text-zinc-400 font-bold mb-0.5">Server Type</label>
                          <select
                            value={server.type}
                            onChange={(e) =>
                              handleUpdateServerInEpisode(sIdx, { ...server, type: e.target.value as any })
                            }
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-2 py-1 text-zinc-100"
                          >
                            <option value="Direct">Direct Video CDN</option>
                            <option value="AdServer">Skip AD Link</option>
                            <option value="Embed">iFrame Embed</option>
                          </select>
                        </div>
                        <div className="flex items-end justify-end">
                          <button
                            type="button"
                            onClick={() => handleRemoveServerFromEpisode(sIdx)}
                            className="text-red-400 hover:text-red-300 text-xs font-bold px-2 py-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-0.5">
                          <label className="text-[10px] text-zinc-400 font-bold">Video / Stream URL or Upload File</label>
                          <label className="cursor-pointer text-[10px] text-violet-400 font-bold hover:underline flex items-center gap-1 bg-violet-950/80 px-2 py-0.5 rounded-full border border-violet-800/60">
                            <FileVideo className="w-3 h-3 text-pink-400" />
                            <span>Upload MP4/WebM Video</span>
                            <input
                              type="file"
                              accept="video/*"
                              className="hidden"
                              onChange={(e) => handleVideoFileForServer(sIdx, e)}
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          value={server.url}
                          onChange={(e) =>
                            handleUpdateServerInEpisode(sIdx, { ...server, url: e.target.value })
                          }
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-2.5 py-1 text-zinc-100 font-mono text-[11px]"
                          placeholder="https://... or click 'Upload MP4/WebM Video'"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                {!isAddingNewEpisode ? (
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteEpisode(
                        editingEpisode.animeId,
                        editingEpisode.seasonNumber,
                        editingEpisode.episode.id,
                        editingEpisode.episode.episodeNumber
                      )
                    }
                    className={`px-4 py-2 rounded-full font-bold transition border ${
                      confirmDeleteEpId === editingEpisode.episode.id
                        ? 'bg-red-600 text-white border-red-500 animate-pulse'
                        : 'bg-red-950/60 hover:bg-red-600 text-red-300 hover:text-white border-red-800/60'
                    }`}
                  >
                    {confirmDeleteEpId === editingEpisode.episode.id ? 'Confirm Delete Episode?' : 'Delete Episode'}
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingEpisode(null)}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold px-4 py-2 rounded-full"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-5 py-2 rounded-full shadow-md flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Episode</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 4: DIRECT VIDEO UPLOADER */}
      {adminTab === 'upload-video' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6 shadow-2xl">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-pink-400" />
                <span>Upload Local Video File (MP4, WebM, MKV)</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Drag & drop or select a video file from your computer to attach it directly to an anime episode.
              </p>
            </div>

            <form onSubmit={handlePublishUploadedVideo} className="space-y-6">
              {/* Drag and drop zone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file && file.type.startsWith('video/')) {
                    handleSelectUploadVideoFile(file);
                  } else {
                    alert('Please drop a valid video file (MP4, WebM, MKV).');
                  }
                }}
                className="border-2 border-dashed border-zinc-700 hover:border-violet-500 rounded-3xl p-8 text-center bg-zinc-950/60 hover:bg-zinc-950 transition group cursor-pointer"
              >
                <input
                  type="file"
                  accept="video/*"
                  id="admin-video-file-input"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleSelectUploadVideoFile(file);
                  }}
                />

                <label htmlFor="admin-video-file-input" className="cursor-pointer space-y-3 block">
                  <div className="w-16 h-16 rounded-full bg-violet-600/20 text-violet-400 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-violet-600/10">
                    <FileVideo className="w-8 h-8" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">
                      {videoUploadFile ? `Selected: ${videoUploadFile.name}` : 'Click to select or drag video file here'}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1 font-mono">
                      Supports MP4, WebM, MKV, AVI • Up to 4K Ultra HD
                    </p>
                  </div>

                  <span className="inline-block bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs px-5 py-2 rounded-full transition shadow-md">
                    Choose Video File
                  </span>
                </label>
              </div>

              {/* Video Preview Player */}
              {videoUploadPreviewUrl && (
                <div className="space-y-2 bg-zinc-950 border border-zinc-800 p-4 rounded-3xl">
                  <h4 className="text-xs font-bold text-violet-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Play className="w-3.5 h-3.5" />
                    Live Upload Video Preview Player
                  </h4>
                  <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-xl">
                    <video
                      src={videoUploadPreviewUrl}
                      controls
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-[11px] text-emerald-400 font-mono text-center pt-1">
                    ✓ Video file loaded and ready to stream!
                  </p>
                </div>
              )}

              {/* Episode Details Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Target Anime Title</label>
                  <select
                    value={selectedAnimeId}
                    onChange={(e) => setSelectedAnimeId(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-2.5 text-white font-bold"
                  >
                    {animeList.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.title} ({a.format})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Season Number</label>
                  <select
                    value={selectedSeasonNumber}
                    onChange={(e) => setSelectedSeasonNumber(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-2.5 text-white font-bold"
                  >
                    {(activeAnime?.seasons || []).map((s) => (
                      <option key={s.seasonNumber} value={s.seasonNumber}>
                        Season {s.seasonNumber}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Episode Number</label>
                  <input
                    type="number"
                    value={videoUploadEpNum}
                    onChange={(e) => setVideoUploadEpNum(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-2.5 text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Episode Title</label>
                  <input
                    type="text"
                    required
                    value={videoUploadTitle}
                    onChange={(e) => setVideoUploadTitle(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Stream Server Label</label>
                  <input
                    type="text"
                    value={videoUploadServerLabel}
                    onChange={(e) => setVideoUploadServerLabel(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-2.5 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Video Quality</label>
                  <select
                    value={videoUploadQuality}
                    onChange={(e) => setVideoUploadQuality(e.target.value as any)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-2.5 text-white font-bold"
                  >
                    <option value="1080p">1080p Full HD</option>
                    <option value="720p">720p HD</option>
                    <option value="480p">480p SD</option>
                  </select>
                </div>
              </div>

              {/* Progress bar simulation */}
              {isPublishingVideo && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-violet-300">
                    <span>Uploading and Publishing Video Stream...</span>
                    <span>{videoUploadProgress}%</span>
                  </div>
                  <div className="w-full bg-zinc-950 rounded-full h-3 overflow-hidden border border-zinc-800">
                    <div
                      className="bg-gradient-to-r from-violet-600 to-pink-500 h-full transition-all duration-300"
                      style={{ width: `${videoUploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Publish Button */}
              <div className="flex justify-end border-t border-zinc-800 pt-4">
                <button
                  type="submit"
                  disabled={isPublishingVideo}
                  className="bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm px-8 py-3 rounded-full transition shadow-lg shadow-violet-600/30 flex items-center gap-2 disabled:opacity-50"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Publish Video Episode to Site</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 5: BANNERS & NOTICES */}
      {adminTab === 'notices' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>Global Top Announcement Bar</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Navbar Header Notice</label>
              <input
                type="text"
                value={siteNotice}
                onChange={(e) => setSiteNotice(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white"
              />
              <p className="text-[11px] text-zinc-500 mt-1">Displayed at the top of every page.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Episode Notice Alert Box</label>
              <input
                type="text"
                value={noticeBanner}
                onChange={(e) => setNoticeBanner(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-amber-300 font-bold"
              />
              <p className="text-[11px] text-zinc-500 mt-1">Displayed in red/amber highlight box inside anime modals.</p>
            </div>

            <button
              onClick={() => showToast('Notices updated successfully!')}
              className="bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs px-5 py-2.5 rounded-full transition shadow-md flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Notices</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB: EDIT INITIAL PAGE (HOME) */}
      {adminTab === 'home-settings' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-violet-950/40 border border-emerald-500/30 rounded-3xl p-6 space-y-2">
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Initial Landing Page Customizer</h2>
            </div>
            <p className="text-xs text-zinc-400">
              Customize the titles, spotlight featured anime, community poll, and announcement banners shown on the website's initial home page.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Editor Form Column */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-5 shadow-xl">
              <h3 className="text-sm font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-emerald-400" />
                <span>Page Titles & Hero Spotlight</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Initial Page Lineup Headline
                  </label>
                  <input
                    type="text"
                    value={homeTitle}
                    onChange={(e) => setHomeTitle && setHomeTitle(e.target.value)}
                    placeholder="e.g. Spring 2026 Lineup"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition"
                  />
                  <p className="text-[11px] text-zinc-500 mt-1">Main heading displayed inside the top Bento box on the home page.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Initial Page Subtitle / Tagline
                  </label>
                  <input
                    type="text"
                    value={homeSubtitle}
                    onChange={(e) => setHomeSubtitle && setHomeSubtitle(e.target.value)}
                    placeholder="e.g. 42 new titles debuting in Hindi, Tamil & Telugu"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition"
                  />
                  <p className="text-[11px] text-zinc-500 mt-1">Secondary description line under the main headline.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Spotlight Featured Anime (Top Banner)
                  </label>
                  <select
                    value={featuredHeroId}
                    onChange={(e) => setFeaturedHeroId && setFeaturedHeroId(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition"
                  >
                    <option value="">-- Default Auto Featured (Highest Rated) --</option>
                    {animeList.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.title} ({a.format} • Rating: {a.rating})
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-zinc-500 mt-1">Pin a specific anime to appear first in the top Hero Spotlight slider.</p>
                </div>

                <div className="border-t border-zinc-800 pt-4 space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Community Poll Settings</h4>
                  
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Poll Question</label>
                    <input
                      type="text"
                      value={pollQuestion}
                      onChange={(e) => setPollQuestion && setPollQuestion(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Poll Options / Matchup</label>
                    <input
                      type="text"
                      value={pollOptions}
                      onChange={(e) => setPollOptions && setPollOptions(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2 text-xs text-zinc-400"
                    />
                  </div>
                </div>

                <button
                  onClick={() => showToast('✨ Initial home page settings updated successfully!')}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-full transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Home Page Configuration</span>
                </button>
              </div>
            </div>

            {/* Live Bento Preview Card Column */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
                <Eye className="w-4 h-4 text-violet-400" />
                <span>Live Initial Page Bento Preview</span>
              </h3>

              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800/80 space-y-4">
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Initial Page Header Banner</span>
                  <span className="text-emerald-400">Live Preview</span>
                </div>

                {/* Simulated Season Bento Box */}
                <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-violet-400 text-xs font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Featured Lineup
                    </span>
                    <span className="text-[9px] text-zinc-500 font-mono border border-zinc-800 px-2 py-0.5 rounded-full">v2.4.1</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{homeTitle}</h4>
                    <p className="text-xs text-zinc-400">{homeSubtitle}</p>
                  </div>
                </div>

                {/* Simulated Poll Bento Box */}
                <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4 space-y-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-violet-400">Community Poll</span>
                  <h5 className="text-xs font-bold text-white">{pollQuestion}</h5>
                  <p className="text-[11px] text-zinc-500">{pollOptions}</p>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 w-[78%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: CONTACT & SOCIAL MESSAGES SETTINGS */}
      {adminTab === 'contact-settings' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-sky-950/50 via-zinc-900 to-violet-950/50 border border-sky-500/30 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-sky-400" />
                <h2 className="text-lg font-bold text-white">Contact Channels & Messages Inbox</h2>
              </div>
              <p className="text-xs text-zinc-400">
                Configure official Instagram, Email, and Telegram links shown to users, and view incoming contact form messages.
              </p>
            </div>
            {contactMessages.length > 0 && (
              <div className="bg-sky-500/20 border border-sky-500/40 text-sky-300 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                <Inbox className="w-4 h-4" />
                <span>{contactMessages.length} Messages Received</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Social & Contact Channels Configuration Form */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-5 shadow-xl">
              <h3 className="text-sm font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
                <Settings className="w-4 h-4 text-sky-400" />
                <span>Official Contact & Social Links</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1 flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                    <span>Instagram Profile Link / Handle</span>
                  </label>
                  <input
                    type="text"
                    value={contactInstagram}
                    onChange={(e) => setContactInstagram && setContactInstagram(e.target.value)}
                    placeholder="e.g. https://instagram.com/animeyatra_official or @animeyatra_official"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500 transition"
                  />
                  <p className="text-[11px] text-zinc-500 mt-1">Direct link or username for Instagram page.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-violet-400" />
                    <span>Support Email Address</span>
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail && setContactEmail(e.target.value)}
                    placeholder="e.g. support@animeyatra.in"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500 transition"
                  />
                  <p className="text-[11px] text-zinc-500 mt-1">Email address displayed on the Contact Us page.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1 flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-sky-400" />
                    <span>Telegram Channel / Group Link</span>
                  </label>
                  <input
                    type="text"
                    value={contactTelegram}
                    onChange={(e) => setContactTelegram && setContactTelegram(e.target.value)}
                    placeholder="e.g. https://t.me/animeyatra_official"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500 transition"
                  />
                  <p className="text-[11px] text-zinc-500 mt-1">Official Telegram channel or group link for instant updates.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Contact Page Welcome Subtitle / Note
                  </label>
                  <textarea
                    rows={2}
                    value={contactNote}
                    onChange={(e) => setContactNote && setContactNote(e.target.value)}
                    placeholder="e.g. Have an anime request, broken server link report, or sponsorship inquiry? Reach out..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500 transition"
                  />
                </div>

                <button
                  onClick={() => showToast('✨ Contact settings saved successfully!')}
                  className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs py-3 rounded-full transition shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Contact Configuration</span>
                </button>
              </div>
            </div>

            {/* Direct Contact Form Submissions Inbox */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-emerald-400" />
                  <span>User Messages & Requests Inbox</span>
                </h3>
                {contactMessages.length > 0 && setContactMessages && (
                  <button
                    onClick={() => {
                      if (window.confirm('Clear all received contact messages?')) {
                        setContactMessages([]);
                        showToast('Inbox cleared.');
                      }
                    }}
                    className="text-[11px] text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear Inbox</span>
                  </button>
                )}
              </div>

              {contactMessages.length === 0 ? (
                <div className="p-8 text-center space-y-2 bg-zinc-950/60 rounded-2xl border border-zinc-800/80">
                  <Inbox className="w-8 h-8 text-zinc-600 mx-auto" />
                  <p className="text-xs font-bold text-zinc-300">No Messages in Inbox</p>
                  <p className="text-[11px] text-zinc-500 max-w-xs mx-auto">
                    When users fill out the "Contact Us" form on the website, their requests and messages will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {contactMessages.map((msg) => (
                    <div key={msg.id} className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-2 relative group">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{msg.name}</span>
                            <span className="text-[10px] bg-violet-600/30 text-violet-300 border border-violet-500/30 px-2 py-0.2 rounded-full font-bold">
                              {msg.subject}
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{msg.email} • {msg.timestamp}</p>
                        </div>
                        {setContactMessages && (
                          <button
                            onClick={() => {
                              setContactMessages(contactMessages.filter(m => m.id !== msg.id));
                              showToast('Message removed');
                            }}
                            className="text-zinc-500 hover:text-red-400 p-1 transition"
                            title="Delete message"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/80 p-3 rounded-xl border border-zinc-800/60">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB: GLOBAL SKIP AD SHORTENER LINKS SETTINGS */}
      {adminTab === 'skipad-settings' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-purple-950/60 via-zinc-900 to-violet-950/60 border border-purple-500/40 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-bold text-white">Global Skip AD Shortener Links Manager</h2>
              </div>
              <p className="text-xs text-zinc-400">
                Configure your GPLinks, Cuty, or custom verification shortener URLs for all video player buttons across your website.
              </p>
            </div>
            <div className="bg-purple-500/20 border border-purple-500/40 text-purple-300 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>5 Active Link Slots</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Global Link Inputs */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-5 shadow-xl">
              <h3 className="text-sm font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
                <Settings className="w-4 h-4 text-purple-400" />
                <span>Default Global Skip AD Links</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-purple-300 uppercase mb-1 flex items-center justify-between">
                    <span>1. Primary "Skip AD [v1] and Enjoy" URL</span>
                    <span className="text-[10px] text-purple-400 font-mono">Main Video or Primary Shortener</span>
                  </label>
                  <input
                    type="text"
                    value={skipAdV1Url}
                    onChange={(e) => setSkipAdV1Url && setSkipAdV1Url(e.target.value)}
                    placeholder="e.g. https://commondatastorage.googleapis.com/... or https://your-shortener.com/v1"
                    className="w-full bg-zinc-950 border border-purple-900/60 rounded-2xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-purple-500 transition"
                  />
                  <p className="text-[11px] text-zinc-500 mt-1">Default link triggered by the main violet "Skip AD [v1]" button.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1 flex items-center justify-between">
                    <span>2. "Skip AD v2 (GPLinks)" URL</span>
                    <span className="text-[10px] text-zinc-400 font-mono">GPLinks Mirror</span>
                  </label>
                  <input
                    type="text"
                    value={skipAdGplinksUrl}
                    onChange={(e) => setSkipAdGplinksUrl && setSkipAdGplinksUrl(e.target.value)}
                    placeholder="e.g. https://gplinks.in/your-link"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-purple-500 transition"
                  />
                  <p className="text-[11px] text-zinc-500 mt-1">Default URL opened when user clicks "Skip AD v2 (GPLinks)".</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1 flex items-center justify-between">
                    <span>3. "Skip AD [v3] (Cuty Try 1)" URL</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Cuty Server 1</span>
                  </label>
                  <input
                    type="text"
                    value={skipAdCuty1Url}
                    onChange={(e) => setSkipAdCuty1Url && setSkipAdCuty1Url(e.target.value)}
                    placeholder="e.g. https://cuty.io/your-link-1"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1 flex items-center justify-between">
                    <span>4. "Skip AD [v3] (Cuty Try 2)" URL</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Cuty Server 2</span>
                  </label>
                  <input
                    type="text"
                    value={skipAdCuty2Url}
                    onChange={(e) => setSkipAdCuty2Url && setSkipAdCuty2Url(e.target.value)}
                    placeholder="e.g. https://cuty.io/your-link-2"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1 flex items-center justify-between">
                    <span>5. "Skip AD [v3] (Cuty Try 3)" URL</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Cuty Server 3</span>
                  </label>
                  <input
                    type="text"
                    value={skipAdCuty3Url}
                    onChange={(e) => setSkipAdCuty3Url && setSkipAdCuty3Url(e.target.value)}
                    placeholder="e.g. https://cuty.io/your-link-3"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
              </div>

              <button
                onClick={() => showToast('⚡ Global Skip AD links saved and applied across player!')}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-3 rounded-full transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save All Global Skip AD Links</span>
              </button>
            </div>

            {/* Live Visual Guidance & Preview */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-5 shadow-xl">
              <h3 className="text-sm font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
                <Eye className="w-4 h-4 text-purple-400" />
                <span>Video Player Buttons Live Preview</span>
              </h3>

              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-4">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center space-y-1">
                  <h4 className="text-xs font-bold text-violet-300 uppercase tracking-wider">
                    Please Skip Ad To Watch or Download
                  </h4>
                  <p className="text-[10px] text-zinc-400">
                    Preview of how your links render inside the episode video modal:
                  </p>
                </div>

                {/* Primary Button Preview */}
                <div className="bg-violet-600 text-white font-bold text-xs py-2.5 px-4 rounded-full text-center shadow-lg shadow-violet-600/30">
                  Skip AD [v1] and Enjoy → <span className="text-[10px] font-mono opacity-80">({(skipAdV1Url || '').substring(0, 30)}...)</span>
                </div>

                {/* Grid Preview */}
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-xl text-zinc-300 truncate font-mono">
                    <span className="font-bold text-purple-400 block">GPLinks:</span>
                    {skipAdGplinksUrl}
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-xl text-zinc-300 truncate font-mono">
                    <span className="font-bold text-purple-400 block">Cuty Try 1:</span>
                    {skipAdCuty1Url}
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-xl text-zinc-300 truncate font-mono">
                    <span className="font-bold text-purple-400 block">Cuty Try 2:</span>
                    {skipAdCuty2Url}
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-xl text-zinc-300 truncate font-mono">
                    <span className="font-bold text-purple-400 block">Cuty Try 3:</span>
                    {skipAdCuty3Url}
                  </div>
                </div>

                <div className="p-3 bg-purple-950/40 border border-purple-800/50 rounded-xl text-[11px] text-purple-200 space-y-1">
                  <p className="font-bold">💡 How Episode Overrides Work:</p>
                  <p className="text-zinc-400 text-[10px]">
                    If an episode has specific links configured in the "Episodes & Streams" tab, those will be used. If an episode does not have custom links, these 5 global links will automatically serve as fallback!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SECURITY & OWNER CONTROLS */}

      {adminTab === 'security' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Status Banner */}
          <div className={`p-6 rounded-3xl border shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            userRole === 'owner'
              ? 'bg-gradient-to-r from-amber-950/60 via-zinc-900 to-violet-950/60 border-amber-500/40'
              : 'bg-zinc-900 border-zinc-800'
          }`}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {userRole === 'owner' ? (
                  <>
                    <Crown className="w-5 h-5 text-amber-400" />
                    <h2 className="text-lg font-bold text-amber-300">Owner Security Portal Active</h2>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-5 h-5 text-amber-400" />
                    <h2 className="text-lg font-bold text-white">Security & Password Management</h2>
                  </>
                )}
              </div>
              <p className="text-xs text-zinc-400">
                {userRole === 'owner'
                  ? 'You are logged in as the Site Owner. You have full authority to modify Admin login passwords and Owner keys.'
                  : 'Only the Site Owner can change the password for Admin login. Enter the Owner key below to unlock password editing.'}
              </p>
            </div>

            {userRole === 'owner' && (
              <button
                onClick={handleResetPasscodes}
                className="bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-amber-500/30 text-xs font-bold px-4 py-2 rounded-full transition shrink-0 flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Passcodes to Default</span>
              </button>
            )}
          </div>

          {/* If Logged in as ADMIN, show Elevate to Owner Section */}
          {userRole !== 'owner' && (
            <div className="bg-zinc-900 border border-amber-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-amber-300">Owner Key Verification Required</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    To prevent unauthorized password changes, only the Site Owner can update the admin password.
                    Please verify your Owner Key below to unlock password management.
                  </p>
                </div>
              </div>

              <form onSubmit={handleElevateToOwner} className="max-w-md space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Enter Owner Key
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Owner Key"
                    value={elevateKeyInput}
                    onChange={(e) => setElevateKeyInput(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition"
                  />
                  {elevateError && (
                    <p className="text-xs text-red-400 font-medium mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Incorrect Owner Key! Please verify your credentials.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs px-6 py-2.5 rounded-full transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
                >
                  <Crown className="w-4 h-4" />
                  <span>Verify Owner Key & Unlock</span>
                </button>
              </form>
            </div>
          )}

          {/* Password Change Forms (Only active when userRole === 'owner') */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Change Admin Password */}
            <div className={`bg-zinc-900 border rounded-3xl p-6 space-y-4 shadow-xl transition-all ${
              userRole === 'owner' ? 'border-violet-500/40 opacity-100' : 'border-zinc-800/80 opacity-60 pointer-events-none'
            }`}>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-violet-400" />
                  <h3 className="text-sm font-bold text-white">Change Admin Login Passcode</h3>
                </div>
                <span className="bg-violet-950 text-violet-300 border border-violet-800 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full">
                  Admin Pass
                </span>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                This updates the passcode required for standard admin users to log into the management panel.
              </p>

              <form onSubmit={handleChangeAdminPassword} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">
                    New Admin Passcode
                  </label>
                  <input
                    type="password"
                    required
                    disabled={userRole !== 'owner'}
                    placeholder="Enter new admin passcode"
                    value={newAdminPass}
                    onChange={(e) => setNewAdminPass(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">
                    Confirm New Admin Passcode
                  </label>
                  <input
                    type="password"
                    required
                    disabled={userRole !== 'owner'}
                    placeholder="Confirm new admin passcode"
                    value={confirmAdminPass}
                    onChange={(e) => setConfirmAdminPass(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={userRole !== 'owner'}
                  className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs py-2.5 rounded-full transition shadow-md shadow-violet-600/20 flex items-center justify-center gap-1.5 disabled:opacity-40"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Admin Password</span>
                </button>
              </form>
            </div>

            {/* Card 2: Change Owner Key */}
            <div className={`bg-zinc-900 border rounded-3xl p-6 space-y-4 shadow-xl transition-all ${
              userRole === 'owner' ? 'border-amber-500/40 opacity-100' : 'border-zinc-800/80 opacity-60 pointer-events-none'
            }`}>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white">Change Owner Key</h3>
                </div>
                <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full">
                  Root Key
                </span>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                This updates the master Owner key used to grant full security access and change admin credentials.
              </p>

              <form onSubmit={handleChangeOwnerPassword} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">
                    New Owner Key
                  </label>
                  <input
                    type="password"
                    required
                    disabled={userRole !== 'owner'}
                    placeholder="Enter new owner key"
                    value={newOwnerPass}
                    onChange={(e) => setNewOwnerPass(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">
                    Confirm New Owner Key
                  </label>
                  <input
                    type="password"
                    required
                    disabled={userRole !== 'owner'}
                    placeholder="Confirm new owner key"
                    value={confirmOwnerPass}
                    onChange={(e) => setConfirmOwnerPass(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={userRole !== 'owner'}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs py-2.5 rounded-full transition shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 disabled:opacity-40"
                >
                  <Crown className="w-4 h-4" />
                  <span>Update Owner Key</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
