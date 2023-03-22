import prisma from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);

  // If no session redirect the user to the sign in page
  if (!session) redirect("/signin");

  // Get logged in users profile
  const me = await prisma.user.findUnique({
    where: { email: session.user?.email! },
    select: { profile: true },
  });

  // If the user does not have a profile redirect them to the profile creation page
  if (!me?.profile) redirect("/profile/new");

  // Visiting our page or another users page ?
  if (me.profile.username === params.username) {
    // My profile page
    return <div>My page</div>;
  } else {
    // Visiting profile page
    const user = await prisma.profile.findUnique({
      where: { username: params.username },
    });
    if (!user) redirect("/");
    return <div>Visiting: {user.username}</div>;
  }
}
