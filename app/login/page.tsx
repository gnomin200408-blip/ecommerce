"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { User } from "../types";
import { UserContext } from "../providers/user-provider";
import { Header } from "../components/Header";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data);
      });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mx-auto max-w-sm">
          {!user ? (
            <form
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              onSubmit={handleSubmit}
            >
              <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Нэвтрэх
              </h2>

              {/* TODO 8: error утгатай үед алдааны мессеж харуулах */}

              {/* Username талбар */}
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Нэвтрэх нэр
                </label>
                {/* TODO 9: value={username} onChange холбох */}
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  id="username"
                  type="text"
                  required
                  placeholder="emilys"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
                />
              </div>

              {/* Password талбар */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Нууц үг
                </label>
                {/* TODO 10: value={password} onChange холбох */}
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  id="password"
                  type="password"
                  required
                  placeholder="emilyspass"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
                />
              </div>

              {/* TODO 11: disabled={loading} нэмэх, loading үед "Нэвтэрч байна..." текст харуулах */}
              <button
                type="submit"
                className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Нэвтрэх
              </button>

              <p className="mt-4 text-center text-xs text-zinc-400 dark:text-zinc-500">
                Туршилт: <span className="font-mono">emilys</span> /{" "}
                <span className="font-mono">emilyspass</span>
              </p>
            </form>
          ) : (
            <div>hello! {user.username}</div>
          )}

          {/* ) : (
            <div>Hello {user.username}</div> */}
          {/* )} */}
          {/* TODO 7: form-д onSubmit={handleSubmit} холбох */}

          {/* TODO 12: Амжилттай нэвтэрсний дараа хэрэглэгчийн мэдээлэл харуулах */}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-4 text-center text-xs text-zinc-400">
          Exercise App &middot; Data from dummyjson.com
        </div>
      </footer>
    </div>
  );
}
