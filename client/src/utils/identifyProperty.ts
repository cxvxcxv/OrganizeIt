// helper function to identify the category ID for the search component
export const identifySearchCategoryId = (value: string) =>
  value === 'null' ? null : value === '' ? undefined : Number(value);

export const identifyTaskCategoryId = (value: string) =>
  value === 'null' ? null : Number(value);

export const identifyStatus = (value: string) =>
  value === 'true' ? true : value === 'false' ? false : undefined;
