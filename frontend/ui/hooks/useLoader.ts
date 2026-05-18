import { type DependencyList, useEffect, useState } from 'react';

type UseLoaderResult<TResult> = [isLoading: boolean, result: TResult | null];

export const useLoader = <TArgs = undefined, TResult = unknown>(
  fn: (args: TArgs) => Promise<TResult>,
  args?: TArgs,
  deps: DependencyList = [],
): UseLoaderResult<TResult> => {
  const [isLoading, setLoading] = useState(true);
  const [result, setResult] = useState<TResult | null>(null);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fn(args as TArgs);
      setResult(res);
      setLoading(false);
    })();
  }, deps);

  return [isLoading, result];
};
