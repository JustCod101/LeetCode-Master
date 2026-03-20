import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/Layout';
import { 
  SlidingWindowVisualizer, 
  TwoPointersVisualizer, 
  DFSVisualizer, 
  DPVisualizer,
  FastSlowVisualizer,
  MergeIntervalsVisualizer,
  BinarySearchVisualizer,
  TopKVisualizer,
  SubsetsVisualizer,
  TopologicalSortVisualizer,
  TwoHeapsVisualizer,
  KWayMergeVisualizer,
  CyclicSortVisualizer,
  UnionFindVisualizer,
  TrieVisualizer,
  MonotonicStackVisualizer,
  BitwiseXORVisualizer,
  GreedyVisualizer,
  SegmentTreeVisualizer,
  DijkstraVisualizer,
  BoyerMooreVisualizer,
  KadaneVisualizer,
  KMPVisualizer,
  QuickSelectVisualizer,
  FloydWarshallVisualizer,
  PrimVisualizer,
  ZAlgorithmVisualizer,
  FenwickTreeVisualizer
} from './components/Visualizers';
import { PATTERNS } from './data/patterns';
import { ChevronRight, BookOpen, Code, Trophy, Sparkles } from 'lucide-react';
import { cn } from './lib/utils';
import { Language } from './types';

export default function App() {
  const [activeId, setActiveId] = useState(PATTERNS[0].id);
  const [language, setLanguage] = useState<Language>('zh');
  const activePattern = PATTERNS.find(p => p.id === activeId)!;

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const renderVisualizer = () => {
    switch (activeId) {
      case 'sliding-window':
        return <SlidingWindowVisualizer language={language} />;
      case 'two-pointers':
        return <TwoPointersVisualizer language={language} />;
      case 'dfs-bfs':
        return <DFSVisualizer language={language} />;
      case 'dynamic-programming':
        return <DPVisualizer language={language} />;
      case 'fast-slow-pointers':
        return <FastSlowVisualizer language={language} />;
      case 'merge-intervals':
        return <MergeIntervalsVisualizer language={language} />;
      case 'binary-search':
        return <BinarySearchVisualizer language={language} />;
      case 'top-k':
        return <TopKVisualizer language={language} />;
      case 'subsets':
        return <SubsetsVisualizer language={language} />;
      case 'topological-sort':
        return <TopologicalSortVisualizer language={language} />;
      case 'two-heaps':
        return <TwoHeapsVisualizer language={language} />;
      case 'k-way-merge':
        return <KWayMergeVisualizer language={language} />;
      case 'cyclic-sort':
        return <CyclicSortVisualizer language={language} />;
      case 'union-find':
        return <UnionFindVisualizer language={language} />;
      case 'trie':
        return <TrieVisualizer language={language} />;
      case 'monotonic-stack':
        return <MonotonicStackVisualizer language={language} />;
      case 'bitwise-xor':
        return <BitwiseXORVisualizer language={language} />;
      case 'greedy':
        return <GreedyVisualizer language={language} />;
      case 'segment-tree':
        return <SegmentTreeVisualizer language={language} />;
      case 'dijkstra':
        return <DijkstraVisualizer language={language} />;
      case 'boyer-moore':
        return <BoyerMooreVisualizer language={language} />;
      case 'kadane':
        return <KadaneVisualizer language={language} />;
      case 'kmp':
        return <KMPVisualizer language={language} />;
      case 'quick-select':
        return <QuickSelectVisualizer language={language} />;
      case 'floyd-warshall':
        return <FloydWarshallVisualizer language={language} />;
      case 'prim':
        return <PrimVisualizer language={language} />;
      case 'z-algorithm':
        return <ZAlgorithmVisualizer language={language} />;
      case 'fenwick-tree':
        return <FenwickTreeVisualizer language={language} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center p-12 bg-zinc-900 rounded-2xl border border-zinc-800 text-zinc-500">
            <Sparkles className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm font-mono uppercase tracking-widest">
              {language === 'en' ? 'Visualization coming soon' : '可视化即将推出'}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex bg-zinc-950 text-zinc-100 min-h-screen selection:bg-emerald-500/30">
      <Sidebar 
        patterns={PATTERNS} 
        activeId={activeId} 
        onSelect={setActiveId} 
        language={language}
        onLanguageToggle={toggleLanguage}
      />
      
      <main className="flex-1 h-screen overflow-y-auto p-12 lg:p-20">
        <div className="max-w-4xl mx-auto flex flex-col gap-16">
          {/* Header Section */}
          <motion.div 
            key={activeId + language + '-header'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
                {activePattern.category[language]}
              </span>
              <span className="text-zinc-600 font-mono text-xs">/ {activePattern.id}</span>
            </div>
            
            <h1 className="text-6xl font-bold tracking-tight text-white leading-tight">
              {activePattern.title[language]}
            </h1>
            
            <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
              {activePattern.description[language]}
            </p>
          </motion.div>

          {/* Visualization Section */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-600 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {language === 'en' ? 'Interactive Visualization' : '交互式可视化'}
              </h2>
              <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {language === 'en' ? 'Live Demo' : '实时演示'}
              </div>
            </div>
            {renderVisualizer()}
          </section>

          {/* Steps Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-8">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-600 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {language === 'en' ? 'Step-by-Step Guide' : '分步指南'}
              </h2>
              <div className="flex flex-col gap-6">
                {activePattern.steps.map((step, i) => (
                  <motion.div 
                    key={i + language}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500 group-hover:border-emerald-500/50 group-hover:text-emerald-400 transition-colors">
                        0{i + 1}
                      </div>
                      {i < activePattern.steps.length - 1 && (
                        <div className="w-px flex-1 bg-zinc-800 mt-2" />
                      )}
                    </div>
                    <div className="flex flex-col gap-1 pb-6">
                      <h4 className="text-white font-semibold">{step.title[language]}</h4>
                      <p className="text-sm text-zinc-500 leading-relaxed">
                        {step.description[language]}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-600 flex items-center gap-2">
                <Code className="w-4 h-4" />
                {language === 'en' ? 'Classic Example' : '经典范例'}
              </h2>
              <div className="p-8 bg-zinc-900 rounded-2xl border border-zinc-800 flex flex-col gap-4">
                <h3 className="text-xl font-bold text-white">{activePattern.example[language]}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {language === 'en' 
                    ? `This problem is a perfect candidate for the ${activePattern.title.en} pattern. Mastering this example will give you the intuition needed for more complex variations.`
                    : `这个问题是 ${activePattern.title.zh} 模式的完美候选。掌握这个例子将为您提供处理更复杂变体所需的直觉。`}
                </p>
                <button className="mt-4 flex items-center gap-2 text-emerald-400 text-sm font-bold uppercase tracking-wider hover:text-emerald-300 transition-colors">
                  {language === 'en' ? 'View on LeetCode' : '在 LeetCode 上查看'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-20 pb-12 border-t border-zinc-900 flex justify-between items-center text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            <span>© 2026 LeetMaster Visual Guide</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Discord</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
