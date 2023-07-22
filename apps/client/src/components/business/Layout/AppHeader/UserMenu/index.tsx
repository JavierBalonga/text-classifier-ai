import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../../../../../contexts/AuthProvider';
import Spinner from '../../../../abstract/Spinner';

export default function () {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex flex-row items-center gap-2">
      {isLoading ? (
        <Spinner />
      ) : !isAuthenticated ? (
        <button
          className="flex justify-center rounded-lg bg-indigo-400 px-6 py-2"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>
      ) : (
        <>
          <div className="relative">
            <button onClick={handleOpen}>
              <img className="h-9 w-9 rounded-full" src={user?.picture} alt="avatar" />
            </button>
            <div
              className={twMerge(
                'fixed bottom-0 left-0 right-0 top-0',
                open ? 'pointer-events-auto' : 'pointer-events-none',
              )}
              onClick={handleClose}
            />
            <div
              className={twMerge(
                'absolute -bottom-4 right-0 flex  flex-col gap-4 rounded-lg bg-slate-950 p-6 transition-all',
                open
                  ? 'pointer-events-auto translate-y-full opacity-100'
                  : 'pointer-events-none translate-y-3/4 opacity-0',
              )}
            >
              <p className="text-lg">{user?.email}</p>
              <button
                className="flex justify-center rounded-lg bg-indigo-400 px-6 py-2"
                onClick={() =>
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  })
                }
              >
                Log Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
