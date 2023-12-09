import { useEffect, useRef, useState } from "react";

export const useDimensions = (ref) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    top: 0,
    bottom: 0,
  });
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new ResizeObserver((entries) => {
      const { width, height, top, bottom } = entries[0].contentRect;
      setDimensions({ width, height, top, bottom });
    });

    observer.current.observe(ref.current);

    return () => observer.current.disconnect();
  }, [ref]);

  return dimensions;
};
