import { FC } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Icon from "@/components/organism/Icon";
import JobDetail from "@/components/organism/JobDetail";
import ApplicantsTable from "@/components/organism/ApplicantsTable";
import prisma from "../../../../../../lib/prisma";

interface propsTypes {
  params: { id: string };
}

const getDetailData = async (id: string) => {
  const res = await prisma.job.findFirst({
    where: { id },
    include: {
      Applicant: {
        include: {
          User: true,
        },
      },
      CategoryJob: true,
    },
  });

  return res;
};

const JobListingsDetailPage = async ({ params }: propsTypes) => {
  const data = await getDetailData(params.id);

  return (
    <div>
      <div className="inline-flex items-center gap-5 mb-5">
        <div>
          <Link href="/job">
            <Icon name="arrow-left" className="w-9 h-9"></Icon>
          </Link>
        </div>
        <div>
          <div className="text-2xl font-semibold mb-1">{data?.roles}</div>
          <div>
            {data?.CategoryJob?.name} • {data?.jobType} •{" "}
            <span className="text-gray-500">
              {data?.applicants}/{data?.needs} Hired
            </span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="applicants" className="mt-5">
        <TabsList className="mb-5">
          <TabsTrigger value="applicants">Applicants</TabsTrigger>
          <TabsTrigger value="jobDetails">Job Detail</TabsTrigger>
        </TabsList>
        <TabsContent value="applicants">
          <ApplicantsTable applicant={data?.Applicant} />
        </TabsContent>
        <TabsContent value="jobDetails">
          <JobDetail data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobListingsDetailPage;
