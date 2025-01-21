import { useMemo } from "react";
import debounce from "lodash.debounce";

// Хук для дебаунса
export const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) => {
  return useMemo(() => debounce(callback, delay), [callback, delay]);
};
