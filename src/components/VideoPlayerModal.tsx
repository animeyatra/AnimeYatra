import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Settings, RotateCcw, FastForward, SkipForward, AlertTriangle, ShieldAlert, CheckCircle2, RefreshCw, MessageSquare, ThumbsUp, Send } from 'lucide-react';
import { Anime, Episode, StreamServer, Language } from '../types';
import { CommentsSection } from './CommentsSection';

interface VideoPlayerModalProps {
  anime: Anime;
  episode: Episode;
  skipAdV1Url?: string;
  skipAdGplinksUrl?: string;
  skipAdCuty1Url?: string;
  skipAdCuty2Url?: string;
  skipAdCuty3Url?: string;
  onClose: () => void;
  onNextEpisode?: () => void;
  onPrevEpisode?: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  anime,
  episode,
  skipAdV1Url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  skipAdGplinksUrl = 'https://gplinks.in',
  skipAdCuty1Url = 'https://cuty.io',
  skipAdCuty2Url = 'https://cuty.io',
  skipAdCuty3Url = 'https://cuty.io',
  onClose,
  onNextEpisode,
  onPrevEpisode
}) => {
  const [selectedServer, setSelectedServer] = useState<StreamServer>(episode.servers[0] || {
    id: 'srv-1',
    name: 'Server 1 [CDN]',
    quality: '1080p',
    type: 'Direct',
    url: skipAdV1Url,
    label: 'Skip AD [v1] and Enjoy'
  });
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('Hindi');
  const [isGeneratingLink, setIsGeneratingLink] = useState<boolean>(false);
  const [generatingMessage, setGeneratingMessage] = useState<string>('Generating Link...');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [quality, setQuality] = useState<string>('1080p');
  const [audioTrack, setAudioTrack] = useState<string>('Hindi Dub');
  const [showAdBlockHelp, setShowAdBlockHelp] = useState<boolean>(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const getSkipAdServer = (type: 'v1' | 'gplinks' | 'cuty1' | 'cuty2' | 'cuty3'): StreamServer => {
    let srv: StreamServer | undefined;
    if (type === 'v1') {
      srv = episode.servers.find(s => s.label?.includes('v1') || s.name?.includes('v1') || s.name?.includes('Server 1'));
      return srv || episode.servers[0] || {
        id: 'srv-v1',
        name: 'Skip AD [v1]',
        quality: '1080p',
        type: 'AdServer',
        url: skipAdV1Url,
        label: 'Skip AD [v1] and Enjoy'
      };
    } else if (type === 'gplinks') {
      srv = episode.servers.find(s => s.label?.includes('GPLinks') || s.name?.includes('GPLinks') || s.label?.includes('v2'));
      return srv || {
        id: 'srv-gplinks',
        name: 'GPLinks Mirror',
        quality: '1080p',
        type: 'AdServer',
        url: skipAdGplinksUrl,
        label: 'Skip AD v2 (GPLinks)'
      };
    } else if (type === 'cuty1') {
      srv = episode.servers.find(s => s.label?.includes('Try 1') || s.name?.includes('Try 1') || s.name?.includes('Cuty 1'));
      return srv || {
        id: 'srv-cuty1',
        name: 'Cuty Server 1',
        quality: '1080p',
        type: 'AdServer',
        url: skipAdCuty1Url,
        label: 'Skip AD [v3] (Cuty Try 1)'
      };
    } else if (type === 'cuty2') {
      srv = episode.servers.find(s => s.label?.includes('Try 2') || s.name?.includes('Try 2') || s.name?.includes('Cuty 2'));
      return srv || {
        id: 'srv-cuty2',
        name: 'Cuty Server 2',
        quality: '1080p',
        type: 'AdServer',
        url: skipAdCuty2Url,
        label: 'Skip AD [v3] (Cuty Try 2)'
      };
    } else {
      srv = episode.servers.find(s => s.label?.includes('Try 3') || s.name?.includes('Try 3') || s.name?.includes('Cuty 3'));
      return srv || {
        id: 'srv-cuty3',
        name: 'Cuty Server 3',
        quality: '1080p',
        type: 'AdServer',
        url: skipAdCuty3Url,
        label: 'Skip AD [v3] (Cuty Try 3)'
      };
    }
  };

  const handleSkipAdClick = (server: StreamServer) => {
    if (server.url && (server.url.startsWith('http://') || server.url.startsWith('https://'))) {
      const isShortener = server.type === 'AdServer' || 
        server.url.includes('gplinks') || 
        server.url.includes('cuty') || 
        server.name.includes('GPLinks') || 
        server.name.includes('Cuty') ||
        !server.url.match(/\.(mp4|m3u8|webm|mkv)$/i);
      
      if (isShortener && !server.url.includes('gtv-videos-bucket')) {
        window.open(server.url, '_blank');
      }
    }
    handleServerChange(server);
  };

  const handleServerChange = (server: StreamServer) => {
    setIsGeneratingLink(true);
    setGeneratingMessage(`Connecting to ${server.name}...`);
    setSelectedServer(server);

    setTimeout(() => {
      setIsGeneratingLink(false);
    }, 1800);
  };

  const handleSkipIntro = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 85; // Skip 1m 25s opening intro
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-y-auto flex flex-col items-center p-2 sm:p-4 animate-fadeIn">
      
      {/* Top Header Bar */}
      <div className="w-full max-w-5xl flex items-center justify-between py-3 border-b border-zinc-800 text-white">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <span className="bg-violet-600 px-2.5 py-0.5 rounded-full text-xs font-mono">
              S{episode.seasonNumber}-E{episode.episodeNumber}
            </span>
            <span>{anime.title} — {episode.title}</span>
          </h2>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">
            Streaming via AnimeYatra High Speed CDN
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-zinc-900 hover:bg-violet-600 text-zinc-300 hover:text-white transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="w-full max-w-5xl space-y-4 my-4">

        {/* Language Selection Header */}
        <div className="flex items-center justify-center gap-2 flex-wrap bg-zinc-900 p-3 rounded-2xl border border-zinc-800">
          <span className="text-xs font-bold text-zinc-400 mr-2 uppercase tracking-wider text-[10px]">Audio Language:</span>
          {['English', 'Hinglish', 'Hindi', 'Tamil', 'Telugu'].map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang as Language)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                selectedLanguage === lang
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {lang === 'Hindi' ? 'हिंदी' : lang === 'Tamil' ? 'தமிழ்' : lang === 'Telugu' ? 'తెలుగు' : lang}
            </button>
          ))}
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full bg-black rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl group">
          
          {/* Generating Link Loader Overlay */}
          {isGeneratingLink ? (
            <div className="absolute inset-0 bg-zinc-900 z-30 flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-zinc-800 border-t-violet-500 animate-spin" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">{generatingMessage}</h3>
                <p className="text-xs text-zinc-500">Please wait while we prepare your high-speed stream link.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Native Video Element vs iFrame Embed Support */}
              {selectedServer.type === 'Embed' || selectedServer.url.includes('iframe') || selectedServer.url.includes('embed') ? (
                <iframe
                  src={selectedServer.url}
                  className="w-full h-full border-0"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                  title={episode.title}
                />
              ) : (
                <video
                  ref={videoRef}
                  src={selectedServer.url}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              )}

              {/* Overlay Player Controls Bar */}
              <div className="absolute bottom-16 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={handleSkipIntro}
                  className="bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1 shadow-lg"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  Skip Intro (+85s)
                </button>
              </div>
            </>
          )}
        </div>

        {/* Episode Nav Bar */}
        <div className="flex items-center justify-between text-xs font-semibold bg-zinc-900 p-3 rounded-2xl border border-zinc-800">
          <button
            onClick={onPrevEpisode}
            disabled={!onPrevEpisode}
            className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            ← Previous Episode
          </button>
          
          <span className="text-violet-400 font-bold">
            Playing Episode {episode.episodeNumber} ({selectedLanguage} Dub)
          </span>

          <button
            onClick={onNextEpisode}
            disabled={!onNextEpisode}
            className="px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next Episode →
          </button>
        </div>

        {/* Skip AD & Streaming Links Guidance Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-4">
          
          {/* Notice Box */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-center space-y-1">
            <h3 className="text-xs sm:text-sm font-bold text-violet-300 uppercase tracking-wider">
              Please Skip Ad To Watch or Download
            </h3>
            <p className="text-[11px] text-zinc-400">
              Please SKIP AD once or twice every 24 hours to help keep our site running. This is required to watch Episodes/Movies.
            </p>
          </div>

          {/* Primary Skip AD v1 Button */}
          <div className="flex justify-center">
            <button
              onClick={() => handleSkipAdClick(getSkipAdServer('v1'))}
              className="w-full max-w-md bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm py-3 px-6 rounded-full shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 transition"
            >
              <span>Skip AD [v1] and Enjoy</span>
            </button>
          </div>

          {/* How to Watch Guide Button */}
          <div className="text-center">
            <button
              onClick={() => setShowAdBlockHelp(!showAdBlockHelp)}
              className="text-xs text-zinc-400 underline font-semibold hover:text-white"
            >
              ℹ How to Watch Online or Skip Ads? (View Instructions)
            </button>
          </div>

          {showAdBlockHelp && (
            <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 text-xs text-zinc-300 space-y-2 animate-fadeIn">
              <p className="font-bold text-amber-300">Skip AD Process Instructions:</p>
              <ol className="list-decimal pl-5 space-y-1 text-zinc-400">
                <li>Click any of the Skip AD buttons above or below.</li>
                <li>Complete the verification / skip link page if prompted.</li>
                <li>Enjoy high speed HD streaming!</li>
              </ol>
            </div>
          )}

          {/* Alternate Skip AD Options */}
          <div className="pt-2 border-t border-zinc-800 space-y-3">
            <p className="text-xs font-semibold text-zinc-400 text-center uppercase tracking-wider text-[10px]">
              IF THE ABOVE SKIP AD OPTION DOES NOT WORK TRY BELOW OPTIONS:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <button
                onClick={() => handleSkipAdClick(getSkipAdServer('gplinks'))}
                className="bg-zinc-950 hover:bg-zinc-800 text-zinc-200 font-bold text-xs py-2.5 px-3 rounded-2xl border border-zinc-800 hover:border-violet-500 transition"
              >
                Skip AD v2 (GPLinks)
              </button>

              <button
                onClick={() => handleSkipAdClick(getSkipAdServer('cuty1'))}
                className="bg-zinc-950 hover:bg-zinc-800 text-zinc-200 font-bold text-xs py-2.5 px-3 rounded-2xl border border-zinc-800 hover:border-violet-500 transition"
              >
                Skip AD [v3] (Cuty Try 1)
              </button>

              <button
                onClick={() => handleSkipAdClick(getSkipAdServer('cuty2'))}
                className="bg-zinc-950 hover:bg-zinc-800 text-zinc-200 font-bold text-xs py-2.5 px-3 rounded-2xl border border-zinc-800 hover:border-violet-500 transition"
              >
                Skip AD [v3] (Cuty Try 2)
              </button>

              <button
                onClick={() => handleSkipAdClick(getSkipAdServer('cuty3'))}
                className="bg-zinc-950 hover:bg-zinc-800 text-zinc-200 font-bold text-xs py-2.5 px-3 rounded-2xl border border-zinc-800 hover:border-violet-500 transition"
              >
                Skip AD [v3] (Cuty Try 3)
              </button>
            </div>

            <p className="text-[11px] text-zinc-500 text-center font-mono italic">
              Note: Skip AD [v3] (Cuty Try 3) Might not work for 24 Hours
            </p>
          </div>

          {/* Disable Adblock Error Button */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => alert('AdBlock Fix: Change DNS to Automatic in Chrome Settings or disable brave shields for smooth playback.')}
              className="bg-zinc-950 hover:bg-zinc-800 text-amber-300 text-xs font-bold py-2.5 px-5 rounded-full border border-zinc-800 flex items-center gap-2 transition"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>DISABLE ADBLOCK ERROR?</span>
            </button>
          </div>
        </div>

        {/* Comments & Discussion Thread */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
          <CommentsSection episodeId={episode.id} initialCount={episode.commentsCount} />
        </div>

      </div>
    </div>
  );
};
