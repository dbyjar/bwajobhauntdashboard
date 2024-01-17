import moment from "moment";
import prisma from "../../../../lib/prisma";
import { formatDate } from "@/lib/utils";
import { getServerSession } from "next-auth";

import { Job } from "@prisma/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { JobListingsTypes, JOB_LISTING_COLUMNS } from "@/constants";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import ActionTool from "@/components/organism/ActionTool";
import Each from "@/components/atoms/Each";

export async function getJobs() {
  const session = await getServerSession(authOptions);
  const res = await prisma.job.findMany({
    where: {
      companyId: session?.user.id,
    },
  });

  return res;
}

const JobListingsPage = async () => {
  const jobs: Job[] = await getJobs();

  return (
    <div>
      <div className="font-semibold text-3xl">Job Listing</div>
      <div className="mt-10">
        <Table>
          <TableHeader>
            <TableRow>
              <Each
                of={JOB_LISTING_COLUMNS}
                render={({ item: column }) => (
                  <TableHead key={column}>{column}</TableHead>
                )}
              />
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Each
              of={jobs ?? []}
              render={({ item }: { item: JobListingsTypes }) => (
                <TableRow key={item.id}>
                  <TableCell>{item.roles}</TableCell>
                  <TableCell>
                    {moment(item.datePosted).isBefore(item.dueDate) ? (
                      <Badge>{"Live"}</Badge>
                    ) : (
                      <Badge variant={"outline"}>{"Expired"}</Badge>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(item.datePosted)}</TableCell>
                  <TableCell>{formatDate(item.dueDate)}</TableCell>
                  <TableCell>
                    <Badge variant={"outline"}>{item.jobType}</Badge>
                  </TableCell>
                  <TableCell>{item.applicants}</TableCell>
                  <TableCell>
                    {item.applicants}/{item.needs}
                  </TableCell>
                  <TableCell className="text-right">
                    <ActionTool
                      detail={`/job/detail/${item.id}`}
                      withoutEdit
                      withoutRemove
                    />
                  </TableCell>
                </TableRow>
              )}
            />
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobListingsPage;
