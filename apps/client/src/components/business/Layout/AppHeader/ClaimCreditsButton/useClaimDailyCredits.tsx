import { useCallback, useState } from 'react';
import { useAuth } from '../../../../../contexts/AuthProvider';
import env from '../../../../../env';

const { VITE_APP_API_URL } = env;

export type ClaimDailyCreditsResponse = {
  credits: number;
  lastClaimDatetime?: string;
};

const useClaimDailyCredits = () => {
  const { getAccessTokenSilently } = useAuth();
  const [data, setData] = useState<ClaimDailyCreditsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchClaimDailyCredits = useCallback(() => {
    setLoading(true);
    const promise = getAccessTokenSilently()
      .then((accessToken) => {
        return fetch(`${VITE_APP_API_URL}/credits`, {
          method: 'POST',
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
            return data as ClaimDailyCreditsResponse;
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

  return [fetchClaimDailyCredits, { data, loading, error }] as const;
};

export default useClaimDailyCredits;
