"use client";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const { id } = useParams();
  const sp = useSearchParams();
  let t = sp.get("t");
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (t == "true") {
      axios.get("/api/user/verify/" + id).then((res) => {
        setRender(true);
        router.push(`/dashboard/${res.data.data}`);
      });
    }
  });

  return (
    <main>
      <h1>{render ? "Verified" : "Not verified"}</h1>
    </main>
  );
}

export default page;
