"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });
  async function handleSubmit(e: any) {
    e.preventDefault();
    let resp = await axios.post("/api/user/signup", user);
    let data = await resp.data;
    if (data.status != 200) {
      setError(true);
    } else if (data.status == 200) {
      setSuccess(true);
      router.push(`verify/${data.data}?t=false`);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          onChange={(e) => setUser({ ...user, fullName: e.target.value })}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button type="submit">Sign Up</button>
      </form>
      {error ? (
        <div className="bg-red-300 text-red-800 p-4">
          <h1>Error</h1>
        </div>
      ) : null}
    </div>
  );
}

export default page;
