import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { Loader } from '@/components/Loader';
import { Field } from '@/components/ui/Field';
import { ButtonActive } from '@/components/ui/buttons/ButtonActive';

import { MAX_CATEGORY_LENGTH } from '@/constants/category.constants';

import { ICategory } from '@/types/category.types';

import { errorCatch } from '@/api/error';

import { CategoryService } from '@/services/category.service';

export default function CategoryDialogContent({
  category,
  toggleCategoryDialog,
}: {
  category?: ICategory;
  toggleCategoryDialog: () => void;
}) {
  const queryClient = useQueryClient();
  const [newCategoryName, setNewCategoryName] = useState(category?.name || '');
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate, isPending } = useMutation({
    mutationKey: ['createOrUpdateCategory'],
    mutationFn: () =>
      category
        ? CategoryService.update(category.id, { name: newCategoryName })
        : CategoryService.create({ name: newCategoryName }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toggleCategoryDialog();
      setErrorMessage('');
      setNewCategoryName('');
    },
    onError: err => setErrorMessage(errorCatch(err)),
  });

  useEffect(() => {
    setNewCategoryName(category?.name || '');
  }, [category]);

  return (
    <section>
      <Field
        id="categoryName"
        label=""
        placeholder="Category name"
        maxLength={MAX_CATEGORY_LENGTH}
        value={newCategoryName}
        onChange={e => setNewCategoryName(e.target.value)}
      />
      <p className="text-xs text-error">{errorMessage}</p>
      <ButtonActive
        className="mt-8 w-full"
        onClick={() => mutate()}
        disabled={isPending || !newCategoryName}
      >
        {isPending ? <Loader /> : 'Save'}
      </ButtonActive>
    </section>
  );
}
