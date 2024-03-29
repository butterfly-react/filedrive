'use client'

import Image from "next/image";
import { SignInButton, useSession, SignedIn, SignedOut, SignOutButton, useOrganization} from '@clerk/nextjs'
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
export default function Home() {

  const { organization} = useOrganization()

  const files = useQuery(api.files.getFiles, organization?.id ? { orgId: organization.id } : 'skip' )

  const createFile = useMutation(api.files.createFile)

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
        if(!organization) return
        createFile({
          name: 'hello world',
          orgId: organization.id
        })
      }}>Click me</Button>
    </main>
  );
}
