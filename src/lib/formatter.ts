/**
 * Capitalize every word in a sentence
 * @param title string
 * @returns string
 */
export const formatTitle = (title: string): string => {
  return title
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1, 0).toLowerCase())
    .join(' ');
};

/**
 * Return US Date format
 * @param date string | Date
 * @returns string
 */
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
