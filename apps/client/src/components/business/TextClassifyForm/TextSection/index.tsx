import HistoryResults from './HistoryResults';
import SubmitButton from './SubmitButton';
import TextInput from './TextInput';

export default function TextSection() {
  return (
    <div className="flex w-0 grow flex-col gap-2">
      <h4>Text</h4>
      <HistoryResults />
      <TextInput />
      <SubmitButton />
    </div>
  );
}
