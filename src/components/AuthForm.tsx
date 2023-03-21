"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useState, FormEvent } from "react";

export default function AuthForm({ type }: { type: "signin" | "signup" }) {
  const [email, setEmail] = useState("");

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    signIn("email", {
      email: cleanEmail,
      redirect: false,
      callbackUrl: "/workspace",
    });

    setEmail("");
  };

  const form =
    type === "signin"
      ? {
          title: "Sign in",
          callout: (
            <p className="text-xs">
              No account?{" "}
              <a href={"/auth/signup"} className="text-blue-500">
                Create one!
              </a>
            </p>
          ),
        }
      : {
          title: "Sign up",
          callout: (
            <p className="text-xs">
              Already have an account?{" "}
              <a href={"/auth/signup"} className="text-blue-500">
                Sign in!
              </a>
            </p>
          ),
        };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSignIn}
      className=" bg-gray-100 mx-auto p-12 rounded-sm overflow-hidden"
    >
      <div className="mb-4">
        <div className="">
          <p>Codefork</p>
        </div>
      </div>
      <motion.div
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-2">
          <p className="font-semibold text-2xl">{form.title}</p>
          <p>to continue to codefork teams</p>
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b border-black outline-none bg-transparent mb-4 pb-2"
            placeholder="Email"
          />

          {form.callout}

          <div className="flex justify-end">
            <button
              type="submit"
              className="py-1 px-3 rounded-sm bg-slate-700 text-white semibold w-fit"
            >
              Submit
            </button>
          </div>
        </div>
      </motion.div>
    </motion.form>
  );
}
