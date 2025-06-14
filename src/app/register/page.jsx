"use client";

import { useState } from "react";
import { api } from "~/trpc/react"; // ← trpc client import
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const registerMutation = api.post.register.useMutation({
    onSuccess: () => {
      router.push("/login");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = () => {
    if (!name || !email || !password) {
      setError("Бүх талбарыг бөглөнө үү");
      return;
    }
    registerMutation.mutate({ name, email, password });
  };

  return (
    <div className="max-w-md mx-auto mt-10 flex flex-col gap-4">
      <h1 className="text-xl font-bold">Бүртгүүлэх</h1>
      <input
        className="border p-2"
        placeholder="Нэр"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button onClick={handleSubmit} className="bg-green-600 text-white p-2">
        Бүртгүүлэх
      </button>
    </div>
  );
}
