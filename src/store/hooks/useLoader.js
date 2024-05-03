import { useEffect, useState } from "react";

export const useLoader = (fn, deps = []) => {
  const [isLoading, setLoading] = useState(true);
  const [result, setResult] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fn();
      setResult(res);
      setLoading(false);
    })()
  }, deps);

  return [isLoading, result];
}