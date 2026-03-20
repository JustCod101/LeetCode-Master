import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { Language } from '../types';

interface VisualizerProps {
  language: Language;
}

export const FastSlowVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const [slow, setSlow] = useState(0);
  const [fast, setFast] = useState(0);
  const nodes = Array.from({ length: 8 }, (_, i) => i);
  const cycleStart = 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setSlow(s => (s + 1) % nodes.length);
      setFast(f => (f + 2) % nodes.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
      <div className="flex gap-4 relative h-24 items-center">
        {nodes.map((node, i) => (
          <div key={i} className="relative flex flex-col items-center">
            <motion.div
              animate={{
                backgroundColor: i === slow && i === fast ? '#a855f7' : i === slow ? '#10b981' : i === fast ? '#3b82f6' : '#27272a',
                borderColor: i === slow || i === fast ? '#fff' : '#3f3f46',
              }}
              className="w-10 h-10 rounded-full border flex items-center justify-center text-white font-mono text-sm"
            >
              {node}
            </motion.div>
            {i < nodes.length - 1 && (
              <div className="absolute left-10 top-1/2 w-4 h-px bg-zinc-800" />
            )}
            
            {i === slow && (
              <motion.div layoutId="slow-ptr" className="absolute -bottom-6 text-emerald-400 text-[8px] font-bold uppercase">Slow</motion.div>
            )}
            {i === fast && (
              <motion.div layoutId="fast-ptr" className="absolute -top-6 text-blue-400 text-[8px] font-bold uppercase">Fast</motion.div>
            )}
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <h4 className="text-zinc-400 text-sm font-medium mb-1">
          {language === 'en' ? 'Cycle Detection' : '环检测'}
        </h4>
        <p className="text-white font-mono text-lg">
          {slow === fast ? (language === 'en' ? 'Pointers Met!' : '指针相遇！') : (language === 'en' ? 'Searching...' : '搜索中...')}
        </p>
      </div>
    </div>
  );
};

export const MergeIntervalsVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => (s + 1) % (intervals.length + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800 w-full">
      <div className="relative h-32 w-full max-w-md border-b border-zinc-800">
        {intervals.map((interval, i) => {
          const isMerged = step > 1 && i < 2;
          const isCurrent = step === i;
          return (
            <motion.div
              key={i}
              animate={{
                backgroundColor: isMerged ? '#10b981' : isCurrent ? '#3b82f6' : '#3f3f46',
                y: i * 20,
                x: interval[0] * 20,
                width: (interval[1] - interval[0]) * 20,
                opacity: isMerged && i === 1 ? 0 : 1,
              }}
              className="absolute h-4 rounded-full flex items-center justify-center text-[8px] text-white font-bold"
            >
              {interval[0]}-{interval[1]}
            </motion.div>
          );
        })}
        {step > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: 20, width: 100 }}
            className="absolute h-4 bg-emerald-500 rounded-full top-0 flex items-center justify-center text-[8px] text-black font-bold"
          >
            Merged: 1-6
          </motion.div>
        )}
      </div>
      
      <div className="text-center">
        <h4 className="text-zinc-400 text-sm font-medium mb-1">
          {language === 'en' ? 'Interval Merging' : '区间合并'}
        </h4>
        <p className="text-white font-mono text-lg">
          {step === 0 ? (language === 'en' ? 'Sorting intervals...' : '排序区间...') : (language === 'en' ? 'Checking overlaps...' : '检查重叠...')}
        </p>
      </div>
    </div>
  );
};

