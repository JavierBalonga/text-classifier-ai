import { useEffect, useRef } from 'react';
import ErrorMessage from '../../../../abstract/ErrorMessage';
import useStore from '../../useStore';

export default function TextInput() {
  const text = useStore((s) => s.form.values.text);
  const touched = useStore((s) => s.form.touched.text);
  const error = useStore((s) => s.form.errors.text);
  const changeText = useStore((s) => s.changeText);
  const touchText = useStore((s) => s.touchText);

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
    changeText(e.target.value);
    resizeTextarea();
  };

  const handleTextBlur = () => {
    touchText();
  };

  return (
    <>
      <textarea
        className="max-h-[136px] min-h-[66px] resize-none rounded-md border border-gray-400/20 bg-slate-800 p-2"
        value={text}
        onChange={handleTextChange}
        onBlur={handleTextBlur}
        ref={textareaRef}
      />
      <ErrorMessage message={(touched && error) || undefined} />
    </>
  );
}
