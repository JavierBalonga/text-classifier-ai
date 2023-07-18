import { useState, MouseEvent } from "react";
import { useAuth } from "../../../../contexts/AuthProvider";
import Spinner from "../../../Spinner";
import { twMerge } from "tailwind-merge";

export default function () {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } =
    useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <div className="flex flex-row items-center gap-2">
      {isLoading ? (
        <Spinner />
      ) : !isAuthenticated ? (
        <button
          className="flex justify-center py-2 px-6 bg-indigo-400 rounded-lg"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>
      ) : (
        <>
          <button className="relative" onClick={handleOpen}>
            <img
              className="h-12 w-12 rounded-full"
              src={user?.picture}
              alt="avatar"
            />
            <div
              className={twMerge(
                "fixed top-0 left-0 right-0 bottom-0",
                open ? "pointer-events-auto" : "pointer-events-none"
              )}
              onClick={handleClose}
            />
            <div
              className={twMerge(
                "absolute right-0 -bottom-4 bg-slate-950  p-6 rounded-lg transition-all flex flex-col gap-4",
                open
                  ? "opacity-100 translate-y-full pointer-events-auto"
                  : "opacity-0 translate-y-3/4 pointer-events-none"
              )}
            >
              <p className="text-lg">{user?.email}</p>
              <button
                className="flex justify-center py-2 px-6 bg-indigo-400 rounded-lg"
                onClick={() =>
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  })
                }
              >
                Log Out
              </button>
            </div>
          </button>
        </>
      )}
    </div>
  );
}
