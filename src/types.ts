export type Language = 'en' | 'zh';

export interface Step {
  title: { en: string; zh: string };
  description: { en: string; zh: string };
}

export interface Pattern {
  id: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  steps: Step[];
  example: { en: string; zh: string };
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: { en: string; zh: string };
}
