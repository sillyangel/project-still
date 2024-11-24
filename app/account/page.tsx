'use client';

import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { auth } from '@/app/firebase/config';
import { updateProfile, updatePassword, deleteUser } from 'firebase/auth';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


export default function MusicPage() {
    const FormSchema = z.object({
        username: z.string().min(2, {
          message: "Username must be at least 2 characters.",
        }),
      })
      
      const PassFormSchema = z.object({
        password: z.string().min(6, {
          message: "Password must be at least 6 characters.",
        }),
      });

      const passform = useForm<z.infer<typeof PassFormSchema>>({
        resolver: zodResolver(PassFormSchema),
        defaultValues: {
          password: "",
        },
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          username: auth.currentUser ? auth.currentUser.displayName || "" : "",
        },
    });

      function onSubmit(data: z.infer<typeof FormSchema>) {
        if (auth.currentUser) {
          updateProfile(auth.currentUser, { displayName: data.username })
            .then(() => {
              alert("Updated Profile Details");
            })
            .catch((error) => {
              alert("An error happened when updating profile: " + error.message);
            });
        } else {
          alert("No user is currently signed in.");
        }
      }
      function PasswordChange(data: z.infer<typeof PassFormSchema>) {
        if (auth.currentUser) {
          updatePassword(auth.currentUser, data.password)
            .then(() => {
              alert("Updated Profile Details");
            })
            .catch((error) => {
              alert("An error happened when updating profile: " + error.message);
            });
          } else {
            alert("No user is currently signed in.");
          }
      }
      function DeleteUserAccount() {
        if (auth.currentUser) {
          deleteUser(auth.currentUser)
            .then(() => {
              alert("Deleted User Account");
            })
            .catch((error) => {
              alert("An error happened when deleting user account: " + error.message);
            });
          } else {
            alert("No user is currently signed in.");
          }
      }
  return (
    <div className="h-full px-4 py-6 lg:px-8">
    <>
      <Tabs defaultValue="music" className="h-full space-y-6">
        <TabsContent value="music" className="border-none p-0 outline-none">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Account Settings
              </h2>
              <p className="text-sm text-muted-foreground">
                change your account settings here ig?
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="relative">
              <div className="flex space-x-4 pb-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-3">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Name</FormLabel>
                          <FormControl>
                            <Input placeholder="sillyangel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </div>
              <div className="flex space-x-4 pb-4">
                <Form {...passform}>
                  <form onSubmit={passform.handleSubmit(PasswordChange)} className="w-2/3 space-y-3">
                    <FormField
                      control={passform.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Change Password</FormLabel>
                          <FormControl>
                            <Input placeholder="Password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                scary settings
              </h2>
              <p className="text-sm text-muted-foreground">
                spooky settings people dont usually touch
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="relative">
              <div className="flex space-x-4 pb-4">
                <h2>Delete Account</h2>
                <Button onClick={DeleteUserAccount} variant="destructive">Delete Account</Button>
              </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
    </div>
  );
}