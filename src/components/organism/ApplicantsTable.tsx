"use client";

import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { JOB_APPLICANT_COLUMNS } from "@/constants";

import ActionTool from "@/components/organism/ActionTool";
import { Applicant } from "@prisma/client";

interface propsTypes {
  applicant: Applicant[] | undefined;
}

const ApplicantsTable: FC<propsTypes> = ({ applicant }) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {JOB_APPLICANT_COLUMNS.map((column: string) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicant
            ? applicant.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item?.User.name}</TableCell>
                  <TableCell>{"applied"}</TableCell>
                  <TableCell className="text-right">
                    <ActionTool
                      detail={"/job/detail"}
                      withoutEdit
                      withoutRemove
                    />
                  </TableCell>
                </TableRow>
              ))
            : ""}
        </TableBody>
      </Table>
    </>
  );
};

export default ApplicantsTable;
