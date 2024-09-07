import { RefObject, useEffect } from "react";

const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: () => void,
  excludeNodeRef?: RefObject<HTMLElement>
) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (excludeNodeRef && excludeNodeRef?.current?.contains(e.target as Node)) return;
      if (!ref.current?.contains(e.target as Node)) {
        handler();
      }
    };
    document.addEventListener("click", listener);
    return () => document.addEventListener("click", listener);
  }, [ref, handler, excludeNodeRef]);
};

export default useOnClickOutside;
