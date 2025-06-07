import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import React from 'react'; // Make sure React is imported if using async components (good practice)


// Make the function 'async'
async function DocLayout({
  children,
  params, // Receive the full params object (which is a Promise)
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>; // Type params as a Promise
}) {
  // Await the params Promise to get the resolved object
  const resolvedParams = await params;
  const { id } = resolvedParams; // Destructure id from the resolved object

  // This part is fine as auth.protect() is a synchronous call
  // that throws an error if unauthenticated, or continues if authenticated.
  auth.protect();

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

export default DocLayout;