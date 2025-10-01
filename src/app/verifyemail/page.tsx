"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError("");
    } catch (error: any) {
      setVerified(false);
      setError(error.response?.data?.error || "Verification failed");
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl mb-4">Verify Email</h1>

      {verified ? (
        <div className="text-center">
          <h2 className="text-2xl text-green-500 mb-4">
            Email Verified Successfully!
          </h2>
          <Link
            href="/login"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </Link>
        </div>
      ) : error ? (
        <div className="text-center">
          <h2 className="text-2xl bg-red-500 text-white p-4 rounded">
            {error}
          </h2>
          <Link
            href="/signup"
            className="mt-4 inline-block text-blue-500 hover:text-blue-700"
          >
            Back to Signup
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-xl">Verifying your email...</h2>
        </div>
      )}
    </div>
  );
}
