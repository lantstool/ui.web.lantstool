import { useEffect, useState, useRef } from 'react';


export const useMethods = (methodNames) => {
  const [maxMethods, setMaxMethods] = useState(methodNames.length);
  const [showAll, setShowAll] = useState(false);
  const ref = useRef(null);

  const calculateVisibleMethods = () => {
    if (ref.current) {
      const containerWidth = 360;
      let totalWidth = 0;
      let visibleMethods = 0;

      for (let method of methodNames) {
        const methodWidth = measureTextWidth(method, '16px Inter');
        totalWidth += methodWidth;

        if (totalWidth <= containerWidth) {
          visibleMethods += 1;
        } else {
          break;
        }
      }
      setMaxMethods(visibleMethods);
    }
  };

  const measureTextWidth = (text, font) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    return context.measureText(text).width;
  };

  useEffect(() => {
    calculateVisibleMethods();
    window.addEventListener('resize', calculateVisibleMethods);
    return () => window.removeEventListener('resize', calculateVisibleMethods);
  }, [methodNames]);


  return {
    maxMethods: showAll ? methodNames.length : maxMethods,
    showAll,
    setShowAll,
    ref,
  };
};

