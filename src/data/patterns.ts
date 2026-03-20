import { Pattern } from '../types';

export const PATTERNS: Pattern[] = [
  {
    id: 'sliding-window',
    title: { en: 'Sliding Window', zh: '滑动窗口' },
    category: { en: 'Array / String', zh: '数组 / 字符串' },
    difficulty: 'Medium',
    description: { 
      en: 'A technique for tracking a subset of data in an array or string by "sliding" a window of fixed or variable size.',
      zh: '通过在数组或字符串上“滑动”一个固定或可变大小的窗口，来追踪数据子集的技巧。'
    },
    example: { en: 'Maximum Sum Subarray of size K', zh: '长度为 K 的最大子数组和' },
    steps: [
      { 
        title: { en: 'Initialize', zh: '初始化' }, 
        description: { en: 'Set up two pointers (left and right) at the start of the array.', zh: '在数组开头设置两个指针（左和右）。' } 
      },
      { 
        title: { en: 'Expand', zh: '扩张' }, 
        description: { en: 'Move the right pointer to expand the window until a condition is met.', zh: '移动右指针以扩大窗口，直到满足某个条件。' } 
      },
      { 
        title: { en: 'Shrink', zh: '收缩' }, 
        description: { en: 'Move the left pointer to shrink the window while maintaining the condition.', zh: '在保持条件的同时，移动左指针以缩小窗口。' } 
      },
      { 
        title: { en: 'Update', zh: '更新' }, 
        description: { en: 'At each step, update the global maximum or minimum result.', zh: '在每一步中，更新全局最大或最小结果。' } 
      }
    ]
  },
  {
    id: 'two-pointers',
    title: { en: 'Two Pointers', zh: '双指针' },
    category: { en: 'Array / String', zh: '数组 / 字符串' },
    difficulty: 'Easy',
    description: { 
      en: 'Using two indices to traverse a data structure, often moving towards each other or at different speeds.',
      zh: '使用两个索引遍历数据结构，通常相互靠近或以不同的速度移动。'
    },
    example: { en: 'Valid Palindrome / Two Sum II', zh: '验证回文串 / 两数之和 II' },
    steps: [
      { 
        title: { en: 'Position', zh: '定位' }, 
        description: { en: 'Place pointers at the start and end (or both at the start).', zh: '将指针放在开头和结尾（或都在开头）。' } 
      },
      { 
        title: { en: 'Compare', zh: '比较' }, 
        description: { en: 'Compare the values at both pointers.', zh: '比较两个指针处的值。' } 
      },
      { 
        title: { en: 'Move', zh: '移动' }, 
        description: { en: 'Move pointers based on the comparison result (e.g., increment left if sum is too small).', zh: '根据比较结果移动指针（例如，如果和太小，则增加左指针）。' } 
      },
      { 
        title: { en: 'Terminate', zh: '终止' }, 
        description: { en: 'Stop when pointers meet or cross.', zh: '当指针相遇或交叉时停止。' } 
      }
    ]
  },
  {
    id: 'dfs-bfs',
    title: { en: 'DFS & BFS', zh: '深度/广度优先搜索' },
    category: { en: 'Tree / Graph', zh: '树 / 图' },
    difficulty: 'Medium',
    description: { 
      en: 'Fundamental graph traversal algorithms for exploring nodes in a depth-first or breadth-first manner.',
      zh: '用于以深度优先或广度优先方式探索节点的基础图遍历算法。'
    },
    example: { en: 'Binary Tree Level Order Traversal', zh: '二叉树的层序遍历' },
    steps: [
      { 
        title: { en: 'Choose Strategy', zh: '选择策略' }, 
        description: { en: 'Use a Stack (Recursion) for DFS or a Queue for BFS.', zh: 'DFS 使用栈（递归），BFS 使用队列。' } 
      },
      { 
        title: { en: 'Visit Node', zh: '访问节点' }, 
        description: { en: 'Mark the current node as visited and process its value.', zh: '将当前节点标记为已访问并处理其值。' } 
      },
      { 
        title: { en: 'Explore Neighbors', zh: '探索邻居' }, 
        description: { en: 'Add unvisited neighbors to the data structure (Stack/Queue).', zh: '将未访问的邻居添加到数据结构（栈/队列）中。' } 
      },
      { 
        title: { en: 'Repeat', zh: '重复' }, 
        description: { en: 'Continue until the data structure is empty.', zh: '继续直到数据结构为空。' } 
      }
    ]
  },
  {
    id: 'dynamic-programming',
    title: { en: 'Dynamic Programming', zh: '动态规划' },
    category: { en: 'Optimization', zh: '优化' },
    difficulty: 'Hard',
    description: { 
      en: 'Breaking down a complex problem into simpler subproblems and storing their results to avoid redundant work.',
      zh: '将复杂问题分解为更简单的子问题，并存储其结果以避免重复工作。'
    },
    example: { en: 'Climbing Stairs / Longest Common Subsequence', zh: '爬楼梯 / 最长公共子序列' },
    steps: [
      { 
        title: { en: 'Define State', zh: '定义状态' }, 
        description: { en: 'Identify the state variables (e.g., dp[i] is the max profit at step i).', zh: '识别状态变量（例如，dp[i] 是第 i 步的最大利润）。' } 
      },
      { 
        title: { en: 'Recurrence Relation', zh: '状态转移方程' }, 
        description: { en: 'Find how the current state depends on previous states.', zh: '找出当前状态如何依赖于之前的状态。' } 
      },
      { 
        title: { en: 'Base Cases', zh: '边界条件' }, 
        description: { en: 'Define the simplest subproblems (e.g., dp[0] = 1).', zh: '定义最简单的子问题（例如，dp[0] = 1）。' } 
      },
      { 
        title: { en: 'Iterate', zh: '迭代' }, 
        description: { en: 'Fill the DP table either bottom-up or top-down (memoization).', zh: '自底向上或自顶向下（记忆化）填充 DP 表。' } 
      }
    ]
  },
  {
    id: 'fast-slow-pointers',
    title: { en: 'Fast & Slow Pointers', zh: '快慢指针' },
    category: { en: 'Linked List / Array', zh: '链表 / 数组' },
    difficulty: 'Medium',
    description: { 
      en: 'Also known as the Hare & Tortoise algorithm, it uses two pointers moving at different speeds to detect cycles or find middle elements.',
      zh: '也称为龟兔赛跑算法，使用两个以不同速度移动的指针来检测环或寻找中间元素。'
    },
    example: { en: 'Linked List Cycle / Middle of the Linked List', zh: '环形链表 / 链表的中间结点' },
    steps: [
      { 
        title: { en: 'Initialize', zh: '初始化' }, 
        description: { en: 'Set both slow and fast pointers at the head of the list.', zh: '将慢指针和快指针都设置在链表的头部。' } 
      },
      { 
        title: { en: 'Iterate', zh: '迭代' }, 
        description: { en: 'Move slow pointer by one step and fast pointer by two steps.', zh: '慢指针移动一步，快指针移动两步。' } 
      },
      { 
        title: { en: 'Check Cycle', zh: '检查环' }, 
        description: { en: 'If pointers meet, a cycle exists.', zh: '如果指针相遇，则存在环。' } 
      },
      { 
        title: { en: 'Find Middle', zh: '寻找中点' }, 
        description: { en: 'If fast reaches the end, slow is at the middle.', zh: '如果快指针到达末尾，慢指针就在中间。' } 
      }
    ]
  },
  {
    id: 'merge-intervals',
    title: { en: 'Merge Intervals', zh: '合并区间' },
    category: { en: 'Array', zh: '数组' },
    difficulty: 'Medium',
    description: { 
      en: 'An efficient technique to deal with overlapping intervals by sorting and then merging them.',
      zh: '通过排序然后合并来处理重叠区间的有效技术。'
    },
    example: { en: 'Merge Intervals / Insert Interval', zh: '合并区间 / 插入区间' },
    steps: [
      { 
        title: { en: 'Sort', zh: '排序' }, 
        description: { en: 'Sort the intervals based on their start times.', zh: '根据开始时间对区间进行排序。' } 
      },
      { 
        title: { en: 'Compare', zh: '比较' }, 
        description: { en: 'Check if the current interval overlaps with the previous one.', zh: '检查当前区间是否与前一个区间重叠。' } 
      },
      { 
        title: { en: 'Merge', zh: '合并' }, 
        description: { en: 'If overlapping, update the end time of the previous interval.', zh: '如果重叠，更新前一个区间的结束时间。' } 
      },
      { 
        title: { en: 'Append', zh: '添加' }, 
        description: { en: 'If not overlapping, add the current interval to the result.', zh: '如果不重叠，将当前区间添加到结果中。' } 
      }
    ]
  },
  {
    id: 'binary-search',
    title: { en: 'Modified Binary Search', zh: '修改后的二分查找' },
    category: { en: 'Array', zh: '数组' },
    difficulty: 'Easy',
    description: { 
      en: 'A classic algorithm for searching in sorted data, with variations for finding boundaries or rotated arrays.',
      zh: '在有序数据中搜索的经典算法，有寻找边界或旋转数组的变体。'
    },
    example: { en: 'Search in Rotated Sorted Array', zh: '搜索旋转排序数组' },
    steps: [
      { 
        title: { en: 'Initialize', zh: '初始化' }, 
        description: { en: 'Set low and high pointers at the ends of the search space.', zh: '在搜索空间的末尾设置低指针和高指针。' } 
      },
      { 
        title: { en: 'Calculate Mid', zh: '计算中间值' }, 
        description: { en: 'Find the middle index to divide the search space.', zh: '找到中间索引以划分搜索空间。' } 
      },
      { 
        title: { en: 'Narrow Down', zh: '缩小范围' }, 
        description: { en: 'Discard half of the search space based on the comparison.', zh: '根据比较结果丢弃一半的搜索空间。' } 
      },
      { 
        title: { en: 'Repeat', zh: '重复' }, 
        description: { en: 'Continue until the target is found or pointers cross.', zh: '继续直到找到目标或指针交叉。' } 
      }
    ]
  },
  {
    id: 'top-k',
    title: { en: 'Top K Elements', zh: '前 K 个元素' },
    description: {
      en: 'Used to find the K largest, smallest, or most frequent elements in a set.',
      zh: '用于在一组数据中寻找前 K 个最大、最小或出现频率最高的元素。'
    },
    category: { en: 'Heap', zh: '堆' },
    difficulty: 'Medium',
    example: {
      en: 'Kth Largest Element in an Array, Top K Frequent Elements',
      zh: '数组中的第 K 个最大元素，前 K 个高频元素'
    },
    steps: [
      {
        title: { en: 'Initialize Heap', zh: '初始化堆' },
        description: { en: 'Insert first K elements into a Min-Heap.', zh: '将前 K 个元素插入小顶堆。' }
      },
      {
        title: { en: 'Iterate', zh: '遍历' },
        description: { en: 'Iterate through the remaining elements.', zh: '遍历剩余的元素。' }
      },
      {
        title: { en: 'Compare & Replace', zh: '比较与替换' },
        description: { en: 'If current element > heap root, replace root and re-heapify.', zh: '如果当前元素大于堆顶元素，替换堆顶并重新堆化。' }
      },
      {
        title: { en: 'Result', zh: '结果' },
        description: { en: 'The heap root will be the Kth largest element.', zh: '堆顶元素即为第 K 个最大的元素。' }
      }
    ]
  },
  {
    id: 'subsets',
    title: { en: 'Subsets (Backtracking)', zh: '子集 (回溯法)' },
    description: {
      en: 'Used to find all possible combinations or permutations of a set.',
      zh: '用于寻找一个集合的所有可能组合或排列。'
    },
    category: { en: 'Backtracking', zh: '回溯' },
    difficulty: 'Medium',
    example: {
      en: 'Subsets, Permutations, Combinations',
      zh: '子集，全排列，组合'
    },
    steps: [
      {
        title: { en: 'Empty Set', zh: '空集' },
        description: { en: 'Start with an empty set.', zh: '从空集开始。' }
      },
      {
        title: { en: 'Iterate', zh: '遍历' },
        description: { en: 'Iterate through elements and add them to existing subsets.', zh: '遍历元素并将其添加到现有子集中。' }
      },
      {
        title: { en: 'Recursion', zh: '递归' },
        description: { en: 'Use recursion to explore all branches (include/exclude).', zh: '使用递归探索所有分支（包含/不包含）。' }
      },
      {
        title: { en: 'Backtrack', zh: '回溯' },
        description: { en: 'Backtrack by removing the last element to explore other paths.', zh: '通过移除最后一个元素进行回溯，以探索其他路径。' }
      }
    ]
  },
  {
    id: 'topological-sort',
    title: { en: 'Topological Sort', zh: '拓扑排序' },
    description: {
      en: 'Used to find a linear ordering of vertices in a Directed Acyclic Graph (DAG).',
      zh: '用于在有向无环图 (DAG) 中寻找顶点的线性排序。'
    },
    category: { en: 'Graph', zh: '图' },
    difficulty: 'Medium',
    example: {
      en: 'Course Schedule, Alien Dictionary',
      zh: '课程表，火星词典'
    },
    steps: [
      {
        title: { en: 'In-degree', zh: '入度' },
        description: { en: 'Calculate in-degree for each vertex.', zh: '计算每个顶点的入度。' }
      },
      {
        title: { en: 'Queue', zh: '队列' },
        description: { en: 'Add all vertices with 0 in-degree to a queue.', zh: '将所有入度为 0 的顶点加入队列。' }
      },
      {
        title: { en: 'Process', zh: '处理' },
        description: { en: 'While queue is not empty, remove vertex and add to result.', zh: '当队列不为空时，移除顶点并加入结果集。' }
      },
      {
        title: { en: 'Update Neighbors', zh: '更新邻居' },
        description: { en: 'Decrement in-degree of neighbors; if neighbor in-degree becomes 0, add to queue.', zh: '减少邻居的入度；如果邻居入度变为 0，则加入队列。' }
      }
    ]
  },
  {
    id: 'two-heaps',
    title: { en: 'Two Heaps', zh: '双堆模式' },
    description: {
      en: 'Used to maintain a set of elements divided into two parts: a Max-Heap for the smaller half and a Min-Heap for the larger half.',
      zh: '用于维护一组被分为两部分的元素：一个小半部分的大顶堆和一个大半部分的小顶堆。'
    },
    category: { en: 'Heap', zh: '堆' },
    difficulty: 'Hard',
    example: {
      en: 'Find Median from Data Stream',
      zh: '数据流的中位数'
    },
    steps: [
      {
        title: { en: 'Insert', zh: '插入' },
        description: { en: 'Add number to Max-Heap or Min-Heap based on value.', zh: '根据数值大小将数字添加到大顶堆或小顶堆。' }
      },
      {
        title: { en: 'Balance', zh: '平衡' },
        description: { en: 'Ensure the size difference between heaps is at most 1.', zh: '确保两个堆的大小差异最多为 1。' }
      },
      {
        title: { en: 'Calculate Median', zh: '计算中位数' },
        description: { en: 'If sizes are equal, average the roots; otherwise, take the root of the larger heap.', zh: '如果大小相等，取堆顶平均值；否则，取较大堆的堆顶。' }
      }
    ]
  },
  {
    id: 'k-way-merge',
    title: { en: 'K-way Merge', zh: 'K 路合并' },
    description: {
      en: 'Used to merge K sorted arrays or lists into a single sorted list.',
      zh: '用于将 K 个已排序的数组或列表合并为一个已排序的列表。'
    },
    category: { en: 'Heap', zh: '堆' },
    difficulty: 'Medium',
    example: {
      en: 'Merge K Sorted Lists, Kth Smallest Number in M Sorted Lists',
      zh: '合并 K 个升序链表，M 个有序链表中的第 K 个最小数'
    },
    steps: [
      {
        title: { en: 'Initialize Heap', zh: '初始化堆' },
        description: { en: 'Insert the first element of each list into a Min-Heap.', zh: '将每个列表的第一个元素插入小顶堆。' }
      },
      {
        title: { en: 'Extract Min', zh: '提取最小' },
        description: { en: 'Remove the smallest element from the heap and add it to the result.', zh: '从堆中移除最小元素并将其添加到结果集中。' }
      },
      {
        title: { en: 'Add Next', zh: '添加下一个' },
        description: { en: 'Insert the next element from the same list into the heap.', zh: '将同一列表中的下一个元素插入堆中。' }
      }
    ]
  },
  {
    id: 'cyclic-sort',
    title: { en: 'Cyclic Sort', zh: '循环排序' },
    description: {
      en: 'Used to sort an array containing numbers in a given range (e.g., 1 to n).',
      zh: '用于对包含给定范围内数字（例如 1 到 n）的数组进行排序。'
    },
    category: { en: 'Array', zh: '数组' },
    difficulty: 'Easy',
    example: {
      en: 'Find the Missing Number, Find all Duplicates in an Array',
      zh: '缺失数字，数组中所有重复的数字'
    },
    steps: [
      {
        title: { en: 'Iterate', zh: '遍历' },
        description: { en: 'Iterate through the array one element at a time.', zh: '逐个遍历数组中的元素。' }
      },
      {
        title: { en: 'Check Position', zh: '检查位置' },
        description: { en: 'If the current number is not at its correct index (i.e., nums[i] != i + 1), swap it.', zh: '如果当前数字不在正确索引处（即 nums[i] != i + 1），则交换它。' }
      },
      {
        title: { en: 'Repeat or Move', zh: '重复或移动' },
        description: { en: 'Repeat the swap for the current index until the correct number is found, then move to the next index.', zh: '对当前索引重复交换，直到找到正确的数字，然后移动到下一个索引。' }
      }
    ]
  },
  {
    id: 'union-find',
    title: { en: 'Union Find (DSU)', zh: '并查集' },
    description: {
      en: 'A data structure that tracks a set of elements partitioned into several disjoint subsets.',
      zh: '一种用于跟踪被划分为多个不相交子集的元素集合的数据结构。'
    },
    category: { en: 'Graph', zh: '图' },
    difficulty: 'Medium',
    example: {
      en: 'Number of Connected Components, Graph Valid Tree',
      zh: '连通分量的数量，以图判树'
    },
    steps: [
      {
        title: { en: 'Initialize', zh: '初始化' },
        description: { en: 'Each element is its own parent (self-loop).', zh: '每个元素都是自己的父节点（自环）。' }
      },
      {
        title: { en: 'Find', zh: '查找' },
        description: { en: 'Find the root of the set containing an element, using path compression.', zh: '使用路径压缩查找包含某个元素的集合的根节点。' }
      },
      {
        title: { en: 'Union', zh: '合并' },
        description: { en: 'Merge two sets by connecting their roots, using union by rank/size.', zh: '通过连接两个集合的根节点来合并它们，使用按秩/大小合并。' }
      }
    ]
  },
  {
    id: 'trie',
    title: { en: 'Trie (Prefix Tree)', zh: '字典树 (前缀树)' },
    description: {
      en: 'A tree-like data structure used for efficient retrieval of keys in a dataset of strings.',
      zh: '一种树形数据结构，用于高效检索字符串数据集中的键。'
    },
    category: { en: 'String / Tree', zh: '字符串 / 树' },
    difficulty: 'Medium',
    example: {
      en: 'Implement Trie, Word Search II',
      zh: '实现 Trie (前缀树)，单词搜索 II'
    },
    steps: [
      {
        title: { en: 'Root Node', zh: '根节点' },
        description: { en: 'Start with an empty root node representing an empty string.', zh: '从代表空字符串的空根节点开始。' }
      },
      {
        title: { en: 'Insert', zh: '插入' },
        description: { en: 'For each character in the word, create a child node if it doesn\'t exist.', zh: '对于单词中的每个字符，如果子节点不存在则创建它。' }
      },
      {
        title: { en: 'Mark End', zh: '标记结尾' },
        description: { en: 'Mark the last node of a word as the end of a complete string.', zh: '将单词的最后一个节点标记为完整字符串的结尾。' }
      }
    ]
  },
  {
    id: 'monotonic-stack',
    title: { en: 'Monotonic Stack', zh: '单调栈' },
    description: {
      en: 'A stack that maintains elements in a specific order (increasing or decreasing) to solve range-based problems.',
      zh: '一种以特定顺序（递增或递减）维护元素的栈，用于解决基于范围的问题。'
    },
    category: { en: 'Stack', zh: '栈' },
    difficulty: 'Medium',
    example: {
      en: 'Next Greater Element, Daily Temperatures',
      zh: '下一个更大元素，每日温度'
    },
    steps: [
      {
        title: { en: 'Iterate', zh: '遍历' },
        description: { en: 'Traverse the array elements one by one.', zh: '逐个遍历数组元素。' }
      },
      {
        title: { en: 'Maintain Order', zh: '维护顺序' },
        description: { en: 'While the stack is not empty and the current element breaks the monotonic property, pop elements.', zh: '当栈不为空且当前元素破坏单调性时，弹出元素。' }
      },
      {
        title: { en: 'Push', zh: '入栈' },
        description: { en: 'Push the current element (or its index) onto the stack.', zh: '将当前元素（或其索引）压入栈中。' }
      }
    ]
  },
  {
    id: 'bitwise-xor',
    title: { en: 'Bitwise XOR', zh: '位运算 XOR' },
    description: {
      en: 'Using the properties of XOR (a ^ a = 0, a ^ 0 = a) to solve problems involving duplicates or missing numbers.',
      zh: '利用 XOR 的性质（a ^ a = 0, a ^ 0 = a）来解决涉及重复或缺失数字的问题。'
    },
    category: { en: 'Bit Manipulation', zh: '位运算' },
    difficulty: 'Easy',
    example: {
      en: 'Single Number, Missing Number',
      zh: '只出现一次的数字，缺失数字'
    },
    steps: [
      {
        title: { en: 'Initialize', zh: '初始化' },
        description: { en: 'Start with a variable (usually 0).', zh: '从一个变量（通常为 0）开始。' }
      },
      {
        title: { en: 'XOR All', zh: '异或全部' },
        description: { en: 'XOR every element in the array with the variable.', zh: '将数组中的每个元素与该变量进行异或。' }
      },
      {
        title: { en: 'Result', zh: '结果' },
        description: { en: 'The final value will be the unique element or the missing number.', zh: '最终值将是唯一的元素或缺失的数字。' }
      }
    ]
  },
  {
    id: 'greedy',
    title: { en: 'Greedy', zh: '贪心算法' },
    description: {
      en: 'Making the locally optimal choice at each step with the hope of finding a global optimum.',
      zh: '在每一步都做出局部最优选择，希望以此找到全局最优解。'
    },
    category: { en: 'Optimization', zh: '优化' },
    difficulty: 'Medium',
    example: {
      en: 'Jump Game, Gas Station',
      zh: '跳跃游戏，加油站'
    },
    steps: [
      {
        title: { en: 'Local Choice', zh: '局部选择' },
        description: { en: 'Identify the best choice at the current step.', zh: '确定当前步骤的最佳选择。' }
      },
      {
        title: { en: 'Feasibility', zh: '可行性' },
        description: { en: 'Ensure the choice is valid and doesn\'t violate constraints.', zh: '确保选择有效且不违反约束。' }
      },
      {
        title: { en: 'No Regret', zh: '不后悔' },
        description: { en: 'Once a choice is made, it is never reconsidered.', zh: '一旦做出选择，就永远不再重新考虑。' }
      }
    ]
  },
  {
    id: 'segment-tree',
    title: { en: 'Segment Tree', zh: '线段树' },
    description: {
      en: 'A tree data structure for storing information about intervals or segments.',
      zh: '一种用于存储有关区间或细分信息的数据结构。'
    },
    category: { en: 'Advanced Data Structures', zh: '高级数据结构' },
    difficulty: 'Hard',
    example: {
      en: 'Range Sum Query, Range Minimum Query',
      zh: '区域和检索，区间最小值查询'
    },
    steps: [
      {
        title: { en: 'Build', zh: '构建' },
        description: { en: 'Construct the tree from the input array.', zh: '从输入数组构建树。' }
      },
      {
        title: { en: 'Query', zh: '查询' },
        description: { en: 'Retrieve information about a specific range.', zh: '检索有关特定范围的信息。' }
      },
      {
        title: { en: 'Update', zh: '更新' },
        description: { en: 'Modify an element and update the tree.', zh: '修改元素并更新树。' }
      }
    ]
  },
  {
    id: 'dijkstra',
    title: { en: 'Dijkstra\'s Algorithm', zh: '迪杰斯特拉算法' },
    description: {
      en: 'Finding the shortest paths between nodes in a graph.',
      zh: '寻找图中节点之间的最短路径。'
    },
    category: { en: 'Graph', zh: '图' },
    difficulty: 'Hard',
    example: {
      en: 'Network Delay Time, Path with Maximum Probability',
      zh: '网络延迟时间，概率最大的路径'
    },
    steps: [
      {
        title: { en: 'Initialize', zh: '初始化' },
        description: { en: 'Set distances to infinity and start node to zero.', zh: '将距离设置为无穷大，起始节点设置为零。' }
      },
      {
        title: { en: 'Priority Queue', zh: '优先队列' },
        description: { en: 'Use a min-heap to pick the node with the smallest distance.', zh: '使用最小堆选取距离最小的节点。' }
      },
      {
        title: { en: 'Relaxation', zh: '松弛操作' },
        description: { en: 'Update distances to neighbors if a shorter path is found.', zh: '如果发现更短的路径，则更新邻居的距离。' }
      }
    ]
  },
  {
    id: 'boyer-moore',
    title: { en: 'Boyer-Moore Voting', zh: '摩尔投票法' },
    description: {
      en: 'Finding the majority element in an array in linear time and constant space.',
      zh: '在线性时间和常数空间内寻找数组中的多数元素。'
    },
    category: { en: 'Array', zh: '数组' },
    difficulty: 'Medium',
    example: {
      en: 'Majority Element I & II',
      zh: '多数元素 I & II'
    },
    steps: [
      {
        title: { en: 'Candidate', zh: '候选人' },
        description: { en: 'Pick a candidate and maintain a counter.', zh: '选取一个候选人并维护一个计数器。' }
      },
      {
        title: { en: 'Vote', zh: '投票' },
        description: { en: 'Increment counter if same as candidate, else decrement.', zh: '如果与候选人相同则增加计数器，否则减少。' }
      },
      {
        title: { en: 'Reset', zh: '重置' },
        description: { en: 'If counter reaches zero, pick a new candidate.', zh: '如果计数器归零，选取新的候选人。' }
      }
    ]
  },
  {
    id: 'kadane',
    title: { en: 'Kadane\'s Algorithm', zh: '卡登算法' },
    description: {
      en: 'Finding the maximum subarray sum in a one-dimensional array.',
      zh: '在一维数组中寻找最大子数组和。'
    },
    category: { en: 'Dynamic Programming', zh: '动态规划' },
    difficulty: 'Medium',
    example: {
      en: 'Maximum Subarray, Maximum Product Subarray',
      zh: '最大子数组和，最大乘积子数组'
    },
    steps: [
      {
        title: { en: 'Current Max', zh: '当前最大值' },
        description: { en: 'Decide whether to start a new subarray or extend the current one.', zh: '决定是开始一个新的子数组还是扩展当前的子数组。' }
      },
      {
        title: { en: 'Global Max', zh: '全局最大值' },
        description: { en: 'Keep track of the maximum sum seen so far.', zh: '记录到目前为止看到的最大和。' }
      }
    ]
  },
  {
    id: 'kmp',
    title: { en: 'KMP Algorithm', zh: 'KMP 算法' },
    description: {
      en: 'Efficient string matching algorithm using a prefix table.',
      zh: '使用前缀表的高效字符串匹配算法。'
    },
    category: { en: 'String', zh: '字符串' },
    difficulty: 'Hard',
    example: {
      en: 'Find the Index of the First Occurrence in a String',
      zh: '找出字符串中第一个匹配项的下标'
    },
    steps: [
      {
        title: { en: 'Prefix Table', zh: '前缀表 (LPS)' },
        description: { en: 'Precompute the Longest Prefix which is also a Suffix.', zh: '预计算最长相等前后缀。' }
      },
      {
        title: { en: 'Matching', zh: '匹配' },
        description: { en: 'Use the LPS table to avoid redundant comparisons.', zh: '使用 LPS 表避免冗余比较。' }
      }
    ]
  },
  {
    id: 'quick-select',
    title: { en: 'Quick Select', zh: '快速选择' },
    description: {
      en: 'Finding the kth smallest/largest element in an unordered list.',
      zh: '在无序列表中寻找第 k 小/大的元素。'
    },
    category: { en: 'Divide and Conquer', zh: '分治' },
    difficulty: 'Medium',
    example: {
      en: 'Kth Largest Element in an Array',
      zh: '数组中的第 K 个最大元素'
    },
    steps: [
      {
        title: { en: 'Partition', zh: '分区' },
        description: { en: 'Pick a pivot and partition the array.', zh: '选取一个基准值并对数组进行分区。' }
      },
      {
        title: { en: 'Recurse', zh: '递归' },
        description: { en: 'Recurse only into the side that contains the kth element.', zh: '仅对包含第 k 个元素的一侧进行递归。' }
      }
    ]
  },
  {
    id: 'floyd-warshall',
    title: { en: 'Floyd-Warshall', zh: '弗洛伊德算法' },
    description: {
      en: 'Finding shortest paths in a weighted graph with positive or negative edge weights.',
      zh: '在具有正或负边权的加权图中寻找最短路径。'
    },
    category: { en: 'Graph', zh: '图' },
    difficulty: 'Hard',
    example: {
      en: 'Find the City With the Smallest Number of Neighbors at a Threshold Distance',
      zh: '找到距离阈值内邻居最少的城市'
    },
    steps: [
      {
        title: { en: 'Matrix', zh: '矩阵' },
        description: { en: 'Initialize a distance matrix.', zh: '初始化距离矩阵。' }
      },
      {
        title: { en: 'Triple Loop', zh: '三重循环' },
        description: { en: 'Iterate through all pairs of nodes using each node as an intermediate.', zh: '使用每个节点作为中间节点，迭代所有节点对。' }
      }
    ]
  },
  {
    id: 'prim',
    title: { en: 'Prim\'s Algorithm', zh: '普里姆算法' },
    description: {
      en: 'Finding a minimum spanning tree for a weighted undirected graph.',
      zh: '寻找加权无向图的最小生成树。'
    },
    category: { en: 'Graph', zh: '图' },
    difficulty: 'Hard',
    example: {
      en: 'Min Cost to Connect All Points',
      zh: '连接所有点的最小费用'
    },
    steps: [
      {
        title: { en: 'Start Node', zh: '起始节点' },
        description: { en: 'Pick an arbitrary starting node.', zh: '选取一个任意起始节点。' }
      },
      {
        title: { en: 'Min Edge', zh: '最小边' },
        description: { en: 'Repeatedly add the shortest edge that connects a visited node to an unvisited one.', zh: '重复添加连接已访问节点和未访问节点的最短边。' }
      }
    ]
  },
  {
    id: 'z-algorithm',
    title: { en: 'Z-Algorithm', zh: 'Z 算法' },
    description: {
      en: 'Linear time string matching using the Z-array.',
      zh: '使用 Z 数组的线性时间字符串匹配。'
    },
    category: { en: 'String', zh: '字符串' },
    difficulty: 'Hard',
    example: {
      en: 'Find the Index of the First Occurrence in a String',
      zh: '找出字符串中第一个匹配项的下标'
    },
    steps: [
      {
        title: { en: 'Z-Array', zh: 'Z 数组' },
        description: { en: 'Compute the length of the longest common prefix between S and S[i..].', zh: '计算 S 和 S[i..] 之间的最长公共前缀长度。' }
      },
      {
        title: { en: 'Window', zh: '窗口 [L, R]' },
        description: { en: 'Maintain a window that matches a prefix of the string.', zh: '维护一个匹配字符串前缀的窗口。' }
      }
    ]
  },
  {
    id: 'fenwick-tree',
    title: { en: 'Fenwick Tree (BIT)', zh: '树状数组' },
    description: {
      en: 'A data structure that can efficiently update elements and calculate prefix sums.',
      zh: '一种可以高效更新元素并计算前缀和的数据结构。'
    },
    category: { en: 'Advanced Data Structures', zh: '高级数据结构' },
    difficulty: 'Hard',
    example: {
      en: 'Range Sum Query - Mutable',
      zh: '区域和检索 - 可变'
    },
    steps: [
      {
        title: { en: 'Update', zh: '更新' },
        description: { en: 'Add a value to an element and propagate changes using bit manipulation.', zh: '向元素添加值并使用位操作传播更改。' }
      },
      {
        title: { en: 'Query', zh: '查询' },
        description: { en: 'Calculate prefix sum by traversing the tree using bit manipulation.', zh: '通过使用位操作遍历树来计算前缀和。' }
      }
    ]
  }
];
