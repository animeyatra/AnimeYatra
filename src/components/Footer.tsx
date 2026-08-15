import React from 'react';
import { PlayCircle, ShieldCheck, Heart, MessageCircle, Mail } from 'lucide-react';
import logoImg from '../assets/images/animeyatra_logo_1786562300553.jpg';

interface FooterProps {
  onOpenAdmin?: () => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenContact }) => {
  return (
    <footer className="bg-[#09090b] border-t border-zinc-800 text-zinc-400 py-10 px-4 mt-16">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-zinc-900 pb-6">
          <div className="flex items-center gap-3">
            <img 
              src={logoImg} 
              alt="AnimeYatra.app Logo" 
              className="w-9 h-9 object-cover rounded-xl border border-amber-500/30 shadow-md shadow-amber-500/20 bg-black"
            />
            <div>
              <span className="text-base font-extrabold text-white flex items-center gap-1">
                Anime<span className="text-amber-400">Yatra</span>
                <span className="bg-amber-400 text-black text-[9px] font-black px-1 py-0.2 rounded lowercase shadow-sm">.app</span>
              </span>
              <span className="block text-[9px] text-zinc-500 font-mono uppercase tracking-widest">HD Anime Network</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-zinc-400">
            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 transition bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Us</span>
              </button>
            )}
            <a href="#" onClick={(e) => { e.preventDefault(); onOpenContact?.(); }} className="hover:text-violet-400 transition">Request Anime</a>
            <a href="#" className="hover:text-violet-400 transition">DMCA Disclaimer</a>
            <a href="#" className="hover:text-violet-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-violet-400 transition">Privacy Policy</a>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-violet-400 hover:text-violet-300 font-bold flex items-center gap-1 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>

        <div className="text-center text-xs space-y-2">
          <p className="text-zinc-500 max-w-3xl mx-auto">
            AnimeYatra does not store any media files on its servers. All videos are provided by non-affiliated third party content providers.
          </p>
          <p className="text-zinc-600 font-medium">
            © {new Date().getFullYear()} AnimeYatra. Built with Bento Grid design for Anime Fans.
          </p>
        </div>
      </div>
    </footer>
  );
};

