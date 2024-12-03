/* eslint-disable @typescript-eslint/no-unused-vars */


'use client';

import { Separator } from '@/components/ui/separator';
import { auth, handleresetpassword } from '@/app/firebase/config';
import { Tabs } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";


export default function MusicPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { toast } = useToast();
  const showErrorToast = (arg: string) => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: arg,
      className: "w-96",
    })
  };
  const handleResetPassword = async () => {
        try {
           handleresetpassword(email);
          router.push('/');
        } catch (e) {
          showErrorToast((e as Error).message);
        };
    }
  return (
    <div className="h-full px-4 py-6 lg:px-9 flex items-center justify-center">
      <>
        <div className="h-full flex items-center justify-center transform scale-125">
          <div className="w-full max-w-md p-3 rounded-lg shadow-lg">
            <Tabs defaultValue="music" className="space-y-6">
              <div className="space-y-1 text-left">
                <p className="text-2xl font-semibold tracking-tight">
                  Rest Password
                </p>
              </div>
              <div className="mt-0 mb-0">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 mb-4 text-white placeholder-gray-500"
                />
                <Button
                  onClick={handleResetPassword}
                  className="w-full"
                >
                  Send Reset Email
                </Button>
              </div>
            </Tabs>
          </div>
        </div>
      </>
    </div>
  );
}