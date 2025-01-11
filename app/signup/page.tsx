'use client';
import { Separator } from '@/components/ui/separator';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, createUserProfile } from '@/app/firebase/config';
import { updateProfile } from 'firebase/auth';
import { Tabs } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import Link from 'next/link';

export default function MusicPage() {
  const [email, setEmail] = useState('');
  const [displayname, setdisplayname] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Email and password are required');
      return;
    }
  
    try {
      // Sign up user function
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem('user', 'true');
      setEmail('');
      setPassword('');
  
      if (res && res.user) {
        const profileData = {
          displayname: displayname,
          email: email,
          id: res.user.uid
        };
        createUserProfile(res.user.uid, profileData);
        router.push('/');
      }
  
      if (auth.currentUser) {
        updateProfile(auth.currentUser, { displayName: displayname })
          .catch((error) => {
            alert("An error happened when updating profile: " + error.message);
          });
      }
  
      router.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="h-full px-4 py-6 lg:px-9 flex items-center justify-center">
      <>
        <div className="h-full flex items-center justify-center transform scale-125">
          <div className="w-full max-w-md p-3 rounded-lg shadow-lg">
            <Tabs defaultValue="music" className="space-y-4">
              <div className="space-y-1 text-left">
                <p className="text-2xl font-semibold tracking-tight">
                  Sign Up
                </p>
                <div className="flex items-center space-x-2">
                    <Link href='/login' className='text-blue-500'>Login</Link>
                    <p className="text-gray-500 text-sm">or</p>
                    <Link href='/resetpassword' className='text-blue-500'>Reset Password</Link>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="relative">
                <Input
                  type="displayname"
                  placeholder="Display Name"
                  value={displayname}
                  onChange={(e) => setdisplayname(e.target.value)}
                  className="w-full p-3 mb-4 text-white placeholder-gray-500"
                />
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
              <div id="bottom">
                <p className="text-sm text-gray-600">
                By signing up, you agree to the 
                <a href="/termsofservice" className="text-blue-500 hover:underline"> Terms of Service </a> 
                and 
                <a href="/privacypolicy" className="text-blue-500 hover:underline"> Privacy Policy</a>.
              </p>
              </div>
            </Tabs>
          </div>
        </div>
      </>
    </div>
  );
}