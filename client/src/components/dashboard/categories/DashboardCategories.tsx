'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';

import { Dialog } from '@/components/Dialog';

import { ICategory } from '@/types/category.types';

import { useProfile } from '@/hooks/useProfile';

import { DashboardCategoryItem } from './DashboardCategoryItem';
import { CategoryService } from '@/services/category.service';

const DynamicCategoryDialogContent = dynamic(
  () => import('@/components/dashboard/categories/CategoryDialogContent'),
  { ssr: false },
);

export function DashboardCategories() {
  const queryClient = useQueryClient();
  const { data: { categories = [] } = {} } = useProfile();
  const categoryDialogRef = useRef<HTMLDialogElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<ICategory>();

  const toggleCategoryDialog = (category?: ICategory) => {
    setSelectedCategory(category);
    if (!categoryDialogRef.current) return;

    categoryDialogRef.current.hasAttribute('open')
      ? categoryDialogRef.current.close()
      : categoryDialogRef.current.showModal();
  };

  const { mutate } = useMutation({
    mutationKey: ['deleteCategory'],
    mutationFn: (categoryId: number) => CategoryService.delete(categoryId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
  });

  return (
    <section className="rounded-xl bg-white p-4">
      <h3 className="border-b border-background pb-4">
        My categories ({categories.length})
      </h3>
      <div className="max-h-96 overflow-y-auto">
        {categories.map(category => (
          <DashboardCategoryItem
            key={category.id}
            category={category}
            onDelete={() => mutate(category.id)}
            toggleCategoryDialog={toggleCategoryDialog}
          />
        ))}
      </div>
      <button
        className="mt-4 flex items-center gap-1 px-2"
        onClick={() => toggleCategoryDialog()}
      >
        <Plus className="h-5 w-5" />
        <p className="text-sm font-semibold">Add more</p>
      </button>
      <Dialog toggleDialog={toggleCategoryDialog} ref={categoryDialogRef}>
        <DynamicCategoryDialogContent
          category={selectedCategory}
          toggleCategoryDialog={toggleCategoryDialog}
        />
      </Dialog>
    </section>
  );
}
