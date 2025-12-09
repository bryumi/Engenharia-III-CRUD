export const renderSlicedText = (
  text: string | undefined | null,
  maxLength: number,
) => {
  if (!text) return '-';

  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...'; // Add ellipsis if text is too long
  }
  return text;
};
