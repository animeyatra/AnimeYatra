import React, { useState } from 'react';
import { Calendar, Clock, Play, Sparkles } from 'lucide-react';
import { Anime } from '../types';

interface ScheduleViewProps {
  animeList: Anime[];
  onSelectAnime: (anime: Anime) => void;
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const ScheduleView: React.FC<ScheduleViewProps> = ({ animeList, onSelectAnime }) => {
  const [selectedDay, setSelectedDay] = useState<string>('Saturday');

  const scheduleData: Record<string, { time: string; animeId: string; episodeNum: number; dubLang: string }[]> = {
    Monday: [
      { time: '18:00 IST', animeId: 'tamons-b-side', episodeNum: 6, dubLang: 'Hindi Dub' }
    ],
    Tuesday: [
      { time: '19:30 IST', animeId: 'wind-breaker', episodeNum: 11, dubLang: 'Hindi Dub' }
    ],
    Wednesday: [
      { time: '20:00 IST', animeId: 'kaiju-no-8', episodeNum: 10, dubLang: 'Hindi Dub' }
    ],
    Thursday: [
      { time: '18:30 IST', animeId: 'jujutsu-kaisen-s2', episodeNum: 19, dubLang: 'Multi-Audio' }
    ],
    Friday: [
      { time: '21:00 IST', animeId: 'demon-slayer-s4', episodeNum: 8, dubLang: 'Hindi Dub' }
    ],
    Saturday: [
      { time: '20:30 IST', animeId: 'solo-leveling-s2', episodeNum: 7, dubLang: 'Hindi Dub' },
      { time: '22:00 IST', animeId: 'tamons-b-side', episodeNum: 5, dubLang: 'Hinglish Dub' }
    ],
    Sunday: [
      { time: '19:00 IST', animeId: 'your-name-movie', episodeNum: 1, dubLang: 'Hindi Movie Special' }
    ]
  };

  const currentSchedule = scheduleData[selectedDay] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-violet-400" />
          <span>Weekly Airing Schedule</span>
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Check release times for new Hindi, Hinglish & Multi-Audio dubbed episodes on AnimeYatra.
        </p>
      </div>

      {/* Days Tabs - Bento Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {DAYS_OF_WEEK.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              selectedDay === day
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Day Schedule Cards - Bento Box Rows */}
      <div className="space-y-3">
        {currentSchedule.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl text-center text-zinc-500 text-xs">
            No releases scheduled for {selectedDay}.
          </div>
        ) : (
          currentSchedule.map((item, idx) => {
            const anime = animeList.find((a) => a.id === item.animeId);
            if (!anime) return null;

            return (
              <div
                key={idx}
                onClick={() => onSelectAnime(anime)}
                className="bg-zinc-900 border border-zinc-800 hover:border-violet-500/60 rounded-3xl p-4 flex items-center justify-between gap-4 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-zinc-800 text-violet-300 px-3 py-2 rounded-2xl border border-zinc-700 font-mono text-xs font-bold flex items-center gap-1.5 shrink-0">
                    <Clock className="w-3.5 h-3.5 text-violet-400" />
                    <span>{item.time}</span>
                  </div>

                  <img src={anime.poster} alt={anime.title} className="w-12 h-16 object-cover rounded-xl" />

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-violet-400 transition-colors">
                      {anime.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-semibold mt-0.5">
                      Episode {item.episodeNum} • <span className="text-violet-400">{item.dubLang}</span>
                    </p>
                  </div>
                </div>

                <button className="bg-violet-600 text-white p-2.5 rounded-full transition-colors hover:bg-violet-500 shadow-md">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
