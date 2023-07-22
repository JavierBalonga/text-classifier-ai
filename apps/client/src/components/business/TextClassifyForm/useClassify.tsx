import { useCallback, useState } from 'react';
import { useAuth } from '../../../contexts/AuthProvider';
import env from '../../../env';

const { VITE_APP_API_URL } = env;

export interface ClassifyArgs {
  text: string;
  tags: { name: string; description: string }[];
}

export type ClassifyResponse = {
  name: string;
  confidence: number;
}[];

const useClassify = () => {
  const { getAccessTokenSilently } = useAuth();
  const [data, setData] = useState<ClassifyResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchClassify = useCallback(
    (classifyArgs: ClassifyArgs) => {
      setLoading(true);
      const promise = getAccessTokenSilently()
        .then((accessToken) => {
          return fetch(`${VITE_APP_API_URL}/classify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(classifyArgs),
          });
        })
        .then((res) => {
          return res.json().then((data) => {
            if (res.status >= 400) {
              throw data;
            } else {
              return data as ClassifyResponse;
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
    },
    [getAccessTokenSilently],
  );

  return [fetchClassify, { data, loading, error }] as const;
};

export default useClassify;
