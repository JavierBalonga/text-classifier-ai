import DeleteIcon from '../../../abstract/icons/DeleteIcon';

export interface TagFieldProps {
  tagName: string;
  tagDescription: string;
  onTagNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTagDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function TagField({
  tagName,
  tagDescription,
  onTagNameChange,
  onTagDescriptionChange,
  onDelete,
}: TagFieldProps) {
  return (
    <div className="relative">
      <div className="group flex flex-col overflow-hidden rounded-lg border border-gray-400/20 bg-slate-800 p-1 focus-within:gap-1">
        <input
          className="grow rounded-md border border-transparent bg-slate-800 p-2 group-focus-within:border-gray-400/20"
          type="text"
          placeholder="Tag"
          value={tagName}
          onChange={onTagNameChange}
          autoFocus
        />
        <textarea
          className="h-0 resize-none overflow-hidden rounded-md border-0 border-transparent bg-slate-800 px-2 transition-all  group-focus-within:h-[12em] group-focus-within:border group-focus-within:border-gray-400/20 group-focus-within:py-2"
          placeholder="Description: adding a description improves the accuracy of our estimations"
          value={tagDescription}
          onChange={onTagDescriptionChange}
        />
      </div>
      <button
        className="absolute right-4 top-[26px] flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md bg-slate-700"
        onClick={onDelete}
        tabIndex={-1}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}
