import React, { FC, ReactNode } from "react";
import { Separator } from "../ui/separator";

interface FieldInputProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const FieldInput: FC<FieldInputProps> = ({
  children,
  title,
  subtitle,
}: FieldInputProps) => {
  return (
    <>
      <div className="flex flex-row items-start">
        <div className="w-[35%]">
          <div className="font-semibold">{title}</div>
          <div className="text-gray-400 w-80">{subtitle}</div>
        </div>
        {children}
      </div>
      <Separator />
    </>
  );
};

export default FieldInput;
