import { useRef } from 'react';

const BOUNCE_RATE = 2000;
interface UseDebounceReturnType {
  debounce: (callback: () => void) => Promise<void>;
}
export const useDebounce = (): UseDebounceReturnType => {
  const busy = useRef(false);

  const debounce = async (callback: () => void): Promise<void> => {
    setTimeout(() => {
      busy.current = false;
    }, BOUNCE_RATE);

    if (!busy.current) {
      busy.current = true;
      callback();
    }
  };

  return { debounce };
};
