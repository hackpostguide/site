import { getUserWithUsername } from "@/lib/firebase";

export async function getUIDWithUsername(username: string) {
  const userDoc = await getUserWithUsername(username);
  return userDoc?.id;
}