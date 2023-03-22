"use client";
import { redirect } from "next/navigation";
import { ReactNode, useContext } from "react";
import { UserContext } from "../AuthContext";

export default function Layout({ children }: { children: ReactNode }) {
  const user = useContext(UserContext);

  if (user) {
    redirect("/profile");
  }
  return (
    <div className=" h-full bg-slate-800 flex justify-center items-center">
      <div className="w-full">
        <div className="max-w-md w-full mx-auto">
          {/* <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-gray-100 text-2xl text-center mb-8"
            >
              Codefork Teams
            </motion.h3> */}
          {children}
        </div>
      </div>
    </div>
  );
}
