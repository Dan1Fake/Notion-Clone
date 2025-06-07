"use client";

import { createNewDocument } from "@/actions/actions";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";


function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      // create a new document
      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`);
    });
  };

  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending}>
      {isPending ? "Creating..." : "New Document"}
    </Button>
  );
}
export default NewDocumentButton;
