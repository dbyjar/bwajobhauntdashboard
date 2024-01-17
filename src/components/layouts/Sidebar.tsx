"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import { IoExit } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import { BsClipboard2DataFill } from "react-icons/bs";
import { IoMdSettings, IoMdChatbubbles } from "react-icons/io";
import { FaBuilding, FaUsers, FaCalendarAlt } from "react-icons/fa";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  const router = useRouter();
  const pathName = usePathname();

  const isActive = (path: string) => {
    const parentRouteName = pathName.split("/")[1];

    return path === parentRouteName;
  };

  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
          <div className="space-y-3 mb-10">
            <Button
              variant={"ghost"}
              className={`w-full justify-start hover:text-blue-500 ${
                isActive("") && "bg-gray-100 text-blue-500"
              }`}
              onClick={() => router.push("/")}
            >
              <GoHomeFill className="me-3 text-lg" />
              Home
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start hover:text-blue-500"
            >
              <IoMdChatbubbles className="me-3 text-lg" />
              Messages
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start hover:text-blue-500"
            >
              <FaBuilding className="me-3 text-lg" />
              Company Profile
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start hover:text-blue-500"
            >
              <FaUsers className="me-3 text-lg" />
              All Applicants
            </Button>
            <Button
              variant={"ghost"}
              className={`w-full justify-start hover:text-blue-500 ${
                isActive("job") && "bg-gray-100 text-blue-500"
              }`}
              onClick={() => router.push("/job")}
            >
              <BsClipboard2DataFill className="me-3 text-lg" />
              Job Listing
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start hover:text-blue-500"
            >
              <FaCalendarAlt className="me-3 text-lg" />
              My Schedule
            </Button>
          </div>
          <h2 className="mb-2 px-4 text-lg font-semibold">Settings</h2>
          <div className="space-y-3">
            <Button
              variant={"ghost"}
              className={`w-full justify-start hover:text-blue-500 ${
                isActive("settings") && "bg-gray-100 text-blue-500"
              }`}
              onClick={() => router.push("/settings")}
            >
              <IoMdSettings className="me-3 text-lg" />
              Settings
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-200"
              onClick={() => router.push("/signin")}
            >
              <IoExit className="me-3 text-lg" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
