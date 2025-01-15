"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  async function handleSubmit(e: any) {
    e.preventDefault();
    let resp = await axios.post("/api/user/signin", user);
    let data = await resp.data;
    if (data.status != 200) {
      setError(true);
      setErrorMessage(data.error);
    } else if (data.status == 200) {
      setSuccess(true);
      router.push(`verify`);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Sign In</button>
      </form>
      {error ? (
        <div className="bg-red-300 text-red-800 p-4">
          <h1>{errorMessage}</h1>
        </div>
      ) : success ? (
        <h1 className="text-white">Loading....</h1>
      ) : null}
    </div>
  );
}

export default page;
