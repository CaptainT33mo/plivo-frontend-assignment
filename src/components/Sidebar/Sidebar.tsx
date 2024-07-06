"use client";

import { FiEdit } from "react-icons/fi";
import { UserNav } from "../UserNav/UserNav";
import { useStore } from "@/store";
import NewConversationModal from "../pages/Conversations/NewConversationModal";
import Link from "next/link";
import { Button } from "@/components/UI/Button";
import { LuContact2, LuInbox } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const { setOpenCreateConversationModal } = useStore();

  return (
    <div>
      <nav className="relative bg-white flex flex-col flex-shrink-0 w-56 font-sans text-sm text-gray-700 border-r border-gray-100 justify-items-start">
        <div>
          {/* Top menu*/}
          <div className="flex flex-col flex-grow-0 flex-shrink-0 px-5 py-3">
            <div className="flex items-center justify-between">
              {/* User avatar  */}
              <div className="relative">
                <div className="flex items-center justify-center p-0.5 rounded-full cursor-pointer hover:bg-gray-100">
                  <UserNav
                    trigger={
                      <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full p-0"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src="https://picsum.photos/200"
                            alt="@vibhor"
                          />
                          <AvatarFallback>VS</AvatarFallback>
                        </Avatar>
                      </Button>
                    }
                  />
                </div>
              </div>
              {/* Create issue btn */}
              <Button
                variant="ghost"
                className="border rounded-full w-10 h-10 p-1 flex items-center justify-center"
                onClick={() => {
                  setOpenCreateConversationModal(true);
                }}
              >
                <FiEdit size={18} />
              </Button>
            </div>
          </div>

          <div className="px-5">
            <Link
              href="/"
              className={`group relative w-full mt-0.5 py-2 px-2 flex items-center gap-2 font-medium rounded hover:bg-gray-100 text-black cursor-pointer ${
                pathname === "/" ? "bg-gray-300" : ""
              }`}
            >
              <LuInbox
                size={20}
                className="text-gray-500 group-hover:text-black"
              />
              Dashboard
            </Link>
            <Link
              href="/contacts"
              className={`group relative w-full mt-0.5 py-2 px-2 flex items-center gap-2 font-medium rounded hover:bg-gray-100 text-black cursor-pointer ${
                pathname === "/contacts" ? "bg-gray-300" : ""
              }`}
            >
              <LuContact2
                size={20}
                className="text-gray-500 group-hover:text-black"
              />
              Contacts
            </Link>
          </div>
        </div>
      </nav>

      <NewConversationModal />
    </div>
  );
}
