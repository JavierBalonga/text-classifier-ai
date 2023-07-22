import { twMerge } from 'tailwind-merge';
import DeleteIcon from '../../../abstract/icons/DeleteIcon';

export interface ClassifyResult {
  text: string;
  tags: { name: string; confidence: number }[];
}

export interface ClassifiedTextProps {
  loading?: boolean;
  classifiedText?: ClassifyResult;
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ClassifiedText({ loading, classifiedText, onDelete }: ClassifiedTextProps) {
  return (
    <div className="flex animate-fadein flex-col gap-2 rounded-md bg-slate-700 p-4">
      <p
        className={twMerge(
          'relative break-words rounded-md border-2 border-zinc-400/25 p-2',
          loading && 'animate-pulse bg-zinc-400/25 text-transparent',
        )}
      >
        {classifiedText?.text || 'Text'}
        <button
          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-md"
          onClick={onDelete}
          tabIndex={-1}
        >
          <DeleteIcon />
        </button>
      </p>
      <div className="flex flex-row overflow-auto pb-1">
        <div className="flex w-0 grow flex-row gap-2">
          {loading
            ? Array.from({ length: Math.ceil(Math.random() * 4) }).map((_, index) => (
                <span
                  key={index}
                  className="animate-pulse rounded-md border border-gray-400/20 bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 text-transparent"
                >
                  Tag Name
                </span>
              ))
            : classifiedText?.tags
                .filter((tag) => tag.confidence > 50)
                .map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-md border border-gray-400/20 bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400"
                  >
                    {tag.name}
                  </span>
                ))}
        </div>
      </div>
    </div>
  );
}
