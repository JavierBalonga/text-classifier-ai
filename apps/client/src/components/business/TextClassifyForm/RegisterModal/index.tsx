import { twMerge } from 'tailwind-merge';
import { useAuth } from '../../../../contexts/AuthProvider';
import Button from '../../../abstract/Button';

export interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

export default function RegisterModal({ open, onClose }: RegisterModalProps) {
  console.log('RegisterModal', open);
  const { loginWithRedirect } = useAuth();

  return (
    <>
      <div
        className={twMerge(
          'fixed bottom-0 left-0 right-0 top-0 bg-black/50 transition-opacity',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
      />
      <dialog
        open
        className={twMerge(
          'flex flex-col items-center gap-8 rounded-lg bg-slate-600 p-8 text-white transition-all',
          open ? 'opacity-100' : 'pointer-events-none translate-y-1/4 opacity-0',
        )}
      >
        <p className="text-center text-xl">
          Sorry to use the application
          <br />
          we need you to be <strong>Logged</strong>
        </p>
        <Button onClick={() => loginWithRedirect()}>Log In</Button>
      </dialog>
    </>
  );
}
