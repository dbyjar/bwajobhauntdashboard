"use client";

import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="pb-3 mb-8 border-b flex flex-row items-center justify-between">
      <div>
        <div>Company</div>
        <div className="font-semibold capitalize">{session?.user.name}</div>
      </div>
      <div>
        <Button
          className="rounded-none py-3 px-6"
          onClick={() => router.push("/job/create")}
        >
          <PlusIcon className="me-2 -ms-2 w-4 h-4" />
          Post a Job
        </Button>
      </div>
    </div>
  );
};

export default Header;
