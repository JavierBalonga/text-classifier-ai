import { useMemo, useState } from 'react';
import { useAuth } from '../../../../../contexts/AuthProvider';
import Button from '../../../../abstract/Button';
import Tooltip from '../../../../abstract/Tooltip';
import useStore, { isClassifyLoadingResult } from '../../useStore';
import RegisterModal from './RegisterModal';
import useClassify from './useClassify';

export default function SubmitButton() {
  const { isAuthenticated } = useAuth();
  const form = useStore((s) => s.form);
  const results = useStore((s) => s.results);
  const addResult = useStore((s) => s.addResult);
  const setResult = useStore((s) => s.setResult);
  const [fetchClassify] = useClassify();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addResult({ loading: true });
    const index = results.length;
    fetchClassify({
      text: form.values.text,
      tags: form.values.tags.filter((tag) => tag.name.length > 0),
    })
      .then((result) => {
        setResult(index, { text: form.values.text, tags: result });
      })
      .catch((error) => {
        setResult(index, { error });
      });
  };

  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const handleOpenRegisteModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRegisterModalOpen(true);
  };

  const handleCloseRegisteModal = () => {
    setRegisterModalOpen(false);
  };

  const thereAreErrors = useMemo(() => {
    return Boolean(form.errors.text || form.errors.tags.some((tag) => tag.name || tag.description));
  }, [form.errors]);

  const someInputWasTouched = useMemo(() => {
    return Boolean(
      form.touched.text || form.touched.tags.some((tag) => tag.name || tag.description),
    );
  }, [form.touched]);

  const everyInputHasValue = useMemo(() => {
    return Boolean(
      form.values.text && form.values.tags.length && form.values.tags.every((tag) => tag.name),
    );
  }, [form.values]);

  const isLoading = useMemo(() => {
    return results.some((result) => isClassifyLoadingResult(result));
  }, [results]);

  return (
    <>
      <Tooltip
        title={
          !someInputWasTouched || !everyInputHasValue
            ? 'Please Complete all fields'
            : thereAreErrors
            ? 'Please fix the errors'
            : isLoading
            ? 'There is already a request in progress'
            : undefined
        }
      >
        <Button
          onClick={isAuthenticated ? handleSubmit : handleOpenRegisteModal}
          disabled={!someInputWasTouched || !everyInputHasValue || thereAreErrors || isLoading}
          className="w-full"
        >
          Check Tags
        </Button>
      </Tooltip>
      <RegisterModal open={registerModalOpen} onClose={handleCloseRegisteModal} />
    </>
  );
}
