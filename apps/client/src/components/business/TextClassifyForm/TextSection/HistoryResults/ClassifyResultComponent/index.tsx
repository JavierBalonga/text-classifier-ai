import { useMemo } from 'react';
import Alert from '../../../../../abstract/Alert';
import DeleteIcon from '../../../../../abstract/icons/DeleteIcon';
import useStore, {
  isClassifyErrorResult,
  isClassifyLoadingResult,
  isClassifySuccessResult,
} from '../../../useStore';

export interface ClassifiedTextProps {
  index: number;
}

export default function ClassifyResultComponent({ index }: ClassifiedTextProps) {
  const results = useStore((s) => s.results);
  const removeResult = useStore((s) => s.removeResult);

  const result = useMemo(() => results[index], [results, index]);

  const handleDelete = () => {
    removeResult(index);
  };

  if (isClassifyErrorResult(result)) {
    return (
      <div className="relative">
        <Alert error={result.error} />
        <button
          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-md"
          onClick={handleDelete}
          tabIndex={-1}
        >
          <DeleteIcon />
        </button>
      </div>
    );
  } else if (isClassifyLoadingResult(result)) {
    return (
      <div className="flex animate-fadein flex-col gap-2 rounded-md bg-slate-700 p-4">
        <p className="relative animate-pulse break-words rounded-md border-2 border-zinc-400/25 bg-zinc-400/25 p-2 text-transparent">
          Text
          <button
            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-md"
            onClick={handleDelete}
            tabIndex={-1}
          >
            <DeleteIcon />
          </button>
        </p>
        <div className="flex flex-row overflow-auto pb-1">
          <div className="flex w-0 grow flex-row gap-2">
            {Array.from({ length: Math.ceil(Math.random() * 4) }).map((_, index) => (
              <span
                key={index}
                className="animate-pulse rounded-md border border-gray-400/20 bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 text-transparent"
              >
                Tag Name
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  } else if (isClassifySuccessResult(result)) {
    return (
      <div className="flex animate-fadein flex-col gap-2 rounded-md bg-slate-700 p-4">
        <p className="relative break-words rounded-md border-2 border-zinc-400/25 p-2">
          {result.text}
          <button
            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-md"
            onClick={handleDelete}
            tabIndex={-1}
          >
            <DeleteIcon />
          </button>
        </p>
        <div className="flex flex-row overflow-auto pb-1">
          <div className="flex w-0 grow flex-row gap-2">
            {result.tags
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
  } else {
    return null;
  }
}
