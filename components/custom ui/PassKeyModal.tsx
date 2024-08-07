// PassKeyModal.tsx
"use client";
import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { decryptKey, encryptKey } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const PassKeyModal = () => {
  const [open, setOpen] = useState(false);
  const [passKey, setPassKey] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const path = usePathname();

  const closeModal = () => {
    setOpen(false);
    router.push('/');
  };

  const encryptedKey =
    typeof window !== 'undefined' ? Cookies.get('accessKey') : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);
    if (path) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false);
        router.push('/admin');
      } else {
        setOpen(true);
      }
    }
  }, [encryptedKey]);

  const validatePassKey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passKey);
      Cookies.set('accessKey', encryptedKey);
      setOpen(false);
      router.push('/admin');
    } else {
      setError('Invalid passkey. Please try again.');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="text-white">
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <Image
              src="/icons/close.svg"
              width={24}
              height={24}
              alt="close"
              onClick={closeModal}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin dashboard, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP maxLength={6} value={passKey} onChange={setPassKey}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="shad-error text-14-regular mt-4 flex justify-center">{error}</p>}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={validatePassKey}
            className="primary-gradient w-full text-white"
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PassKeyModal;
