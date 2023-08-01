import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthProvider';
import Alert from '../../abstract/Alert';
import Button from '../../abstract/Button';
import ErrorMessage from '../../abstract/ErrorMessage';
import Tooltip from '../../abstract/Tooltip';
import ClassifiedText from './ClassifiedText';
import RegisterModal from './RegisterModal';
import TagField from './TagField';
import useClassify from './useClassify';
import useStore from './useStore';

export default function TextClassifyForm() {
  const { isAuthenticated } = useAuth();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const store = useStore();
  const [fetchClassify, { loading, error }] = useClassify();

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
    store.addTag();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchClassify({
      text: store.form.values.text,
      tags: store.form.values.tags.filter((tag) => tag.name.length > 0),
    }).then((result) => {
      store.addResult({ text: store.form.values.text, tags: result });
    });
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resizeTextarea = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = '1px';
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 2 + 'px';
  };

  useEffect(() => {
    resizeTextarea();
  }, [textareaRef]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    store.changeText(e.target.value);
    resizeTextarea();
  };

  const handleTextBlur = () => {
    store.touchText();
  };

  const handleTagNameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newName = e.target.value;
    store.changeTagName(index, newName);
  };

  const handleTagNameBlur = (index: number) => {
    store.touchTagName(index);
  };

  const handleTagDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const newDescription = e.target.value;
    store.changeTagDescription(index, newDescription);
  };

  const handleTagDescriptionBlur = (index: number) => {
    store.touchTagDescription(index);
  };

  const handleDeleteTag = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    store.removeTag(id);
  };

  const handleDeleteResult = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    store.removeTag(index);
  };

  const handleOpenRegisteModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRegisterModalOpen(true);
  };

  const handleCloseRegisteModal = () => {
    setRegisterModalOpen(false);
  };

  const thereAreErrors = useMemo(() => {
    return Boolean(
      store.form.errors.text || store.form.errors.tags.some((tag) => tag.name || tag.description),
    );
  }, [store.form.errors]);

  const someInputWasTouched = useMemo(() => {
    return Boolean(
      store.form.touched.text || store.form.touched.tags.some((tag) => tag.name || tag.description),
    );
  }, [store.form.touched]);

  const everyInputHasValue = useMemo(() => {
    return Boolean(
      store.form.values.text &&
        store.form.values.tags.length &&
        store.form.values.tags.every((tag) => tag.name),
    );
  }, [store.form.values]);

  return (
    <div className="w-ful flex max-w-3xl grow flex-col gap-2 rounded-lg bg-slate-800 p-8 text-slate-200 sm:flex-row">
      <div className="flex w-full grow flex-col gap-2 sm:max-w-[230px]">
        <p>Tags:</p>
        {store.form.values.tags.map((tag, index) => (
          <TagField
            key={index}
            tagName={tag.name}
            tagDescription={tag.description}
            onTagNameChange={(e) => handleTagNameChange(e, index)}
            onTagNameBlur={() => handleTagNameBlur(index)}
            onTagDescriptionChange={(e) => handleTagDescriptionChange(e, index)}
            onTagDescriptionBlur={() => handleTagDescriptionBlur(index)}
            onDelete={(e) => handleDeleteTag(e, index)}
            errorMessage={
              (store.form.touched.tags[index].name && store.form.errors.tags[index]?.name) ||
              (store.form.touched.tags[index].description &&
                store.form.errors.tags[index]?.description) ||
              undefined
            }
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
          {error ? <Alert error={error} /> : loading ? <ClassifiedText loading /> : null}
        </div>

        <textarea
          className="max-h-[136px] min-h-[66px] resize-none rounded-md border border-gray-400/20 bg-slate-800 p-2"
          value={store.form.values.text}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          ref={textareaRef}
        />
        <ErrorMessage message={(store.form.touched.text && store.form.errors.text) || undefined} />
        <Tooltip
          title={
            !someInputWasTouched || !everyInputHasValue
              ? 'Please Complete all fields'
              : thereAreErrors
              ? 'Please fix the errors'
              : undefined
          }
        >
          <Button
            onClick={isAuthenticated ? handleSubmit : handleOpenRegisteModal}
            disabled={!someInputWasTouched || !everyInputHasValue || thereAreErrors}
            className="w-full"
          >
            Check Tags
          </Button>
        </Tooltip>
        <RegisterModal open={registerModalOpen} onClose={handleCloseRegisteModal} />
      </div>
    </div>
  );
}
