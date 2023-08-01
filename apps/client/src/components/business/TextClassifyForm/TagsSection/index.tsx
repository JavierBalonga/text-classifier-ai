import Button from '../../../abstract/Button';
import useStore from '../useStore';
import TagField from './TagField';

export default function TagsSection() {
  const tags = useStore((s) => s.form.values.tags);
  const addTag = useStore((s) => s.addTag);

  return (
    <div className="flex w-full grow flex-col gap-2 sm:max-w-[230px]">
      <p>Tags:</p>
      {tags.map((_, index) => (
        <TagField key={index} index={index} />
      ))}
      <Button className=" border-2 border-dashed bg-transparent" onClick={addTag}>
        New Tag
      </Button>
    </div>
  );
}
