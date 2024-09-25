import { useEffect, useState } from 'react';

export const useLoader = (fn, args = undefined, deps = []) => {
  const [isLoading, setLoading] = useState(true);
  const [result, setResult] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fn(args);
      setResult(res);
      setLoading(false);
    })();
  }, deps);

  return [isLoading, result];
};
