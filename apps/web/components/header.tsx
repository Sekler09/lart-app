import React, { FC } from 'react';
import ThemeToggler from './theme-toggler';
import { UserProfile } from '@repo/api/types/users';
import { useSignOut } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

interface HeaderProps {
  user: UserProfile | null;
}

const Header: FC<HeaderProps> = ({ user }) => {
  const router = useRouter();

  const { mutate: signOut } = useSignOut({
    onSuccess: () => {
      router.push('/signin');
    },
  });

  return (
    <header className="bg-gray-800 flex items-center justify-between text-white p-4">
      <p>Welcome, {user?.email}!</p>
      <div className="flex items-center gap-4">
        <ThemeToggler />
        <Button variant="secondary" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
    </header>
  );
};

export default Header;
