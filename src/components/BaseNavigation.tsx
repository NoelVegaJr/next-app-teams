"use client";
import { UserContext } from "@/app/AuthContext";

import Link from "next/link";
import { useContext } from "react";

export default function BaseNavigation() {
  const user = useContext(UserContext);
  return (
    <nav className="h-16 flex bg-slate-900 justify-between items-center px-6 text-white">
      <Link href="/">Teams</Link>
      {user ? (
        <div>User</div>
      ) : (
        <div className="flex gap-4">
          <Link href="/auth/signin">Sign in</Link>
          <Link href="/auth/signup">Sign up</Link>
        </div>
      )}
    </nav>
  );
}
