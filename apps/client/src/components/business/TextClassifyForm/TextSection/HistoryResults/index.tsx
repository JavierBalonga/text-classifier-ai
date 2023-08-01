import { useEffect, useRef } from 'react';
import useStore from '../../useStore';
import ClassifyResultComponent from './ClassifyResultComponent';

export default function HistoryResults() {
  const results = useStore((s) => s.results);

  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const prevLength = useRef(results.length);
  useEffect(() => {
    const isIncreasing = results.length > prevLength.current;
    if (isIncreasing) {
      resultsContainerRef.current?.scrollTo({
        top: resultsContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
    prevLength.current = results.length;
  }, [results.length]);

  return (
    <div
      className="flex max-h-[50svh] flex-col gap-2 overflow-y-auto overflow-x-hidden"
      ref={resultsContainerRef}
    >
      {results.map((_, index) => (
        <ClassifyResultComponent key={index} index={index} />
      ))}
    </div>
  );
}
