import { RefObject, useEffect } from "react";

const useOnClickOutside = (ref: RefObject<HTMLElement>, handler: () => void) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        handler();
      }
    };
    document.addEventListener("click", listener);
    return () => document.addEventListener("click", listener);
  }, [ref, handler]);
};

export default useOnClickOutside;
