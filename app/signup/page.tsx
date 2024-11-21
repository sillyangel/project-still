'use client';

import { Separator } from '@/components/ui/separator';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { Tabs } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";

export default function MusicPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem('user', 'true');
      setEmail('');
      setPassword('');
      router.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="h-full px-4 py-6 lg:px-9 flex items-center justify-center">
      <>
        <div className="h-full flex items-center justify-center transform scale-150">
          <div className="w-full max-w-md p-3 rounded-lg shadow-lg">
            <Tabs defaultValue="music" className="space-y-6">
              <div className="space-y-1 text-left">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Sign Up
                </h2>
              </div>
              <Separator className="my-4" />
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 mb-4 text-white placeholder-gray-500"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 mb-4 text-white placeholder-gray-500"
                />
                <Button
                  onClick={handleSignIn}
                  className="w-full"
                >
                  Sign Up
                </Button>
              </div>
            </Tabs>
          </div>
        </div>
      </>
    </div>
  );
}