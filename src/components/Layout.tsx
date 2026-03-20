import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen, Code, Trophy, Languages } from 'lucide-react';
import { Pattern, Language } from '../types';
import { cn } from '../lib/utils';

interface PatternCardProps {
  pattern: Pattern;
  isActive: boolean;
  onClick: () => void;
  language: Language;
}

export const PatternCard: React.FC<PatternCardProps> = ({ pattern, isActive, onClick, language }) => {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-xl transition-all border",
        isActive 
          ? "bg-zinc-800 border-zinc-700 shadow-lg" 
          : "bg-transparent border-transparent hover:bg-zinc-900/50"
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          {pattern.category[language]}
        </span>
        <span className={cn(
          "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
          pattern.difficulty === 'Easy' && "bg-emerald-500/10 text-emerald-400",
          pattern.difficulty === 'Medium' && "bg-amber-500/10 text-amber-400",
          pattern.difficulty === 'Hard' && "bg-rose-500/10 text-rose-400"
        )}>
          {pattern.difficulty}
        </span>
      </div>
      <h3 className={cn(
        "text-lg font-semibold mb-1",
        isActive ? "text-white" : "text-zinc-400"
      )}>
        {pattern.title[language]}
      </h3>
      <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
        {pattern.description[language]}
      </p>
    </motion.button>
  );
};

export const Sidebar: React.FC<{
  patterns: Pattern[];
  activeId: string;
  onSelect: (id: string) => void;
  language: Language;
  onLanguageToggle: () => void;
}> = ({ patterns, activeId, onSelect, language, onLanguageToggle }) => {
  return (
    <div className="w-80 border-r border-zinc-800 h-screen overflow-y-auto p-6 flex flex-col gap-8 bg-zinc-950">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Trophy className="w-5 h-5 text-black" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">LeetMaster</h1>
        </div>
        
        <button 
          onClick={onLanguageToggle}
          className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
          title={language === 'en' ? 'Switch to Chinese' : '切换为英文'}
        >
          <Languages className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex flex-col gap-2">
        <h2 className="px-2 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-2">
          {language === 'en' ? 'Algorithm Patterns' : '算法模式'}
        </h2>
        {patterns.map((p) => (
          <PatternCard
            key={p.id}
            pattern={p}
            isActive={activeId === p.id}
            onClick={() => onSelect(p.id)}
            language={language}
          />
        ))}
      </div>
    </div>
  );
};
