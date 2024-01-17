"use client";

import React, { FC, ReactNode } from "react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Icon from "./Icon";

interface propsTypes {
  edit?: string;
  detail?: string;
  remove?: string;
  withoutEdit?: boolean;
  withoutDetail?: boolean;
  withoutRemove?: boolean;
  children?: ReactNode;
}

const ActionTool: FC<propsTypes> = ({
  edit,
  detail,
  remove,
  withoutEdit,
  withoutDetail,
  withoutRemove,
  children,
}) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icon name="chevron-down-circle" className="w-4 h-4"></Icon>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {children}
        {children && <DropdownMenuSeparator />}
        {!withoutEdit && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push(`${edit}`)}
          >
            <Icon name="pencil" className="w-4 h-4 me-2"></Icon>
            Edit
          </DropdownMenuItem>
        )}
        {!withoutDetail && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push(`${detail}`)}
          >
            <Icon name="eye" className="w-4 h-4 me-2"></Icon>
            Detail
          </DropdownMenuItem>
        )}
        {!withoutRemove && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push(`${remove}`)}
          >
            <Icon name="trash-2" className="w-4 h-4 me-2"></Icon>
            Remove
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionTool;
