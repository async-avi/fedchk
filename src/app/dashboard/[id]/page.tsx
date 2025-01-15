"use client";
import React from "react";
import { useParams } from "next/navigation";
import AddChunkform from "@/components/createChunks/AddChunkform";
function page() {
  const params = useParams();
  return (
    <>
      <h1>Page of {params.id}</h1>
      <AddChunkform />
    </>
  );
}

export default page;
