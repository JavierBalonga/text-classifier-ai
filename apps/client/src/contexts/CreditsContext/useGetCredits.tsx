import { useCallback, useState } from 'react';
import env from '../../env';
import { useAuth } from '../AuthProvider';

const { VITE_APP_API_URL } = env;

export type GetCreditsResponse = {
  credits: number;
  lastClaimDatetime?: string;
};

const useGetCredits = () => {
  const { getAccessTokenSilently } = useAuth();
  const [data, setData] = useState<GetCreditsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchGetCredits = useCallback(() => {
    setLoading(true);
    const promise = getAccessTokenSilently()
      .then((accessToken) => {
        return fetch(`${VITE_APP_API_URL}/credits`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
      })
      .then((res) => {
        return res.json().then((data) => {
          if (res.status >= 400) {
            throw data;
          } else {
            return data as GetCreditsResponse;
          }
        });
      });

    promise.then((data) => {
      setData(data);
    });
    promise.catch((err) => {
      setError(err);
    });
    promise.finally(() => {
      setLoading(false);
    });

    return promise;
  }, [getAccessTokenSilently]);

  return [fetchGetCredits, { data, loading, error }] as const;
};

export default useGetCredits;
