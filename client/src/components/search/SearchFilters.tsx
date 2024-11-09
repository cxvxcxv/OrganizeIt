'use client';

import { ICategory } from '@/types/category.types';
import { ETaskInputKeys } from '@/types/task.types';

import {
  identifySearchCategoryId,
  identifyStatus,
} from '@/utils/identifyProperty';

type TSearchFiltersProps = {
  categories: ICategory[];
  handleChangeSearchFilters: (filter: ETaskInputKeys, value: any) => void;
};

export function SearchFilters({
  categories,
  handleChangeSearchFilters,
}: TSearchFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row lg:gap-8">
      <select
        id="searchCategory"
        defaultValue=""
        onChange={e =>
          handleChangeSearchFilters(
            ETaskInputKeys.CATEGORY_ID,
            identifySearchCategoryId(e.target.value),
          )
        }
        className="rounded-xl border px-2 py-1"
      >
        <option value="">Category</option>
        <option value="null">None</option>
        {categories.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      <div className="flex items-center rounded-xl border px-2 py-1">
        <p>Until:</p>
        <input
          type="date"
          id="searchDeadline"
          onChange={e =>
            handleChangeSearchFilters(
              ETaskInputKeys.DEADLINE,
              e.target.value ? `${e.target.value} 00:00:00` : undefined,
            )
          }
          className="ml-2"
        />
      </div>

      <select
        id="searchPriority"
        defaultValue=""
        onChange={e =>
          handleChangeSearchFilters(
            ETaskInputKeys.PRIORITY,
            e.target.value || undefined,
          )
        }
        className="rounded-xl border px-2 py-1"
      >
        <option value="">Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select
        id="searchStatus"
        defaultValue=""
        onChange={e =>
          handleChangeSearchFilters(
            ETaskInputKeys.IS_COMPLETED,
            identifyStatus(e.target.value),
          )
        }
        className="rounded-xl border px-2 py-1"
      >
        <option value="">Status</option>
        <option value="true">Completed</option>
        <option value="false">Incomplete</option>
      </select>
    </div>
  );
}
