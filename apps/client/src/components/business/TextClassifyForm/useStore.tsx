import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ClassifiedTextResult, Tag } from './types';

interface Store {
  // Form state
  form: {
    values: {
      text: string;
      tags: { name: string; description: string }[];
    };
    errors: {
      text?: string;
      tags: { name?: string; description?: string }[];
    };
    touched: {
      text: boolean;
      tags: { name: boolean; description: boolean }[];
    };
  };
  changeText: (text: string) => void;
  touchText: () => void;
  changeTagName: (index: number, name: string) => void;
  touchTagName: (index: number) => void;
  changeTagDescription: (index: number, description: string) => void;
  touchTagDescription: (index: number) => void;
  addTag: () => void;
  removeTag: (index: number) => void;

  // Results state
  resultsIndex: number;
  results: ClassifiedTextResult[];
  addResult: (result: Omit<ClassifiedTextResult, 'id'>) => void;
  removeResult: (id: number) => void;
}

const useStore = create(
  persist<Store>(
    (set) => ({
      form: {
        values: {
          text: '',
          tags: [],
        },
        errors: {
          text: undefined,
          tags: [],
        },
        touched: {
          text: false,
          tags: [],
        },
      },
      changeText: (text: string) => {
        let textError: string | undefined;
        if (text.length < 5) {
          textError = 'Text must be at least 5 characters';
        } else if (text.length > 250) {
          textError = 'Text must be less than 250 characters';
        }
        set((state) => ({
          form: {
            ...state.form,
            values: { ...state.form.values, text },
            errors: { ...state.form.errors, text: textError },
          },
        }));
      },
      touchText: () => {
        set((state) => ({
          form: {
            ...state.form,
            touched: { ...state.form.touched, text: true },
          },
        }));
      },
      addTag: () => {
        set((state) => ({
          form: {
            ...state.form,
            values: {
              ...state.form.values,
              tags: state.form.values.tags.concat({ name: '', description: '' }),
            },
            errors: {
              ...state.form.errors,
              tags: state.form.errors.tags.concat({ name: undefined, description: undefined }),
            },
            touched: {
              ...state.form.touched,
              tags: state.form.touched.tags.concat({ name: false, description: false }),
            },
          },
        }));
      },
      changeTagName: (index: number, name: string) => {
        let tagNameError: string | undefined;
        if (name.length > 25) {
          tagNameError = 'Tag name must be less than 25 characters';
        }
        set((state) => ({
          form: {
            ...state.form,
            values: {
              ...state.form.values,
              tags: state.form.values.tags.map((tag, i) => (i === index ? { ...tag, name } : tag)),
            },
            errors: {
              ...state.form.errors,
              tags: state.form.errors.tags.map((tag, i) =>
                i === index ? { ...tag, name: tagNameError } : tag,
              ),
            },
          },
        }));
      },
      touchTagName: (index: number) => {
        set((state) => ({
          form: {
            ...state.form,
            touched: {
              ...state.form.touched,
              tags: state.form.touched.tags.map((tag, i) =>
                i === index ? { ...tag, name: true } : tag,
              ),
            },
          },
        }));
      },
      changeTagDescription: (index: number, description: string) => {
        let tagdescriptionError: string | undefined;
        if (description.length > 150) {
          tagdescriptionError = 'Tag name must be less than 150 characters';
        }
        set((state) => ({
          form: {
            ...state.form,
            values: {
              ...state.form.values,
              tags: state.form.values.tags.map((tag, i) =>
                i === index ? { ...tag, description } : tag,
              ),
            },
            errors: {
              ...state.form.errors,
              tags: state.form.errors.tags.map((tag, i) =>
                i === index ? { ...tag, description: tagdescriptionError } : tag,
              ),
            },
          },
        }));
      },
      touchTagDescription: (index: number) => {
        set((state) => ({
          form: {
            ...state.form,
            touched: {
              ...state.form.touched,
              tags: state.form.touched.tags.map((tag, i) =>
                i === index ? { ...tag, description: true } : tag,
              ),
            },
          },
        }));
      },
      removeTag: (index: number) => {
        set((state) => ({
          form: {
            ...state.form,
            values: {
              ...state.form.values,
              tags: state.form.values.tags.filter((_, i) => i !== index),
            },
            errors: {
              ...state.form.errors,
              tags: state.form.errors.tags.filter((_, i) => i !== index),
            },
            touched: {
              ...state.form.touched,
              tags: state.form.touched.tags.filter((_, i) => i !== index),
            },
          },
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
