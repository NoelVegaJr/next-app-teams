import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  const me = await prisma.user.findUnique({
    where: { email: session.user?.email! },
    select: { profile: true },
  });

  // If the user does not have a profile redirect them to the profile creation page
  if (!me?.profile) redirect("/profile/new");

  redirect("/profile/" + me.profile.username);
}
