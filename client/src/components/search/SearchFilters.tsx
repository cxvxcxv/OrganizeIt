'use client';

import { ICategory } from '@/types/category.types';
import { ESearchFilterKeys } from '@/types/searchFilter.types';

type TSearchFiltersProps = {
  categories: ICategory[];
  handleChangeSearchFilters: (filter: ESearchFilterKeys, value: any) => void;
};

// helper function to identify the category ID
const identifyCategoryId = (value: string) =>
  value === 'null' ? null : value === '' ? undefined : Number(value);

const identifyStatus = (value: string) =>
  value === 'true' ? true : value === 'false' ? false : undefined;

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
            ESearchFilterKeys.CATEGORY_ID,
            identifyCategoryId(e.target.value),
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
              ESearchFilterKeys.DEADLINE,
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
            ESearchFilterKeys.PRIORITY,
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
            ESearchFilterKeys.IS_COMPLETED,
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
