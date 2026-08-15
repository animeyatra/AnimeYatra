export type Language = 'English' | 'Hinglish' | 'Hindi' | 'Tamil' | 'Telugu' | 'Japanese';

export type AnimeFormat = 'TV' | 'Movie' | 'OVA' | 'Special';

export type StreamQuality = '1080p' | '720p' | '480p' | '360p';

export interface VoiceActor {
  id: string;
  name: string;
  nativeName?: string;
  characterName: string;
  characterImage?: string;
  role: 'Main' | 'Supporting';
  photo: string;
  language: string;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  likes: number;
}

export interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
}

export interface StreamServer {
  id: string;
  name: string;
  quality: StreamQuality;
  type: 'Direct' | 'Embed' | 'HLS' | 'AdServer';
  url: string;
  label: string;
  badge?: string;
}

export interface Episode {
  id: string;
  episodeNumber: number;
  seasonNumber: number;
  title: string;
  japaneseTitle?: string;
  duration: string;
  thumbnail: string;
  synopsis?: string;
  servers: StreamServer[];
  commentsCount: number;
  availableLanguages: Language[];
  airDate: string;
}

export interface Season {
  seasonNumber: number;
  title: string;
  episodesCount: number;
  episodes: Episode[];
}

export interface ExternalLinks {
  myAnimeList?: string;
  aniList?: string;
  theMovieDB?: string;
  aniTally?: string;
}

export interface Anime {
  id: string;
  title: string;
  englishTitle?: string;
  japaneseTitle?: string;
  slug: string;
  poster: string;
  coverImage: string;
  bannerImage?: string;
  rating: number;
  totalVotes: number;
  synopsis: string;
  genres: string[];
  format: AnimeFormat;
  status: 'Ongoing' | 'Completed' | 'Upcoming';
  releaseYear: number;
  studio: string;
  dubLanguages: Language[];
  subLanguages: Language[];
  totalEpisodes: number;
  views: number;
  isTrending?: boolean;
  isFeatured?: boolean;
  isHindiDubbed?: boolean;
  cast: VoiceActor[];
  reviews: Review[];
  externalLinks: ExternalLinks;
  seasons: Season[];
  addedBy?: string;  // Tracks Admin/Owner who uploaded the anime
  addedAt?: string;  // Tracks Upload date
}

export interface UserWatchProgress {
  animeId: string;
  seasonNumber: number;
  episodeNumber: number;
  progressSeconds: number;
  durationSeconds: number;
  completed: boolean;
  lastWatchedAt: string;
}

export interface FilterState {
  searchQuery: string;
  selectedLanguage: Language | 'All';
  selectedGenre: string;
  selectedFormat: AnimeFormat | 'All';
  selectedStatus: string;
  sortBy: 'popular' | 'rating' | 'latest' | 'title';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  isRead?: boolean;
}