export const BinarySearchVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const array = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
  const target = 23;
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(array.length - 1);
  const [mid, setMid] = useState(Math.floor((0 + 9) / 2));
  const [found, setFound] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (found) {
        setLow(0);
        setHigh(array.length - 1);
        setMid(Math.floor((0 + 9) / 2));
        setFound(false);
        return;
      }

      const currentMid = Math.floor((low + high) / 2);
      setMid(currentMid);

      if (array[currentMid] === target) {
        setFound(true);
      } else if (array[currentMid] < target) {
        setLow(currentMid + 1);
      } else {
        setHigh(currentMid - 1);
      }
    }, 2000);
    return () => clearInterval(timer);
  }, [low, high, found]);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
      <div className="flex gap-2 relative h-24 items-center">
        {array.map((val, i) => {
          const isRange = i >= low && i <= high;
          const isMid = i === mid;
          const isTarget = found && isMid;
          return (
            <div key={i} className="relative flex flex-col items-center">
              <motion.div
                animate={{
                  backgroundColor: isTarget ? '#10b981' : isMid ? '#3b82f6' : isRange ? '#27272a' : '#18181b',
                  borderColor: isMid ? '#60a5fa' : isRange ? '#3f3f46' : '#27272a',
                  opacity: isRange ? 1 : 0.3,
                  scale: isMid ? 1.1 : 1,
                }}
                className="w-10 h-10 rounded-lg border flex items-center justify-center text-white font-mono text-xs"
              >
                {val}
              </motion.div>
              
              {i === low && isRange && (
                <motion.div layoutId="bs-low" className="absolute -bottom-6 text-emerald-400 text-[8px] font-bold">LOW</motion.div>
              )}
              {i === high && isRange && (
                <motion.div layoutId="bs-high" className="absolute -bottom-10 text-rose-400 text-[8px] font-bold">HIGH</motion.div>
              )}
              {isMid && (
                <motion.div layoutId="bs-mid" className="absolute -top-6 text-blue-400 text-[8px] font-bold">MID</motion.div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="text-center">
        <h4 className="text-zinc-400 text-sm font-medium mb-1">
          {language === 'en' ? 'Target' : '目标'}: {target}
        </h4>
        <p className={cn("font-mono text-lg", found ? "text-emerald-400" : "text-white")}>
          {language === 'en' ? 'Mid' : '中间值'}: {array[mid]} {found && (language === 'en' ? " (Found!)" : " (已找到!)")}
        </p>
      </div>
    </div>
  );
};

export const TopKVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const [heap, setHeap] = useState([10, 15, 20]);
  const [incoming, setIncoming] = useState([5, 25, 12, 30]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex >= incoming.length) {
        setHeap([10, 15, 20]);
        setCurrentIndex(0);
        return;
      }

      const val = incoming[currentIndex];
      if (val > heap[0]) {
        const newHeap = [...heap.slice(1), val].sort((a, b) => a - b);
        setHeap(newHeap);
      }
      setCurrentIndex(prev => prev + 1);
    }, 2000);
    return () => clearInterval(timer);
  }, [currentIndex, heap]);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
      <div className="flex flex-col items-center gap-4">
        <div className="text-zinc-400 text-xs uppercase font-bold tracking-widest">Min-Heap (K=3)</div>
        <div className="flex gap-4">
          {heap.map((val, i) => (
            <motion.div
              key={i}
              layout
              className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500 flex items-center justify-center text-purple-400 font-mono font-bold"
            >
              {val}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="text-zinc-400 text-xs uppercase font-bold tracking-widest">Incoming Elements</div>
        <div className="flex gap-2">
          {incoming.map((val, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: i < currentIndex ? 0.3 : 1,
                scale: i === currentIndex ? 1.2 : 1,
                backgroundColor: i === currentIndex ? '#3b82f6' : '#27272a'
              }}
              className="w-10 h-10 rounded-lg border border-zinc-700 flex items-center justify-center text-white font-mono text-xs"
            >
              {val}
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-white font-mono text-lg">
          {currentIndex < incoming.length 
            ? (language === 'en' ? `Checking ${incoming[currentIndex]}...` : `检查 ${incoming[currentIndex]}...`)
            : (language === 'en' ? 'Top 3 Found!' : '已找到前 3 个！')}
        </p>
      </div>
    </div>
  );
};

export const SubsetsVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const [subsets, setSubsets] = useState<number[][]>([[]]);
  const nums = [1, 2, 3];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (index >= nums.length) {
        setSubsets([[]]);
        setIndex(0);
        return;
      }

      const num = nums[index];
      setSubsets(prev => [...prev, ...prev.map(s => [...s, num])]);
      setIndex(prev => prev + 1);
    }, 2000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800 w-full">
      <div className="grid grid-cols-4 gap-4 w-full">
        <AnimatePresence mode="popLayout">
          {subsets.map((subset, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white font-mono text-sm"
            >
              [{subset.join(', ')}]
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="text-center">
        <h4 className="text-zinc-400 text-sm font-medium mb-1">
          {language === 'en' ? 'Generating Subsets' : '生成子集'}
        </h4>
        <p className="text-white font-mono text-lg">
          {index < nums.length 
            ? (language === 'en' ? `Adding ${nums[index]} to all sets...` : `将 ${nums[index]} 添加到所有集合...`)
            : (language === 'en' ? 'All subsets generated!' : '所有子集已生成！')}
        </p>
      </div>
    </div>
  );
};

export const TopologicalSortVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const [queue, setQueue] = useState<number[]>([]);
  const [result, setResult] = useState<number[]>([]);
  const [inDegrees, setInDegrees] = useState<Record<number, number>>({ 0: 0, 1: 1, 2: 1, 3: 2 });
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (step === 0) {
        setQueue([0]);
        setStep(1);
      } else if (step === 1 && queue.length > 0) {
        const node = queue[0];
        setResult(prev => [...prev, node]);
        setQueue(prev => prev.slice(1));
        
        // Simulate processing neighbors
        const neighbors = node === 0 ? [1, 2] : node === 1 || node === 2 ? [3] : [];
        const nextInDegrees = { ...inDegrees };
        const nextQueue = [...queue.slice(1)];
        
        neighbors.forEach(n => {
          nextInDegrees[n]--;
          if (nextInDegrees[n] === 0) nextQueue.push(n);
        });
        
        setInDegrees(nextInDegrees);
        setQueue(nextQueue);
        if (nextQueue.length === 0 && result.length === 3) setStep(2);
      } else if (step === 2) {
        setQueue([]);
        setResult([]);
        setInDegrees({ 0: 0, 1: 1, 2: 1, 3: 2 });
        setStep(0);
      }
    }, 2000);
    return () => clearInterval(timer);
  }, [step, queue, result]);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800 w-full">
      <div className="flex gap-12 items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="text-zinc-400 text-xs uppercase font-bold tracking-widest">Queue</div>
          <div className="flex gap-2 h-12">
            {queue.map((node, i) => (
              <motion.div
                key={i}
                layout
                className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500 flex items-center justify-center text-blue-400 font-mono font-bold"
              >
                {node}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="text-zinc-400 text-xs uppercase font-bold tracking-widest">Result</div>
          <div className="flex gap-2 h-12">
            {result.map((node, i) => (
              <motion.div
                key={i}
                layout
                className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 font-mono font-bold"
              >
                {node}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[0, 1, 2, 3].map(node => (
          <div key={node} className="flex flex-col items-center gap-1">
            <div className={cn(
              "w-10 h-10 rounded-full border flex items-center justify-center font-mono text-sm",
              result.includes(node) ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-zinc-800 border-zinc-700 text-white"
            )}>
              {node}
            </div>
            <div className="text-[10px] text-zinc-500">In: {inDegrees[node]}</div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-white font-mono text-lg">
          {step === 1 ? (language === 'en' ? 'Processing nodes...' : '处理节点...') : (language === 'en' ? 'Sorted!' : '排序完成！')}
        </p>
      </div>
    </div>
  );
};

export const TwoHeapsVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const [maxHeap, setMaxHeap] = useState([10, 5]);
  const [minHeap, setMinHeap] = useState([15, 20]);
  const [incoming, setIncoming] = useState([12, 8, 25]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex >= incoming.length) {
        setMaxHeap([10, 5]);
        setMinHeap([15, 20]);
        setCurrentIndex(0);
        return;
      }

      const val = incoming[currentIndex];
      // Simple logic for visualization
      if (val < maxHeap[0]) {
        const nextMax = [...maxHeap, val].sort((a, b) => b - a);
        if (nextMax.length > minHeap.length + 1) {
          const move = nextMax.shift()!;
          setMinHeap([...minHeap, move].sort((a, b) => a - b));
        }
        setMaxHeap(nextMax);
      } else {
        const nextMin = [...minHeap, val].sort((a, b) => a - b);
        if (nextMin.length > maxHeap.length) {
          const move = nextMin.shift()!;
          setMaxHeap([...maxHeap, move].sort((a, b) => b - a));
        }
        setMinHeap(nextMin);
      }
      setCurrentIndex(prev => prev + 1);
    }, 2000);
    return () => clearInterval(timer);
  }, [currentIndex, maxHeap, minHeap]);

  const median = maxHeap.length === minHeap.length 
    ? (maxHeap[0] + minHeap[0]) / 2 
    : maxHeap[0];

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
      <div className="flex gap-12 items-start">
        <div className="flex flex-col items-center gap-4">
          <div className="text-zinc-400 text-[10px] uppercase font-bold tracking-widest">Max-Heap (Small Half)</div>
          <div className="flex flex-wrap gap-2 max-w-[120px] justify-center">
            {maxHeap.map((val, i) => (
              <motion.div
                key={i}
                layout
                className="w-10 h-10 rounded-lg bg-rose-500/20 border border-rose-500 flex items-center justify-center text-rose-400 font-mono text-xs font-bold"
              >
                {val}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="text-zinc-400 text-[10px] uppercase font-bold tracking-widest">Min-Heap (Large Half)</div>
          <div className="flex flex-wrap gap-2 max-w-[120px] justify-center">
            {minHeap.map((val, i) => (
              <motion.div
                key={i}
                layout
                className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold"
              >
                {val}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center bg-zinc-800/50 p-4 rounded-xl border border-zinc-700 w-full">
        <h4 className="text-zinc-400 text-xs font-medium mb-1">
          {language === 'en' ? 'Current Median' : '当前中位数'}
        </h4>
        <p className="text-white font-mono text-2xl font-bold">{median}</p>
      </div>
    </div>
  );
};

export const KWayMergeVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const lists = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
  const [pointers, setPointers] = useState([0, 0, 0]);
  const [result, setResult] = useState<number[]>([]);
  const [heap, setHeap] = useState<number[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (result.length === 9) {
        setPointers([0, 0, 0]);
        setResult([]);
        setHeap([]);
        return;
      }

      // Find smallest among current pointers
      let minVal = Infinity;
      let minIdx = -1;
      for (let i = 0; i < lists.length; i++) {
        if (pointers[i] < lists[i].length) {
          if (lists[i][pointers[i]] < minVal) {
            minVal = lists[i][pointers[i]];
            minIdx = i;
          }
        }
      }

      if (minIdx !== -1) {
        setResult(prev => [...prev, minVal]);
        const nextPointers = [...pointers];
        nextPointers[minIdx]++;
        setPointers(nextPointers);
      }
    }, 1500);
    return () => clearInterval(timer);
  }, [pointers, result]);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800 w-full">
      <div className="flex flex-col gap-4 w-full">
        {lists.map((list, i) => (
          <div key={i} className="flex gap-2 items-center">
            <div className="text-[10px] text-zinc-500 font-bold w-12">List {i+1}</div>
            <div className="flex gap-2">
              {list.map((val, j) => (
                <motion.div
                  key={j}
                  animate={{
                    opacity: j < pointers[i] ? 0.2 : 1,
                    scale: j === pointers[i] ? 1.1 : 1,
                    borderColor: j === pointers[i] ? '#3b82f6' : '#27272a'
                  }}
                  className="w-8 h-8 rounded bg-zinc-800 border flex items-center justify-center text-white font-mono text-xs"
                >
                  {val}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 w-full">
        <div className="text-zinc-400 text-[10px] uppercase font-bold tracking-widest">Merged Result</div>
        <div className="flex flex-wrap gap-2 justify-center min-h-[40px]">
          {result.map((val, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-8 h-8 rounded bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold"
            >
              {val}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CyclicSortVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const [array, setArray] = useState([3, 1, 5, 4, 2]);
  const [i, setI] = useState(0);
  const [swapping, setSwapping] = useState<[number, number] | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (i >= array.length) {
        setArray([3, 1, 5, 4, 2]);
        setI(0);
        setSwapping(null);
        return;
      }

      const correctIdx = array[i] - 1;
      if (array[i] !== array[correctIdx]) {
        setSwapping([i, correctIdx]);
        setTimeout(() => {
          const nextArray = [...array];
          [nextArray[i], nextArray[correctIdx]] = [nextArray[correctIdx], nextArray[i]];
          setArray(nextArray);
          setSwapping(null);
        }, 800);
      } else {
        setI(prev => prev + 1);
      }
    }, 2000);
    return () => clearInterval(timer);
  }, [i, array]);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
      <div className="flex gap-4 items-center h-24">
        {array.map((val, idx) => {
          const isCurrent = idx === i;
          const isSwapping = swapping?.includes(idx);
          return (
            <div key={idx} className="relative flex flex-col items-center">
              <motion.div
                animate={{
                  backgroundColor: isSwapping ? '#a855f7' : isCurrent ? '#3b82f6' : '#27272a',
                  borderColor: isSwapping ? '#d8b4fe' : isCurrent ? '#60a5fa' : '#3f3f46',
                  y: isSwapping ? -10 : 0,
                  scale: isCurrent ? 1.1 : 1,
                }}
                className="w-12 h-12 rounded-xl border flex items-center justify-center text-white font-mono text-sm font-bold"
              >
                {val}
              </motion.div>
              <div className="absolute -bottom-6 text-[8px] text-zinc-500 font-mono">idx: {idx}</div>
              {isCurrent && (
                <motion.div layoutId="cs-ptr" className="absolute -top-6 text-blue-400 text-[8px] font-bold uppercase">Current</motion.div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="text-center">
        <p className="text-white font-mono text-lg">
          {i < array.length 
            ? (swapping 
                ? (language === 'en' ? `Swapping ${array[swapping[0]]} and ${array[swapping[1]]}` : `交换 ${array[swapping[0]]} 和 ${array[swapping[1]]}`)
                : (language === 'en' ? `Checking index ${i}...` : `检查索引 ${i}...`))
            : (language === 'en' ? 'Array Sorted!' : '数组已排序！')}
        </p>
      </div>
    </div>
  );
};

export const UnionFindVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const [parent, setParent] = useState([0, 1, 2, 3, 4]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => (s + 1) % 4);
      if (step === 0) setParent([0, 1, 2, 3, 4]);
      else if (step === 1) setParent([0, 0, 2, 3, 4]); // Union(0, 1)
      else if (step === 2) setParent([0, 0, 2, 2, 4]); // Union(2, 3)
      else if (step === 3) setParent([0, 0, 0, 2, 4]); // Union(0, 2)
    }, 2000);
    return () => clearInterval(timer);
  }, [step]);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800 w-full">
      <div className="flex gap-8 items-center justify-center h-32">
        {parent.map((p, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <motion.div
              animate={{
                backgroundColor: p === i ? '#27272a' : '#3b82f6',
                borderColor: p === i ? '#3f3f46' : '#60a5fa',
              }}
              className="w-12 h-12 rounded-full border flex items-center justify-center text-white font-mono text-sm font-bold"
            >
              {i}
            </motion.div>
            <div className="text-[10px] text-zinc-500">Parent: {p}</div>
            {p !== i && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-blue-400 text-[10px] font-bold"
              >
                ↑
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-white font-mono text-lg">
          {step === 0 ? (language === 'en' ? 'Initial state' : '初始状态') :
           step === 1 ? (language === 'en' ? 'Union(0, 1)' : '合并(0, 1)') :
           step === 2 ? (language === 'en' ? 'Union(2, 3)' : '合并(2, 3)') :
           (language === 'en' ? 'Union(0, 2)' : '合并(0, 2)')}
        </p>
      </div>
    </div>
  );
};

export const TrieVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const words = ['cat', 'car', 'cap'];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (charIdx < words[currentWordIdx].length) {
        setCharIdx(prev => prev + 1);
      } else {
        setCharIdx(0);
        setCurrentWordIdx(prev => (prev + 1) % words.length);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [currentWordIdx, charIdx]);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800 w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="text-zinc-400 text-xs uppercase font-bold tracking-widest">Inserting: {words[currentWordIdx]}</div>
        <div className="flex gap-2">
          {words[currentWordIdx].split('').map((char, i) => (
            <motion.div
              key={i}
              animate={{
                backgroundColor: i < charIdx ? '#10b981' : i === charIdx ? '#3b82f6' : '#27272a',
                scale: i === charIdx ? 1.2 : 1,
              }}
              className="w-10 h-10 rounded-lg border border-zinc-700 flex items-center justify-center text-white font-mono text-sm font-bold"
            >
              {char}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="relative h-48 w-full flex justify-center items-start pt-4">
        {/* Simple visual representation of Trie nodes */}
        <div className="flex flex-col items-center gap-8">
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] text-zinc-500">ROOT</div>
          <div className="flex gap-12">
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{ backgroundColor: charIdx > 0 && words[currentWordIdx][0] === 'c' ? '#10b981' : '#27272a' }}
                className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-white font-mono text-xs"
              >
                c
              </motion.div>
              <div className="flex gap-8">
                <motion.div
                  animate={{ backgroundColor: charIdx > 1 && words[currentWordIdx][1] === 'a' ? '#10b981' : '#27272a' }}
                  className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-white font-mono text-xs"
                >
                  a
                </motion.div>
                <div className="flex gap-4 mt-8">
                  <motion.div
                    animate={{ backgroundColor: charIdx > 2 && words[currentWordIdx][2] === 't' ? '#10b981' : '#27272a' }}
                    className="w-6 h-6 rounded-full border border-zinc-700 flex items-center justify-center text-white font-mono text-[10px]"
                  >
                    t
                  </motion.div>
                  <motion.div
                    animate={{ backgroundColor: charIdx > 2 && words[currentWordIdx][2] === 'r' ? '#10b981' : '#27272a' }}
                    className="w-6 h-6 rounded-full border border-zinc-700 flex items-center justify-center text-white font-mono text-[10px]"
                  >
                    r
                  </motion.div>
                  <motion.div
                    animate={{ backgroundColor: charIdx > 2 && words[currentWordIdx][2] === 'p' ? '#10b981' : '#27272a' }}
                    className="w-6 h-6 rounded-full border border-zinc-700 flex items-center justify-center text-white font-mono text-[10px]"
                  >
                    p
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MonotonicStackVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const array = [4, 5, 2, 10, 8];
  const [stack, setStack] = useState<number[]>([]);
  const [idx, setIdx] = useState(0);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      if (idx >= array.length) {
        setStack([]);
        setIdx(0);
        setStatus('Restarting...');
        return;
      }

      const current = array[idx];
      if (stack.length > 0 && stack[stack.length - 1] < current) {
        setStatus(`Popping ${stack[stack.length - 1]} (less than ${current})`);
        setStack(prev => prev.slice(0, -1));
      } else {
        setStatus(`Pushing ${current}`);
        setStack(prev => [...prev, current]);
        setIdx(prev => prev + 1);
      }
    }, 1500);
    return () => clearInterval(timer);
  }, [idx, stack]);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800 w-full">
      <div className="flex gap-4 items-center">
        {array.map((val, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: i < idx ? 0.3 : 1,
              scale: i === idx ? 1.2 : 1,
              borderColor: i === idx ? '#3b82f6' : '#27272a'
            }}
            className="w-10 h-10 rounded-lg border border-zinc-700 flex items-center justify-center text-white font-mono text-sm font-bold"
          >
            {val}
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col-reverse items-center gap-2 w-24 h-48 border-x-2 border-b-2 border-zinc-800 p-2">
        <AnimatePresence>
          {stack.map((val, i) => (
            <motion.div
              key={`${val}-${i}`}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              className="w-full h-8 rounded bg-blue-500/20 border border-blue-500 flex items-center justify-center text-blue-400 font-mono text-xs font-bold"
            >
              {val}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="text-center">
        <p className="text-zinc-400 text-xs uppercase font-bold tracking-widest mb-2">Stack Status</p>
        <p className="text-white font-mono text-sm">{status}</p>
      </div>
    </div>
  );
};

export const BitwiseXORVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const array = [4, 1, 2, 1, 2];
  const [result, setResult] = useState(0);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (idx >= array.length) {
        setResult(0);
        setIdx(0);
        return;
      }
      setResult(prev => prev ^ array[idx]);
      setIdx(prev => prev + 1);
    }, 1500);
    return () => clearInterval(timer);
  }, [idx]);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800 w-full">
      <div className="flex gap-4 items-center">
        {array.map((val, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: i < idx ? 0.3 : 1,
              scale: i === idx ? 1.2 : 1,
              borderColor: i === idx ? '#3b82f6' : '#27272a'
            }}
            className="w-10 h-10 rounded-lg border border-zinc-700 flex items-center justify-center text-white font-mono text-sm font-bold"
          >
            {val}
          </motion.div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <div className="text-zinc-500 font-mono text-2xl">Result:</div>
        <motion.div
          key={result}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-emerald-400 font-mono text-4xl font-bold"
        >
          {result}
        </motion.div>
      </div>
      <div className="text-center">
        <p className="text-zinc-500 text-xs font-mono">
          {idx > 0 && `${result ^ array[idx-1]} ^ ${array[idx-1]} = ${result}`}
        </p>
      </div>
    </div>
  );
};

export const GreedyVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const jumps = [2, 3, 1, 1, 4];
  const [current, setCurrent] = useState(0);
  const [farthest, setFarthest] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (current >= jumps.length - 1) {
        setCurrent(0);
        setFarthest(0);
        return;
      }
      const nextFarthest = Math.max(farthest, current + jumps[current]);
      setFarthest(nextFarthest);
      setCurrent(prev => prev + 1);
    }, 2000);
    return () => clearInterval(timer);
  }, [current, farthest]);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800 w-full">
      <div className="flex gap-4 items-center h-24">
        {jumps.map((val, i) => (
          <div key={i} className="relative flex flex-col items-center">
            <motion.div
              animate={{
                backgroundColor: i === current ? '#3b82f6' : i <= farthest ? '#10b98120' : '#27272a',
                borderColor: i === current ? '#60a5fa' : i <= farthest ? '#10b981' : '#3f3f46',
              }}
              className="w-12 h-12 rounded-xl border flex items-center justify-center text-white font-mono text-sm font-bold"
            >
              {val}
            </motion.div>
            {i === current && (
              <motion.div layoutId="greedy-ptr" className="absolute -top-6 text-blue-400 text-[8px] font-bold uppercase">Current</motion.div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h4 className="text-zinc-400 text-xs font-medium mb-1">
          {language === 'en' ? 'Farthest Reachable' : '最远可达'}
        </h4>
        <p className="text-emerald-400 font-mono text-2xl font-bold">{farthest}</p>
      </div>
    </div>
  );
};


export const SlidingWindowVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [step, setStep] = useState(0);
  const array = [4, 2, 1, 7, 8, 1, 2, 8, 1, 0];
  const k = 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % (array.length + 1));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (step < k) {
      setRight(step);
      setLeft(0);
    } else if (step < array.length) {
      setRight(step);
      setLeft(step - k + 1);
    } else {
      setLeft(0);
      setRight(0);
    }
  }, [step]);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
      <div className="flex gap-2 relative h-24 items-end">
        {array.map((val, i) => {
          const isInside = i >= left && i <= right;
          return (
            <div key={i} className="relative flex flex-col items-center">
              <motion.div
                animate={{
                  height: val * 10 + 40,
                  backgroundColor: isInside ? '#10b981' : '#3f3f46',
                  scale: isInside ? 1.05 : 1,
                }}
                className="w-10 rounded-t-lg flex items-center justify-center text-white font-mono text-sm"
              >
                {val}
              </motion.div>
              <div className="text-zinc-500 text-xs mt-2 font-mono">{i}</div>
              
              {i === left && (
                <motion.div 
                  layoutId="left-ptr"
                  className="absolute -top-8 text-emerald-400 text-[10px] font-bold uppercase tracking-wider"
                >
                  {language === 'en' ? 'Left' : '左'}
                </motion.div>
              )}
              {i === right && (
                <motion.div 
                  layoutId="right-ptr"
                  className="absolute -top-12 text-blue-400 text-[10px] font-bold uppercase tracking-wider"
                >
                  {language === 'en' ? 'Right' : '右'}
                </motion.div>
              )}
            </div>
          );
        })}
        
        <motion.div
          animate={{
            left: left * 48,
            width: (right - left + 1) * 48 - 8,
          }}
          className="absolute bottom-10 h-1 border-2 border-emerald-500/30 rounded-full"
          style={{ pointerEvents: 'none' }}
        />
      </div>
      
      <div className="text-center">
        <h4 className="text-zinc-400 text-sm font-medium mb-1">
          {language === 'en' ? 'Current State' : '当前状态'}
        </h4>
        <p className="text-white font-mono text-lg">
          {language === 'en' ? 'Window' : '窗口'}: [{left}, {right}] | {language === 'en' ? 'Sum' : '和'}: {array.slice(left, right + 1).reduce((a, b) => a + b, 0)}
        </p>
      </div>
    </div>
  );
};

