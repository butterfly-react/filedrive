'use client'

import Image from "next/image";
import { SignInButton, useSession, SignedIn, SignedOut, SignOutButton} from '@clerk/nextjs'
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
export default function Home() {

  const files = useQuery(api.file.getFiles)

  const createFile = useMutation(api.file.createFile)

  const session = useSession()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <SignOutButton>
          <Button>Sign Out</Button>
          </SignOutButton>
        </SignedIn>
 
        <SignedOut>

          <SignInButton mode="modal">

          <Button>Sign In</Button>
            </SignInButton>
      </SignedOut> 

      {files?.map((file: any) => <div key={file._id}>{file.name}</div>)}

      <Button onClick={() => {
        createFile({
          name: 'hello world'
        })
      }}>Click me</Button>
    </main>
  );
}
