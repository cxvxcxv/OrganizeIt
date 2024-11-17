'use client';

import { Pencil, Trash2 } from 'lucide-react';

import { ICategory } from '@/types/category.types';

export function DashboardCategoryItem({
  category,
  onDelete,
  toggleCategoryDialog,
}: {
  category: ICategory;
  onDelete: () => void;
  toggleCategoryDialog: (category?: ICategory) => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-background p-3">
      <p>{category.name}</p>
      <div className="flex items-center gap-4">
        <button
          aria-label="edit category"
          title="edit category"
          onClick={() => toggleCategoryDialog(category)}
        >
          <Pencil className="h-5 w-5 cursor-pointer transition-colors hover:text-primary" />
        </button>
        <button
          aria-label="delete category"
          title="delete category"
          onClick={onDelete}
        >
          <Trash2 className="h-5 w-5 cursor-pointer transition-colors hover:text-error" />
        </button>
      </div>
    </div>
  );
}
