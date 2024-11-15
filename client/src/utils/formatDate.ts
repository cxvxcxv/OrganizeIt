// formats a date string or Date object to yyyy-mm-dd in the local time zone
export const formatDate = (date: string | Date) => {
  const validDate = typeof date === 'string' ? new Date(date) : date;
  const year = validDate.getFullYear();
  const month = String(validDate.getMonth() + 1).padStart(2, '0');
  const day = String(validDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
