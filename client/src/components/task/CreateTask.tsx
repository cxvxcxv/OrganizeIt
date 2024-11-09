'use client';

import { Plus } from 'lucide-react';
import { useRef } from 'react';

import { Dialog } from '../Dialog';
import { ButtonActive } from '../ui/buttons/ButtonActive';

import { CreateTaskDialogContent } from './CreateTaskDialogContent';

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
      <ButtonActive onClick={() => toggleCreateTaskDialog()}>
        <Plus />
        <span className="hidden md:block">New Task</span>
      </ButtonActive>
      <Dialog ref={createTaskDialogRef} toggleDialog={toggleCreateTaskDialog}>
        <CreateTaskDialogContent
          toggleCreateTaskDialog={toggleCreateTaskDialog}
        />
      </Dialog>
    </section>
  );
}
