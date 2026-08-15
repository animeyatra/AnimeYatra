import React from 'react';
import { X, ShieldAlert, CheckCircle2, HelpCircle } from 'lucide-react';

interface AdBlockHelperModalProps {
  onClose: () => void;
}

export const AdBlockHelperModal: React.FC<AdBlockHelperModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-zinc-100 space-y-4 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-950 hover:bg-violet-600 text-zinc-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-violet-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">How to Watch & Skip ADs</h3>
            <p className="text-xs text-zinc-500 font-mono">AnimeYatra Quick Guide</p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-zinc-300 bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
          <div className="flex gap-2">
            <span className="bg-violet-600 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold shrink-0 text-[11px]">
              1
            </span>
            <p>
              Click <strong>Skip AD [v1] and Enjoy</strong> on any episode.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="bg-violet-600 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold shrink-0 text-[11px]">
              2
            </span>
            <p>
              If an ad page opens in a new tab, simply close it and return to the player tab.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="bg-violet-600 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold shrink-0 text-[11px]">
              3
            </span>
            <p>
              If using Brave or AdBlock extensions, set <strong>DNS to Automatic</strong> in browser settings if stream buffering occurs.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-full text-xs transition shadow-md"
        >
          Got it! Back to Streaming
        </button>
      </div>
    </div>
  );
};
