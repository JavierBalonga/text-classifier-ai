import { useMemo } from 'react';
import ErrorMessage from '../../../../abstract/ErrorMessage';
import DeleteIcon from '../../../../abstract/icons/DeleteIcon';
import useStore from '../../useStore';

export interface TagFieldProps {
  index: number;
}

export default function TagField({ index }: TagFieldProps) {
  const form = useStore((s) => s.form);
  const changeTagName = useStore((s) => s.changeTagName);
  const touchTagName = useStore((s) => s.touchTagName);
  const changeTagDescription = useStore((s) => s.changeTagDescription);
  const touchTagDescription = useStore((s) => s.touchTagDescription);
  const removeTag = useStore((s) => s.removeTag);

  const tag = useMemo(() => form.values.tags[index], [form.values.tags, index]);

  const errorMessage = useMemo(() => {
    const toucheds = form.touched.tags[index];
    const errors = form.errors.tags[index];
    const nameError = toucheds.name && errors?.name;
    const descriptionError = toucheds.description && errors?.description;
    return nameError || descriptionError || undefined;
  }, [form.touched.tags, form.errors.tags, index]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeTagName(index, e.target.value);
  };

  const handleNameBlur = () => {
    touchTagName(index);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    changeTagDescription(index, e.target.value);
  };

  const handleDescriptionBlur = () => {
    touchTagDescription(index);
  };

  const handleDelete = () => {
    removeTag(index);
  };

  return (
    <>
      <div className="relative">
        <div className="group flex flex-col overflow-hidden rounded-lg border border-gray-400/20 bg-slate-800 p-1 focus-within:gap-1">
          <input
            className="grow rounded-md border border-transparent bg-slate-800 p-2 group-focus-within:border-gray-400/20"
            type="text"
            placeholder="Tag"
            value={tag.name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            autoFocus
          />
          <textarea
            className="h-0 resize-none overflow-hidden rounded-md border-0 border-transparent bg-slate-800 px-2 transition-all  group-focus-within:h-[12em] group-focus-within:border group-focus-within:border-gray-400/20 group-focus-within:py-2"
            placeholder="Description: adding a description improves the accuracy of our estimations"
            value={tag.description}
            onChange={handleDescriptionChange}
            onBlur={handleDescriptionBlur}
          />
        </div>
        <button
          className="absolute right-4 top-[26px] flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md bg-slate-700"
          onClick={handleDelete}
          tabIndex={-1}
        >
          <DeleteIcon />
        </button>
      </div>
      <ErrorMessage message={errorMessage} />
    </>
  );
}
