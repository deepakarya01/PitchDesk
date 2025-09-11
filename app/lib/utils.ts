export function formatDate(date: Date | string): string {
  const dateObject = typeof date === 'string' ? new Date(date) : date;

  if (!dateObject || isNaN(dateObject.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(dateObject);
}
