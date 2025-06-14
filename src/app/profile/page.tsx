"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { auth } from "~/server/auth";

export default function profile() {

    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
    if (status !== "authenticated") {
    router.push("/login");
    }
    }, [status, router]);



  return (
    <div>
        <h1>Profile Page</h1>
        <p>Welcome to your profile!</p>
        <button
            onClick={ () => {
            signOut({ callbackUrl: "/login" });
            }}
        >
            Logout
        </button>
    </div>

  )
}
