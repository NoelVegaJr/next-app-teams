import "./globals.css";
import Link from "next/link";
import AuthContext from "./AuthContext";
import { headers } from "next/headers";
import { Session } from "next-auth";
// import { getSession } from "next-auth/react";
// import { getSession } from "next-auth/react";

export const metadata = {
  title: "My App",
  description: "Generated by create next app",
};

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(
    `${
      process.env.VERCEL_URL ? process.env.VERCEL_URL : process.env.NEXTAUTH_URL
    }/api/auth/session`,
    {
      headers: {
        cookie,
      },
    }
  );

  const session = await response.json();
  console.log(session);

  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(headers().get("cookie") ?? "");

  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <nav className="h-16 flex bg-slate-900 justify-between items-center px-6 text-white">
          <Link href="/">Teams</Link>
          <div className="flex gap-4">
            <Link href="/auth/signin">Sign in</Link>
            <Link href="/auth/signup">Sign up</Link>
          </div>
        </nav>

        <div className="flex-1 ">
          <AuthContext session={session}>{children}</AuthContext>
        </div>
      </body>
    </html>
  );
}
