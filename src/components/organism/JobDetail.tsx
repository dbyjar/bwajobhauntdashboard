import { FC } from "react";
import { Separator } from "../ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "../ui/badge";
import { PartyPopper } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Applicant, CategoryJob, Job } from "@prisma/client";

type JobDetailType = {
  CategoryJob: CategoryJob | null;
  Applicant: Applicant | null;
} & Job;

interface JobDetailProps {
  data: JobDetailType | any;
}

const JobDetail: FC<JobDetailProps> = ({ data }: JobDetailProps) => {
  const benefits: any = data?.benefits;

  return (
    <>
      <div className="grid grid-cols-3 w-full gap-5">
        <div className="col-span-2 space-y-10">
          <div>
            <div className="text-3xl font-semibold">Description</div>
            <div
              className="text-gray-500 mt-3"
              dangerouslySetInnerHTML={{ __html: data?.jobDescription }}
            ></div>
          </div>
          <div>
            <div className="text-3xl font-semibold">Responsiblity</div>
            <div
              className="text-gray-500 mt-3"
              dangerouslySetInnerHTML={{ __html: data?.responsiblity }}
            ></div>
          </div>
          <div>
            <div className="text-3xl font-semibold">Who You Are</div>
            <div
              className="text-gray-500 mt-3"
              dangerouslySetInnerHTML={{ __html: data?.whoYouAre }}
            ></div>
          </div>
          <div>
            <div className="text-3xl font-semibold">Nice-To-Have</div>
            <div
              className="text-gray-500 mt-3"
              dangerouslySetInnerHTML={{ __html: data?.niceToHaves }}
            ></div>
          </div>
        </div>
        <div>
          <div className="text-3xl font-semibold">About this role</div>
          <div className="bg-gray-100 p-3 text-center mt-6 rounded">
            {data?.applicants}{" "}
            <span className="text-gray-500">of {data?.needs} capacity</span>
            <Progress
              value={(data?.needs ?? 0 / data?.applicants ?? 0) / 100}
              className="my-2"
            />
          </div>

          <div className="my-5 space-y-5">
            <div className="flex justify-between">
              <div className="text-gray-500">Apply Before</div>
              <div className="font-semibold">{formatDate(data?.dueDate)}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-500">Job Posted On</div>
              <div className="font-semibold">
                {formatDate(data?.datePosted)}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-500">Job Type</div>
              <div className="font-semibold">{data?.jobType}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-500">Salary</div>
              <div className="font-semibold">
                ${data?.salaryFrom}-${data?.salaryTo}
              </div>
            </div>
            <Separator />
            <div className="my-10">
              <div className="text-3xl font-semibold mb-4">Categories</div>
              <div className="space-x-5">
                <Badge>{data?.CategoryJob ? data?.CategoryJob.name : ""}</Badge>
              </div>
            </div>
            <Separator />
            <div className="my-10">
              <div className="text-3xl font-semibold mb-4">Required Skills</div>
              <div className="space-x-5">
                {data?.requiredSkills.map((item: string, i: number) => (
                  <Badge key={i} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Separator />
        <div className="mt-5">
          <div className="text-3xl font-semibold">Perks and Benefits</div>
          <div className="text-gray-500 mt-3">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {benefits.map((item: any, index: number) => (
              <div
                className="border border-gray-200 rounded-sm p-3 relative w-[200px]"
                key={index}
              >
                <PartyPopper className="text-primary w-7 h-7 mb-5" />
                <div className="text-xl font-semibold mb-3">{item.benefit}</div>
                <div className="text-gray-500 text-sm">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetail;
