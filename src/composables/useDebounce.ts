export function useDebounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay = 200,
  immediate = false,
): (...args: Args) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Args) => {
    const callNow = immediate && !timeout;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) fn(...args);
    }, delay);

    if (callNow) fn(...args);
  };
}
