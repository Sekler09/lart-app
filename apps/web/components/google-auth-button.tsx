import React, { FC } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import GoogleIcon from '@/assets/icons/google.svg';

interface GoogleAuthButtonProps {
  disabled?: boolean;
  title: string;
}

const GoogleAuthButton: FC<GoogleAuthButtonProps> = ({ disabled, title }) => {
  const googleSignInUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;

  return (
    <Button variant="outline" className="w-full" asChild disabled={disabled}>
      <Link href={disabled ? '#' : googleSignInUrl} aria-disabled={disabled}>
        <GoogleIcon height={20} width={20} className="mr-2" />
        {title}
      </Link>
    </Button>
  );
};

export default GoogleAuthButton;
