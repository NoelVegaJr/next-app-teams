import "./globals.css";
import AuthContext from "./AuthContext";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const metadata = {
  title: "My App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <div className="flex-1 relative">
          <AuthContext session={session!}>
            <>{children}</>
          </AuthContext>
        </div>
      </body>
    </html>
  );
}
