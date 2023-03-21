import { ReactNode } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/auth/signin");
  return <>{children}</>;
}
