'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';

import { Dialog } from '../Dialog';

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
      <button
        id="search"
        onClick={() => toggleSearchDialog()}
        className="w-full cursor-text rounded-md bg-background px-4 py-2 text-left text-black text-opacity-40"
      >
        Search...
      </button>
      <Dialog ref={searchDialogRef} toggleDialog={toggleSearchDialog}>
        <DynamicSearchDialogContent toggleSearchDialog={toggleSearchDialog} />
      </Dialog>
    </section>
  );
}
