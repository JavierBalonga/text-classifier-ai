import { createContext, ReactNode, useCallback, useContext, useEffect } from 'react';
import useGetCredits, { GetCreditsResponse } from './useGetCredits';

export interface CreditsContextContent {
  credits?: number;
  lastClaimDatetime?: string;
  error?: unknown;
  loading: boolean;
  refreshCredits: () => Promise<GetCreditsResponse>;
}

const Context = createContext<CreditsContextContent | null>(null);

export interface CreditsContextProviderProps {
  children: ReactNode;
}

export const CreditsContextProvider = ({ children }: CreditsContextProviderProps) => {
  const [getCredits, { data, error, loading }] = useGetCredits();

  useEffect(() => {
    if (data) return;
    getCredits();
  }, []);

  const refreshCredits = useCallback(() => {
    return getCredits();
  }, [getCredits]);

  return (
    <Context.Provider
      value={{
        credits: data?.credits,
        lastClaimDatetime: data?.lastClaimDatetime,
        error,
        loading,
        refreshCredits,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCreditsContext = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error('useCreditsContext has to be inside a CreditsContextProvider');
  }
  return context;
};
