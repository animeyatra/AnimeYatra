import React from 'react';
import { Language } from '../types';
import { LANGUAGE_OPTIONS } from '../data/animeData';
import { Globe } from 'lucide-react';

interface LanguageFilterBarProps {
  selectedLanguage: Language | 'All';
  setSelectedLanguage: (lang: Language | 'All') => void;
}

export const LanguageFilterBar: React.FC<LanguageFilterBarProps> = ({
  selectedLanguage,
  setSelectedLanguage,
}) => {
  return (
    <div className="bg-[#09090b] border-b border-zinc-800 py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-start gap-2 flex-wrap">
        <div className="flex items-center gap-2 text-xs text-zinc-400 font-bold uppercase tracking-wider mr-2">
          <Globe className="w-4 h-4 text-violet-500" />
          <span>Dub Track:</span>
        </div>

        <button
          onClick={() => setSelectedLanguage('All')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
            selectedLanguage === 'All'
              ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
              : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white'
          }`}
        >
          All Audio
        </button>

        {LANGUAGE_OPTIONS.map((lang) => {
          const isSelected = selectedLanguage === lang.key;
          return (
            <button
              key={lang.key}
              onClick={() => setSelectedLanguage(lang.key as Language)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <span>{lang.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                isSelected ? 'bg-violet-800 text-white' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {lang.badge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
