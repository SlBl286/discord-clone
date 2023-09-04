import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { channel } from "diagnostics_channel";
import { redirect } from "next/navigation";
import ServerHeader from "./server-header";

interface ServerSidebarProps {
  serverId: string;
}

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
  if (!server) {
    return redirect("/");
  }
  const textChannel = server?.channels.filter(
    (channel) => channel.type === "TEXT"
  );

  const audioChannel = server?.channels.filter(
    (channel) => channel.type === "AUDIO"
  );
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );

  const role = server?.members.find(
    (member) => member.profileId === profile.id
  )?.role;
  return (
    <div
      className="flex flex-col h-full text-primary
  w-full dark:bg-[#2D2B31] bg-[#F2F3F5] "
    >
      <ServerHeader server={server} role={role} />
    </div>
  );
};
