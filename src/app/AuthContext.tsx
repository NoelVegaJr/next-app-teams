"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface AuthContextProps {
  children: React.ReactNode;
  session: Session;
}

export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data, status } = useSession();
  const [user, setUser] = useState(data?.user);

  useEffect(() => {
    setUser(data?.user);
  }, [data?.user]);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default function AuthContext({ children, session }: AuthContextProps) {
  return (
    <SessionProvider session={session}>
      <Toaster />
      <UserProvider>{children}</UserProvider>
    </SessionProvider>
  );
}
