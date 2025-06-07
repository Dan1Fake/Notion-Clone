"use client"; // Keep this as it's a client component

import React from 'react'; // <--- ADD THIS IMPORT
import Document from "@/components/Document";
// import { useParams } from "next/navigation"; // You can likely remove this if not used elsewhere

function DocumentPage({
  params, // <--- Change this to receive the full 'params' Promise
}: {
  params: Promise<{ // <--- Type 'params' as a Promise
    id: string;
  }>;
}) {
  // Unwrap the params Promise using React.use()
  const resolvedParams = React.use(params);
  const { id } = resolvedParams; // <--- Access 'id' from the resolved object

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div>
  );
}

export default DocumentPage;