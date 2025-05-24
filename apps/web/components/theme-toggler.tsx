'use client';

import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="absolute h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
}
