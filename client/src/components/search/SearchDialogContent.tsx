'use client';

import { useEffect, useState } from 'react';

import { ESearchFilterKeys, TSearchFilters } from '@/types/searchFilter.types';
import { ITask } from '@/types/task.types';

import { useProfile } from '@/hooks/useProfile';

import { Field } from '../ui/Field';
import { ButtonActive } from '../ui/buttons/ButtonActive';

import { SearchFilters } from './SearchFilters';
import { SearchTaskItem } from './SearchTaskItem';
import { handleSearch } from './handleSearch';

export function SearchDialogContent({
  toggleSearchDialog,
}: {
  toggleSearchDialog: () => void;
}) {
  const { data: { tasks = [], categories = [] } = {}, isSuccess } =
    useProfile();
  const [searchFilters, setSearchFilters] = useState<TSearchFilters>();
  const [searchValue, setSearchValue] = useState('');
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);

  const handleChangeSearchFilters = (filter: ESearchFilterKeys, value: any) => {
    setSearchFilters(prev => ({ ...prev, [filter]: value }));
  };

  const handleUpdateTaskList = (updatedTask: ITask) => {
    console.log('updating task list...');
    const updatedTasks = filteredTasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task,
    );
    setFilteredTasks(handleSearch(updatedTasks, searchFilters, searchValue));
  };

  useEffect(() => {
    setFilteredTasks(handleSearch(tasks, searchFilters, searchValue));
  }, [isSuccess, searchFilters, searchValue]);

  return (
    <section>
      <Field
        label=""
        id="search"
        placeholder="Search..."
        onChange={e => setSearchValue(e.target.value)}
        value={searchValue}
      />
      <div className="my-4">
        <h3 className="mb-2">Add filters</h3>
        <SearchFilters
          categories={categories}
          handleChangeSearchFilters={handleChangeSearchFilters}
        />
      </div>

      <h3 className="mb-2">Tasks</h3>
      <div className="max-h-64 overflow-y-auto border-y border-background">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <SearchTaskItem
              key={task.id}
              task={task}
              handleUpdateTaskList={handleUpdateTaskList}
            />
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </div>
      <ButtonActive
        className="m-auto mt-4 w-full md:w-1/2"
        onClick={toggleSearchDialog}
      >
        Close
      </ButtonActive>
    </section>
  );
}