export const TwoPointersVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const array = [1, 2, 3, 4, 6, 8, 9, 11, 15];
  const target = 14;
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(array.length - 1);
  const [found, setFound] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const sum = array[left] + array[right];
      if (sum === target) {
        setFound(true);
        return;
      }
      if (left >= right) {
        setLeft(0);
        setRight(array.length - 1);
        setFound(false);
        return;
      }
      
      if (sum < target) {
        setLeft(l => l + 1);
      } else {
        setRight(r => r - 1);
      }
    }, 1500);
    return () => clearInterval(timer);
  }, [left, right]);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
      <div className="flex gap-2 relative h-24 items-center">
        {array.map((val, i) => {
          const isPointer = i === left || i === right;
          const isTarget = found && isPointer;
          return (
            <div key={i} className="relative flex flex-col items-center">
              <motion.div
                animate={{
                  backgroundColor: isTarget ? '#10b981' : isPointer ? '#3b82f6' : '#27272a',
                  scale: isPointer ? 1.1 : 1,
                  borderColor: isPointer ? '#60a5fa' : '#3f3f46',
                }}
                className="w-12 h-12 rounded-xl border flex items-center justify-center text-white font-mono text-lg"
              >
                {val}
              </motion.div>
              
              {i === left && (
                <motion.div layoutId="tp-left" className="absolute -bottom-6 text-blue-400 text-[10px] font-bold uppercase">L</motion.div>
              )}
              {i === right && (
                <motion.div layoutId="tp-right" className="absolute -bottom-6 text-blue-400 text-[10px] font-bold uppercase">R</motion.div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="text-center">
        <h4 className="text-zinc-400 text-sm font-medium mb-1">
          {language === 'en' ? 'Target' : '目标'}: {target}
        </h4>
        <p className={cn("font-mono text-lg", found ? "text-emerald-400" : "text-white")}>
          {array[left]} + {array[right]} = {array[left] + array[right]}
          {found && (language === 'en' ? " (Found!)" : " (已找到!)")}
        </p>
      </div>
    </div>
  );
};

export const DFSVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const [visited, setVisited] = useState<number[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  
  const nodes = [
    { id: 0, x: 200, y: 40, children: [1, 2] },
    { id: 1, x: 100, y: 120, children: [3, 4] },
    { id: 2, x: 300, y: 120, children: [5, 6] },
    { id: 3, x: 60, y: 200, children: [] },
    { id: 4, x: 140, y: 200, children: [] },
    { id: 5, x: 260, y: 200, children: [] },
    { id: 6, x: 340, y: 200, children: [] },
  ];

  const dfsOrder = [0, 1, 3, 4, 2, 5, 6];

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < dfsOrder.length) {
        const nodeId = dfsOrder[i];
        setCurrent(nodeId);
        setVisited(prev => [...prev, nodeId]);
        i++;
      } else {
        setVisited([]);
        setCurrent(null);
        i = 0;
      }
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
      <svg width="400" height="260" className="overflow-visible">
        {nodes.map(node => node.children.map(childId => {
          const child = nodes.find(n => n.id === childId)!;
          return (
            <line
              key={`${node.id}-${childId}`}
              x1={node.x} y1={node.y}
              x2={child.x} y2={child.y}
              stroke="#3f3f46"
              strokeWidth="2"
            />
          );
        }))}
        
        {nodes.map(node => {
          const isVisited = visited.includes(node.id);
          const isCurrent = current === node.id;
          return (
            <g key={node.id}>
              <motion.circle
                cx={node.x} cy={node.y} r="18"
                animate={{
                  fill: isCurrent ? '#3b82f6' : isVisited ? '#10b981' : '#27272a',
                  stroke: isCurrent ? '#60a5fa' : isVisited ? '#34d399' : '#3f3f46',
                  scale: isCurrent ? 1.2 : 1,
                }}
                strokeWidth="2"
              />
              <text
                x={node.x} y={node.y}
                textAnchor="middle" dy=".3em"
                className="text-[10px] font-bold fill-white pointer-events-none"
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>
      
      <div className="text-center">
        <h4 className="text-zinc-400 text-sm font-medium mb-1">
          {language === 'en' ? 'DFS Traversal' : 'DFS 遍历'}
        </h4>
        <p className="text-white font-mono text-lg">
          {language === 'en' ? 'Visited' : '已访问'}: [{visited.join(', ')}]
        </p>
      </div>
    </div>
  );
};

export const DPVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const s1 = "ABCD";
  const s2 = "ACBD";
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [dp, setDp] = useState<number[][]>(
    Array.from({ length: s1.length + 1 }, () => Array(s2.length + 1).fill(0))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCol(c => {
        if (c < s2.length) return c + 1;
        setRow(r => (r < s1.length ? r + 1 : 0));
        return 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (row === 0 && col === 0) {
      setDp(Array.from({ length: s1.length + 1 }, () => Array(s2.length + 1).fill(0)));
      return;
    }

    if (row > 0 && col > 0) {
      setDp(prev => {
        const next = prev.map(r => [...r]);
        if (s1[row - 1] === s2[col - 1]) {
          next[row][col] = prev[row - 1][col - 1] + 1;
        } else {
          next[row][col] = Math.max(prev[row - 1][col], prev[row][col - 1]);
        }
        return next;
      });
    }
  }, [row, col]);

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-zinc-900 rounded-2xl border border-zinc-800 w-full overflow-hidden">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4 mb-2">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-zinc-500 font-bold mb-1">S1</span>
            <div className="flex gap-1">
              {s1.split('').map((char, i) => (
                <div key={i} className={cn(
                  "w-8 h-8 rounded border flex items-center justify-center font-mono text-sm",
                  row === i + 1 ? "bg-blue-500/20 border-blue-500 text-blue-400" : "bg-zinc-800 border-zinc-700 text-white"
                )}>
                  {char}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-zinc-500 font-bold mb-1">S2</span>
            <div className="flex gap-1">
              {s2.split('').map((char, i) => (
                <div key={i} className={cn(
                  "w-8 h-8 rounded border flex items-center justify-center font-mono text-sm",
                  col === i + 1 ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-zinc-800 border-zinc-700 text-white"
                )}>
                  {char}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-1 bg-zinc-800/50 p-2 rounded-lg border border-zinc-700">
          {/* Header row */}
          <div className="w-10 h-10" />
          <div className="w-10 h-10 flex items-center justify-center text-zinc-500 font-mono text-xs">""</div>
          {s2.split('').map((char, i) => (
            <div key={i} className="w-10 h-10 flex items-center justify-center text-zinc-400 font-mono text-xs font-bold">{char}</div>
          ))}

          {/* DP Table */}
          {dp.map((r, i) => (
            <React.Fragment key={i}>
              <div className="w-10 h-10 flex items-center justify-center text-zinc-400 font-mono text-xs font-bold">
                {i === 0 ? '""' : s1[i - 1]}
              </div>
              {r.map((val, j) => {
                const isCurrent = i === row && j === col;
                const isComputed = i < row || (i === row && j <= col);
                const isMatch = i > 0 && j > 0 && s1[i - 1] === s2[j - 1];
                
                return (
                  <motion.div
                    key={j}
                    animate={{
                      backgroundColor: isCurrent ? '#3b82f6' : isComputed ? '#10b98120' : '#18181b',
                      borderColor: isCurrent ? '#60a5fa' : isComputed ? '#10b98140' : '#27272a',
                      scale: isCurrent ? 1.1 : 1,
                    }}
                    className="w-10 h-10 rounded border flex items-center justify-center text-white font-mono text-sm relative"
                  >
                    {isComputed ? val : '?'}
                    {isCurrent && i > 0 && j > 0 && (
                      <div className="absolute -top-4 -left-4 pointer-events-none">
                        {isMatch ? (
                          <div className="text-blue-400 text-[10px]">↖+1</div>
                        ) : (
                          <div className="text-zinc-500 text-[10px]">max(↑,←)</div>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h4 className="text-zinc-400 text-sm font-medium mb-1">
          {language === 'en' ? 'Longest Common Subsequence' : '最长公共子序列 (LCS)'}
        </h4>
        <p className="text-white font-mono text-xs h-8">
          {row === 0 || col === 0 
            ? (language === 'en' ? 'Base Case: Empty string results in 0' : '基础情况：空字符串结果为 0')
            : s1[row - 1] === s2[col - 1]
              ? `S1[${row-1}] == S2[${col-1}] ('${s1[row-1]}') → dp[${row}][${col}] = dp[${row-1}][${col-1}] + 1`
              : `S1[${row-1}] != S2[${col-1}] → dp[${row}][${col}] = max(dp[${row-1}][${col}], dp[${row}][${col-1}])`}
        </p>
      </div>
    </div>
  );
};

export const SegmentTreeVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const array = [1, 3, 5, 7, 9, 11];
  const [step, setStep] = useState(0);
  const tree = [36, 9, 27, 4, 5, 16, 11, 1, 3, null, null, 7, 9, null, null];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => (s + 1) % tree.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
      <div className="relative w-full h-64 flex flex-col items-center">
        <div className="flex gap-16">
          <SegmentTreeNode value={tree[0]} active={step === 0} />
        </div>
        <div className="flex gap-8 mt-8">
          <SegmentTreeNode value={tree[1]} active={step === 1} />
          <SegmentTreeNode value={tree[2]} active={step === 2} />
        </div>
        <div className="flex gap-4 mt-8">
          <SegmentTreeNode value={tree[3]} active={step === 3} />
          <SegmentTreeNode value={tree[4]} active={step === 4} />
          <SegmentTreeNode value={tree[5]} active={step === 5} />
          <SegmentTreeNode value={tree[6]} active={step === 6} />
        </div>
        <div className="flex gap-2 mt-8">
          {tree.slice(7, 15).map((val, i) => (
            <SegmentTreeNode key={i} value={val} active={step === i + 7} small />
          ))}
        </div>
      </div>
      <div className="text-center">
        <h4 className="text-zinc-400 text-sm font-medium mb-1">
          {language === 'en' ? 'Segment Tree (Sum)' : '线段树 (求和)'}
        </h4>
        <p className="text-white font-mono text-lg">
          {language === 'en' ? 'Array' : '数组'}: [{array.join(', ')}]
        </p>
      </div>
    </div>
  );
};

const SegmentTreeNode: React.FC<{ value: number | null, active: boolean, small?: boolean }> = ({ value, active, small }) => {
  if (value === null) return <div className={small ? "w-6 h-6" : "w-10 h-10"} />;
  return (
    <motion.div
      animate={{
        backgroundColor: active ? '#3b82f6' : '#27272a',
        borderColor: active ? '#60a5fa' : '#3f3f46',
        scale: active ? 1.1 : 1,
      }}
      className={`${small ? "w-8 h-8 text-xs" : "w-12 h-12 text-sm"} rounded-full border flex items-center justify-center text-white font-mono`}
    >
      {value}
    </motion.div>
  );
};

export const DijkstraVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const [current, setCurrent] = useState(0);
  const nodes = [0, 1, 2, 3, 4];
  const distances = [0, 4, 1, 3, 7];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % nodes.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
      <div className="relative w-full h-48 flex items-center justify-center gap-12">
        {nodes.map((node, i) => {
          const isActive = i === current;
          const isVisited = i < current;
          return (
            <div key={i} className="flex flex-col items-center gap-2">
              <motion.div
                animate={{
                  backgroundColor: isActive ? '#3b82f6' : isVisited ? '#10b981' : '#27272a',
                  scale: isActive ? 1.2 : 1,
                }}
                className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center text-white font-mono"
              >
                {String.fromCharCode(65 + node)}
              </motion.div>
              <span className="text-xs text-zinc-500 font-mono">
                dist: {isVisited || isActive ? distances[i] : '∞'}
              </span>
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <h4 className="text-zinc-400 text-sm font-medium mb-1">
          {language === 'en' ? 'Shortest Path' : '最短路径'}
        </h4>
        <p className="text-white font-mono text-lg">
          {language === 'en' ? 'Current Node' : '当前节点'}: {String.fromCharCode(65 + current)}
        </p>
      </div>
    </div>
  );
};

export const BoyerMooreVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const array = [2, 2, 1, 1, 1, 2, 2];
  const [index, setIndex] = useState(0);
  const [candidate, setCandidate] = useState<number | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => {
        const next = (i + 1) % (array.length + 1);
        if (next === 0) {
          setCandidate(null);
          setCount(0);
          return 0;
        }
        const val = array[i];
        if (count === 0) {
          setCandidate(val);
          setCount(1);
        } else if (val === candidate) {
          setCount(c => c + 1);
        } else {
          setCount(c => c - 1);
        }
        return next;
      });
    }, 1500);
    return () => clearInterval(timer);
  }, [index, candidate, count]);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
      <div className="flex gap-2">
        {array.map((val, i) => (
          <motion.div
            key={i}
            animate={{
              backgroundColor: i === index ? '#3b82f6' : i < index ? '#27272a' : '#18181b',
              opacity: i === index ? 1 : 0.6,
              scale: i === index ? 1.1 : 1,
            }}
            className="w-10 h-10 rounded-lg border border-zinc-800 flex items-center justify-center text-white font-mono"
          >
            {val}
          </motion.div>
        ))}
      </div>
      <div className="flex gap-8">
        <div className="text-center">
          <div className="text-zinc-500 text-xs mb-1 uppercase tracking-wider">Candidate</div>
          <div className="text-2xl font-mono text-white">{candidate ?? '-'}</div>
        </div>
        <div className="text-center">
          <div className="text-zinc-500 text-xs mb-1 uppercase tracking-wider">Count</div>
          <div className="text-2xl font-mono text-white">{count}</div>
        </div>
      </div>
    </div>
  );
};

export const KadaneVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const array = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  const [index, setIndex] = useState(0);
  const [currentSum, setCurrentSum] = useState(0);
  const [maxSum, setMaxSum] = useState(-Infinity);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => {
        const next = (i + 1) % (array.length + 1);
        if (next === 0) {
          setCurrentSum(0);
          setMaxSum(-Infinity);
          return 0;
        }
        const val = array[i];
        const newSum = Math.max(val, currentSum + val);
        setCurrentSum(newSum);
        setMaxSum(prev => Math.max(prev, newSum));
        return next;
      });
    }, 1500);
    return () => clearInterval(timer);
  }, [index, currentSum]);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
      <div className="flex gap-1 flex-wrap justify-center">
        {array.map((val, i) => (
          <motion.div
            key={i}
            animate={{
              backgroundColor: i === index ? '#3b82f6' : i < index ? '#27272a' : '#18181b',
              scale: i === index ? 1.1 : 1,
            }}
            className="w-10 h-10 rounded border border-zinc-800 flex items-center justify-center text-white font-mono text-sm"
          >
            {val}
          </motion.div>
        ))}
      </div>
      <div className="flex gap-12">
        <div className="text-center">
          <div className="text-zinc-500 text-xs mb-1 uppercase tracking-wider">Current Sum</div>
          <div className="text-xl font-mono text-white">{currentSum}</div>
        </div>
        <div className="text-center">
          <div className="text-zinc-500 text-xs mb-1 uppercase tracking-wider">Global Max</div>
          <div className="text-xl font-mono text-emerald-400">{maxSum === -Infinity ? '-' : maxSum}</div>
        </div>
      </div>
    </div>
  );
};

export const KMPVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const text = "ABABDABACDABABCABAB";
  const pattern = "ABABCABAB";
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const lps = [0, 0, 1, 2, 0, 1, 2, 3, 4];

  useEffect(() => {
    const timer = setInterval(() => {
      if (j === pattern.length) {
        setI(0);
        setJ(0);
        return;
      }
      if (text[i] === pattern[j]) {
        setI(prev => (prev + 1) % text.length);
        setJ(prev => prev + 1);
      } else {
        if (j !== 0) {
          setJ(lps[j - 1]);
        } else {
          setI(prev => (prev + 1) % text.length);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [i, j]);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
      <div className="flex flex-col gap-4 w-full overflow-hidden">
        <div className="flex gap-1">
          {text.split('').map((char, idx) => (
            <motion.div
              key={idx}
              animate={{
                backgroundColor: idx === i ? '#3b82f6' : '#18181b',
                color: idx === i ? '#fff' : '#52525b',
              }}
              className="w-8 h-8 flex items-center justify-center font-mono border border-zinc-800 rounded"
            >
              {char}
            </motion.div>
          ))}
        </div>
        <div className="flex gap-1" style={{ marginLeft: (i - j) * 36 }}>
          {pattern.split('').map((char, idx) => (
            <motion.div
              key={idx}
              animate={{
                backgroundColor: idx === j ? '#10b981' : '#27272a',
                borderColor: idx === j ? '#34d399' : '#3f3f46',
              }}
              className="w-8 h-8 flex items-center justify-center font-mono border rounded text-white"
            >
              {char}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <h4 className="text-zinc-400 text-sm font-medium mb-1">KMP String Matching</h4>
        <p className="text-white font-mono">i: {i}, j: {j}</p>
      </div>
    </div>
  );
};

export const QuickSelectVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const array = [3, 2, 1, 5, 6, 4];
  const [pivotIdx, setPivotIdx] = useState(0);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(array.length - 1);
  const k = 2; // Find 2nd largest

  useEffect(() => {
    const timer = setInterval(() => {
      // Simple simulation of partitioning
      setPivotIdx(p => (p + 1) % array.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
      <div className="flex gap-2">
        {array.map((val, i) => (
          <motion.div
            key={i}
            animate={{
              backgroundColor: i === pivotIdx ? '#3b82f6' : (i >= left && i <= right) ? '#27272a' : '#18181b',
              scale: i === pivotIdx ? 1.1 : 1,
            }}
            className="w-12 h-12 rounded-xl border border-zinc-800 flex items-center justify-center text-white font-mono text-lg"
          >
            {val}
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        <h4 className="text-zinc-400 text-sm font-medium mb-1">Quick Select (K=2)</h4>
        <p className="text-white font-mono">Pivot: {array[pivotIdx]}</p>
      </div>
    </div>
  );
};

export const FloydWarshallVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const [k, setK] = useState(0);
  const matrix = [
    [0, 3, Infinity, 7],
    [8, 0, 2, Infinity],
    [5, Infinity, 0, 1],
    [2, Infinity, Infinity, 0]
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setK(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
      <div className="grid grid-cols-4 gap-2">
        {matrix.map((row, i) => (
          row.map((val, j) => (
            <motion.div
              key={`${i}-${j}`}
              animate={{
                backgroundColor: (i === k || j === k) ? '#3b82f620' : '#18181b',
                borderColor: (i === k || j === k) ? '#3b82f6' : '#27272a',
              }}
              className="w-12 h-12 rounded border flex items-center justify-center text-white font-mono text-xs"
            >
              {val === Infinity ? '∞' : val}
            </motion.div>
          ))
        ))}
      </div>
      <div className="text-center">
        <h4 className="text-zinc-400 text-sm font-medium mb-1">Floyd-Warshall Matrix</h4>
        <p className="text-white font-mono">Intermediate Node: {String.fromCharCode(65 + k)}</p>
      </div>
    </div>
  );
};

export const PrimVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const [step, setStep] = useState(0);
  const nodes = [0, 1, 2, 3, 4];
  const mstEdges = [[0, 1], [0, 2], [2, 3], [3, 4]];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => (s + 1) % (mstEdges.length + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
      <div className="relative w-64 h-64">
        {nodes.map((node, i) => {
          const isVisited = step > 0 && (i <= step);
          return (
            <motion.div
              key={i}
              animate={{
                backgroundColor: isVisited ? '#10b981' : '#27272a',
                scale: isVisited ? 1.1 : 1,
              }}
              style={{
                position: 'absolute',
                left: 100 + 80 * Math.cos(i * 2 * Math.PI / 5),
                top: 100 + 80 * Math.sin(i * 2 * Math.PI / 5),
              }}
              className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-white font-mono text-sm"
            >
              {i}
            </motion.div>
          );
        })}
      </div>
      <div className="text-center">
        <h4 className="text-zinc-400 text-sm font-medium mb-1">Prim's MST</h4>
        <p className="text-white font-mono">Edges in MST: {step}</p>
      </div>
    </div>
  );
};

export const ZAlgorithmVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const s = "aabcaabx";
  const z = [0, 1, 0, 0, 3, 1, 0, 0];
  const [i, setI] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setI(prev => (prev + 1) % s.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
      <div className="flex gap-2">
        {s.split('').map((char, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <motion.div
              animate={{
                backgroundColor: idx === i ? '#3b82f6' : '#18181b',
                scale: idx === i ? 1.1 : 1,
              }}
              className="w-10 h-10 rounded border border-zinc-800 flex items-center justify-center text-white font-mono"
            >
              {char}
            </motion.div>
            <div className="text-xs text-zinc-500 font-mono">Z[{idx}]: {z[idx]}</div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <h4 className="text-zinc-400 text-sm font-medium mb-1">Z-Algorithm</h4>
        <p className="text-white font-mono">Current Index: {i}</p>
      </div>
    </div>
  );
};

export const FenwickTreeVisualizer: React.FC<VisualizerProps> = ({ language }) => {
  const array = [1, 7, 3, 0, 5, 8, 3, 2];
  const bit = [0, 1, 8, 3, 11, 5, 13, 3, 29];
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i % 8) + 1);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <span className="w-12 text-xs text-zinc-500 font-mono self-center">Array</span>
          {array.map((val, i) => (
            <div key={i} className="w-10 h-10 rounded border border-zinc-800 flex items-center justify-center text-zinc-400 font-mono text-sm">
              {val}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <span className="w-12 text-xs text-zinc-500 font-mono self-center">BIT</span>
          {bit.slice(1).map((val, i) => (
            <motion.div
              key={i}
              animate={{
                backgroundColor: (i + 1) === index ? '#10b981' : '#18181b',
                scale: (i + 1) === index ? 1.1 : 1,
              }}
              className="w-10 h-10 rounded border border-zinc-800 flex items-center justify-center text-white font-mono text-sm"
            >
              {val}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <h4 className="text-zinc-400 text-sm font-medium mb-1">Fenwick Tree (BIT)</h4>
        <p className="text-white font-mono">Querying Prefix Sum up to index: {index}</p>
      </div>
    </div>
  );
};

