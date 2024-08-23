import { auth } from "@/auth";
import Calendar from "./ui/components/calendar/calendar";

export default async function Home() {
  const userSession = await auth();

  return (
    <main className="flex h-full flex-col items-center justify-between pt-[70px]">
      <Calendar userSession={userSession} />
    </main>
  );
}
