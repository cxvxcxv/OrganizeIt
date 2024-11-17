'use client';

import { Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

import { Dialog } from '../Dialog';
import { ButtonActive } from '../ui/buttons/ButtonActive';

const DynamicCreateTaskDialogContent = dynamic(
  () => import('@/components/task/CreateTaskDialogContent'),
  { ssr: false },
);

export function CreateTask() {
  const createTaskDialogRef = useRef<HTMLDialogElement>(null);

  const toggleCreateTaskDialog = () => {
    if (!createTaskDialogRef.current) return;
    createTaskDialogRef.current.hasAttribute('open')
      ? createTaskDialogRef.current.close()
      : createTaskDialogRef.current.showModal();
  };

  return (
    <section>
      <ButtonActive
        onClick={() => toggleCreateTaskDialog()}
        aria-label="create task"
      >
        <Plus />
        <span className="hidden md:block">New Task</span>
      </ButtonActive>
      <Dialog ref={createTaskDialogRef} toggleDialog={toggleCreateTaskDialog}>
        <DynamicCreateTaskDialogContent
          toggleCreateTaskDialog={toggleCreateTaskDialog}
        />
      </Dialog>
    </section>
  );
}
