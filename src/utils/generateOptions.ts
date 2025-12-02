export const generateOptions = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => ({
    label: String(start + i),
    value: start + i,
  }));
};
