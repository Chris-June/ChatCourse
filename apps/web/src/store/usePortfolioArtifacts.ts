import { create } from 'zustand';

export type ArtifactType =
  | 'schema'
  | 'prompt'
  | 'jsonl'
  | 'experiment'
  | 'security-plan'
  | 'explanation'
  | 'note';

export interface Artifact {
  id: string;
  title: string;
  type: ArtifactType;
  module: number;
  lesson: number;
  data: unknown;
  createdAt: number;
}

interface PortfolioState {
  artifacts: Artifact[];
  addArtifact: (art: Omit<Artifact, 'id' | 'createdAt'>) => void;
  removeArtifact: (id: string) => void;
  clearArtifacts: () => void;
  exportJSON: () => void;
  exportCSV: () => void;
}

function download(filename: string, text: string, mime = 'application/json') {
  const blob = new Blob([text], { type: mime + ';charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const usePortfolioArtifacts = create<PortfolioState>((set, get) => ({
  artifacts: [],
  addArtifact: (art) =>
    set((state) => ({
      artifacts: [
        ...state.artifacts,
        {
          id: crypto.randomUUID(),
          createdAt: Date.now(),
          ...art,
        },
      ],
    })),
  removeArtifact: (id) =>
    set((state) => ({ artifacts: state.artifacts.filter((a) => a.id !== id) })),
  clearArtifacts: () => set({ artifacts: [] }),
  exportJSON: () => {
    const data = JSON.stringify(get().artifacts, null, 2);
    download('portfolio-artifacts.json', data, 'application/json');
  },
  exportCSV: () => {
    const artifacts = get().artifacts;
    const headers = ['id','title','type','module','lesson','createdAt','data'] as const;
    const escape = (s: string) => '"' + s.replace(/"/g, '""') + '"';
    const rows: string[][] = artifacts.map((a) => {
      const dataStr = typeof a.data === 'string' ? a.data.replace(/\n/g, ' ') : JSON.stringify(a.data);
      return [
        a.id,
        a.title,
        a.type,
        String(a.module),
        String(a.lesson),
        new Date(a.createdAt).toISOString(),
        dataStr,
      ];
    });
    const csv = [
      headers.join(','),
      ...rows.map((r) => r.map((cell) => escape(String(cell))).join(',')),
    ].join('\n');
    download('portfolio-artifacts.csv', csv, 'text/csv');
  },
}));
