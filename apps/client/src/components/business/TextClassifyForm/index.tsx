import TagsSection from './TagsSection';
import TextSection from './TextSection';

export default function TextClassifyForm() {
  return (
    <div className="w-ful flex max-w-3xl grow flex-col gap-2 rounded-lg bg-slate-800 p-8 text-slate-200 sm:flex-row">
      <TagsSection />
      <TextSection />
    </div>
  );
}
