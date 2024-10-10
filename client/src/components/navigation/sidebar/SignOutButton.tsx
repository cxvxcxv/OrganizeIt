'use client';

import { useMutation } from '@tanstack/react-query';
import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { PAGES } from '@/config/urls.config';

import { AuthService } from '@/services/auth/auth.service';

export function SignOutButton() {
  const { replace } = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['signOut'],
    mutationFn: () => AuthService.signOut(),
    onSuccess: () => replace(PAGES.AUTH),
  });

  return (
    <button
      onClick={() => mutate()}
      className="flex w-full items-center border-l-8 border-t border-l-transparent border-t-background px-8 py-4"
    >
      <LogOutIcon className="mr-3 inline-block" strokeWidth={1.5} />
      Sign Out
    </button>
  );
}
