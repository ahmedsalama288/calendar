import { auth } from "@/auth";
import SignIn from "./sign-in";
import { SignOut } from "./signout-button";
import Image from "next/image";
import userAvatar from "@/public/user-avatar.webp";

export default async function Navbar() {
  const userSession = await auth();

  return (
    <nav className="w-full bg-white drop-shadow-md ">
      <div className=" container flex justify-between items-center p-4 mx-auto">
        <div>
          <Image
            className=" 
            rounded-full outline outline-2 
            outline-offset-2 outline-slate-400
          hover:outline-slate-300
            transition-all duration-200 cursor-pointer
            w-10 h-10
          "
            quality={100}
            priority
            width={1000}
            height={1000}
            src={
              userSession?.user
                ? (userSession?.user?.image as string)
                : userAvatar
            }
            alt="Image"
          />
        </div>
        <ul className="flex">
          <li className=" bg-[#1a73e8] text-white py-3 px-[26px] rounded  text-sm font-semibold">
            {!userSession?.user && <SignIn />}
            {userSession?.user && <SignOut />}
          </li>
        </ul>
      </div>
    </nav>
  );
}
