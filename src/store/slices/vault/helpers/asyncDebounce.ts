export const asyncDebounce = (func: any, timerRef: any) => {
  return (...args: any) => {
    clearTimeout(timerRef.current);
    return new Promise((resolve) => {
      const later = () => {
        resolve(func(...args));
      };
      const wait: any = timerRef.current === 0 || 3000;
      timerRef.current = setTimeout(later, wait);
    });
  };
};
