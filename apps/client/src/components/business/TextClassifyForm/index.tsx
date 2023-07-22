import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthProvider';
import Button from '../../abstract/Button';
import ClassifiedText from './ClassifiedText';
import RegisterModal from './RegisterModal';
import TagField from './TagField';
import useClassify from './useClassify';
import useStore from './useStore';

export default function TextClassifyForm() {
  const { isAuthenticated } = useAuth();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const store = useStore();
  const [fetchClassify, { loading }] = useClassify();
  const [text, setText] = useState('');

  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const prevLength = useRef(store.results.length);
  useEffect(() => {
    const isIncreasing = store.results.length > prevLength.current;
    if (isIncreasing) {
      resultsContainerRef.current?.scrollTo({
        top: resultsContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
    prevLength.current = store.results.length;
  }, [store.results.length]);

  const handleAddTag = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    store.addTag({ name: '', description: '' });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchClassify({
      text: text,
      tags: store.tags.filter((tag) => tag.name.length > 0),
    }).then((result) => {
      store.addResult({ text, tags: result });
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleTagNameChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const newName = e.target.value;
    store.updateTag(id, { name: newName });
  };

  const handleTagDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>, id: number) => {
    const newDescription = e.target.value;
    store.updateTag(id, { description: newDescription });
  };

  const handleDeleteTag = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    store.removeTag(id);
  };

  const handleDeleteResult = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    store.removeResult(id);
  };

  const handleOpenRegisteModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRegisterModalOpen(true);
  };

  const handleCloseRegisteModal = () => {
    setRegisterModalOpen(false);
  };

  return (
    <div className="w-ful flex max-w-3xl grow flex-col gap-2 rounded-lg bg-slate-800 p-8 text-slate-200 sm:flex-row">
      <div className="flex w-full grow flex-col gap-2 sm:max-w-[230px]">
        <p>Tags:</p>
        {store.tags.map((tag) => (
          <TagField
            key={tag.id}
            tagName={tag.name}
            tagDescription={tag.description}
            onTagNameChange={(e) => handleTagNameChange(e, tag.id)}
            onTagDescriptionChange={(e) => handleTagDescriptionChange(e, tag.id)}
            onDelete={(e) => handleDeleteTag(e, tag.id)}
          />
        ))}
        <Button className=" border-2 border-dashed bg-transparent" onClick={handleAddTag}>
          New Tag
        </Button>
      </div>
      <div className="flex w-0 grow flex-col gap-2">
        <h4>Text</h4>
        <div
          className="flex max-h-[50svh] flex-col gap-2 overflow-y-auto overflow-x-hidden"
          ref={resultsContainerRef}
        >
          {store.results.map((result) => (
            <ClassifiedText
              key={result.id}
              classifiedText={result}
              onDelete={(e) => handleDeleteResult(e, result.id)}
            />
          ))}
          {loading && <ClassifiedText loading />}
        </div>

        <textarea
          className="resize-none rounded-md border border-gray-400/20 bg-slate-800 p-2"
          value={text}
          onChange={handleTextChange}
        />
        <Button onClick={isAuthenticated ? handleSubmit : handleOpenRegisteModal}>
          Check Tags
        </Button>
        <RegisterModal open={registerModalOpen} onClose={handleCloseRegisteModal} />
      </div>
    </div>
  );
}
