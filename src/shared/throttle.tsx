export const throttle = <T extends ((...args: unknown[]) => any)>(fn: T, time: number) => {
  // timer格式
  let timer: NodeJS.Timeout | number | undefined = undefined;
  let result: ReturnType<T>;
  return (...args: Parameters<T>) => {
    if (timer) {
      return result;
    } else {
      result = fn(...args);
      timer = setTimeout(() => {
        timer = undefined;
      }, time);
      return result;
    }
  };
};