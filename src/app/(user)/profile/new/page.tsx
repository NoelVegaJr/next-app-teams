"use client";
import { UserContext } from "@/app/AuthContext";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";
import { useContext } from "react";

export default function Page() {
  const user = useContext(UserContext);
  if (!user) redirect("/auth/signin");
  return (
    <div className="h-full bg-slate-900 flex">
      <div className=" w-1/5 h-full bg-gradient-to-r from-slate-800/40 via-slate-900 to-slate-900 border-r-2 border-slate-700/50 flex flex-col items-center justify-center">
        <a
          href="/"
          className="h-10 w-10 fixed top-3 left-3 hover:bg-gray-50/10 grid place-content-center rounded-lg transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-slate-100"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
            />
          </svg>
        </a>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-slate-100 text-5xl font-semibold mb-4 text-center">
            67%
          </p>
          <p className="w-60 text-center text-lg text-slate-100">
            Time saved in total compared to projects not using Codefork.
          </p>
        </motion.div>
      </div>
      <div className=" flex-1 h-full pl-52 pt-24 bg-slate-800/60 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl w-full"
        >
          <p className="text-5xl text-slate-100 font-semibold mb-16">
            Set up your Codfork account.
          </p>

          <div className="w-44 h-44 rounded-full bg-gradient-to-r from-orange-300 to-rose-300 grid place-content-center mb-12">
            <div className="text-black text-3xl font-bold">NV</div>
          </div>

          <div className="flex gap-6 mb-4">
            <input
              type="text"
              placeholder="First name"
              className="mb-4 border-2 border-slate-600 py-1 pl-3 rounded  w-full bg-transparent outline-none focus:border-slate-400 text-slate-100"
            />
            <input
              type="text"
              placeholder="Last name"
              className="mb-4 border-2 border-slate-600 py-1 pl-3 rounded  w-full bg-transparent outline-none focus:border-slate-400 text-slate-100"
            />
          </div>
          <input
            type="text"
            placeholder="Username"
            className="mb-4 border-2 border-slate-600 py-1 pl-3 rounded  w-full bg-transparent outline-none focus:border-slate-400 text-slate-100"
          />
          <div className="flex items-center gap-2 mb-8">
            <input id="terms" type="checkbox" />
            <div className="text-slate-100 text-xs">
              <label htmlFor="terms">I agree with Codefork&apos;s </label>
              <button className="text-blue-400 hover-underline">
                Terms
              </button>{" "}
              and{" "}
              <button className="text-blue-400 hover-underline">
                Privacy Policy
              </button>
            </div>
          </div>
          <div>
            <button className="bg-indigo-500 py-1 px-4 rounded text-slate-100">
              Continue
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
