import { ESearchFilterKeys, TSearchFilters } from '@/types/searchFilter.types';
import { ITask } from '@/types/task.types';

export function handleSearch(
  tasks?: ITask[],
  searchFilters?: TSearchFilters,
  searchValue?: string,
) {
  if (!tasks) return [];
  const result = tasks.filter(task => {
    const searchValueMatch = searchValue
      ? task.title.toLowerCase().includes(searchValue.toLowerCase())
      : true;

    const filtersMatch = searchFilters
      ? Object.entries(searchFilters).every(([key, value]) => {
          if (value === undefined) return true;
          if (key === ESearchFilterKeys.DEADLINE && value !== null) {
            const userTimezoneOffset =
              new Date(task[key]).getTimezoneOffset() * 60000;
            const taskDeadline =
              new Date(task[key]).getTime() + userTimezoneOffset;
            const untilDeadline = new Date(value.toString()).getTime();

            return taskDeadline <= untilDeadline;
          }
          return task[key] === value;
        })
      : true;

    return searchValueMatch && filtersMatch;
  });

  return result;
}
