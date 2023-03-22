"use client";

import NotificationContext from "@/providers/NotificationProvider";
import { AnimatePresence, motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useState, FormEvent, useContext } from "react";
import { toast } from "react-hot-toast";
import Notification from "./Notification";

export default function AuthForm({ type }: { type: "signin" | "signup" }) {
  const [authType, setAuthType] = useState(type);
  const [email, setEmail] = useState("");

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    const cleanEmail = email.trim();
    if (!cleanEmail) return;
    let id = toast.loading("Sending login email");
    await signIn("email", {
      email: cleanEmail,
      redirect: false,
      callbackUrl: "/profile",
    });
    toast.remove(id);
    toast.custom(
      (t) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5"></div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{email}</p>
                <p className="mt-1 text-sm text-gray-500">Login email sent</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.remove(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </motion.div>
      ),
      { duration: 3000 }
    );

    setEmail("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <Notification direction="top right" />
        <Notification direction="top right" />
      </div>

      <Notification direction="top center" />
      <form
        className=" bg-gray-100 mx-auto w-full shrink-0 p-12 rounded-sm overflow-hidden"
        onSubmit={handleSignIn}
      >
        <div className="mb-4">
          <div className="">
            <p>Codefork</p>
          </div>
        </div>
        <motion.div
          initial={{ x: authType === "signin" ? 300 : 0 }}
          animate={{ x: authType === "signin" ? 0 : -430 }}
          transition={{ duration: 0.7 }}
          className=" flex mb-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: authType == "signin" ? 1 : 0 }}
            className="shrink-0 w-full mr-20"
          >
            <div className="mb-2">
              <p className="font-semibold text-2xl">Sign in</p>
              <p>to continue to codefork teams</p>
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b border-black outline-none bg-transparent mb-2 pb-2"
                placeholder="Email"
              />

              <div className="flex gap-2 items-center">
                <p className="text-xs">Dont have an account? </p>

                <button
                  type="button"
                  onClick={() =>
                    authType === "signin"
                      ? setAuthType("signup")
                      : setAuthType("signin")
                  }
                  className="text-blue-500 text-xs"
                >
                  Create one!
                </button>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: authType == "signup" ? 1 : 0 }}
            className="shrink-0 w-full"
          >
            <div className="mb-2">
              <p className="font-semibold text-2xl">Sign up</p>
              <p>to continue to codefork teams</p>
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b border-black outline-none bg-transparent mb-2 pb-2"
                placeholder="Email"
              />

              <p className="text-xs">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() =>
                    authType === "signin"
                      ? setAuthType("signup")
                      : setAuthType("signin")
                  }
                  className="text-blue-500"
                >
                  Create one!
                </button>
              </p>

              <div className="flex justify-end"></div>
            </div>
          </motion.div>
        </motion.div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="py-1 px-3 rounded-sm bg-slate-700 text-white semibold w-fit"
          >
            Submit
          </button>
        </div>
      </form>
    </motion.div>
  );
}
