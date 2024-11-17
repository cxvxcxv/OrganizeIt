'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';

import { Dialog } from '../Dialog';
import { Field } from '../ui/Field';

const DynamicSearchDialogContent = dynamic(
  () => import('@/components/search/SearchDialogContent'),
  { ssr: false },
);

export function Search() {
  const searchDialogRef = useRef<HTMLDialogElement>(null);

  const toggleSearchDialog = () => {
    if (!searchDialogRef.current) return;
    searchDialogRef.current.hasAttribute('open')
      ? searchDialogRef.current.close()
      : searchDialogRef.current.showModal();
  };

  return (
    <section>
      <Field
        id="search"
        label=""
        placeholder="Search..."
        onClick={() => toggleSearchDialog()}
      />
      <Dialog ref={searchDialogRef} toggleDialog={toggleSearchDialog}>
        <DynamicSearchDialogContent toggleSearchDialog={toggleSearchDialog} />
      </Dialog>
    </section>
  );
}
