import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ClassifiedTextResult, Tag } from './types';

interface Store {
  tagsIndex: number;
  tags: Tag[];
  addTag: (tag: Omit<Tag, 'id'>) => void;
  removeTag: (id: number) => void;
  updateTag: (id: number, tag: Partial<Omit<Tag, 'id'>>) => void;

  resultsIndex: number;
  results: ClassifiedTextResult[];
  addResult: (result: Omit<ClassifiedTextResult, 'id'>) => void;
  removeResult: (id: number) => void;
}

const useStore = create(
  persist<Store>(
    (set) => ({
      tagsIndex: 1,
      tags: [],
      addTag: (tag) => {
        set((state) => ({
          tags: state.tags.concat({ ...tag, id: state.tagsIndex }),
          tagsIndex: state.tagsIndex + 1,
        }));
      },
      removeTag: (id) => {
        set((state) => ({ tags: state.tags.filter((tag) => tag.id !== id) }));
      },
      updateTag: (id, tag) => {
        set((state) => ({
          tags: state.tags.map((t) => (t.id === id ? { ...t, ...tag } : t)),
        }));
      },

      resultsIndex: 1,
      results: [],
      addResult: (result) => {
        set((state) => ({
          results: state.results.concat({ ...result, id: state.resultsIndex }),
          resultsIndex: state.resultsIndex + 1,
        }));
      },
      removeResult: (id) => {
        set((state) => ({ results: state.results.filter((result) => result.id !== id) }));
      },
    }),
    { name: 'text-classifier-ai' },
  ),
);

export default useStore;
