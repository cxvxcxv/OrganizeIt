'use client';

import { useRef } from 'react';

import { Dialog } from '../Dialog';
import { Field } from '../ui/Field';

import { SearchDialogContent } from './SearchDialogContent';

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
        <SearchDialogContent toggleSearchDialog={toggleSearchDialog} />
      </Dialog>
    </section>
  );
}
