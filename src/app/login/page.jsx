"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { data: session, status } = useSession();

    useEffect(() => {
    if (status === "authenticated") {
      router.push("/profile");
    }
    }, [status, router]);

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push("/profile");
    } else {
      setError("Имэйл эсвэл нууц үг буруу байна");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
      <h1 className="text-xl font-bold">Нэвтрэх</h1>
      <input
        className="border p-2"
        placeholder="Имэйл"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2"
        placeholder="Нууц үг"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleLogin} className="bg-blue-600 text-white p-2">
        Нэвтрэх
      </button>
      <button
        onClick={() => {signIn("google"); router.push("/profile")}}
        className="bg-red-500 text-white p-2"
      >
        Google-р нэвтрэх
      </button>
      <div className="cursor-pointer" onClick={() => {router.push("/register")}}>Бүртгүүлэх</div>
    </div>
  );
}
