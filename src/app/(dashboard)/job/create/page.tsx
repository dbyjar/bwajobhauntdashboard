"use client";

import { FC, useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { jobFormSchema } from "@/lib/form-schema";
import { JOBTYPES } from "@/constants";
import { useRouter } from "next/navigation";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

import FieldInput from "@/components/organism/FieldInput";
import InputSkills from "@/components/organism/InputSkills";
import InputBenefits from "@/components/organism/InputBenefits";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TextareaInput from "@/components/organism/TextareaInput";
import Icon from "@/components/organism/Icon";
import Each from "@/components/atoms/Each";
import { CategoryJob } from "@prisma/client";

interface PostJobPageProps {}

const PostJobPage: FC<PostJobPageProps> = ({}) => {
  const router = useRouter();
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);

  const { data: session } = useSession();
  const { data: jobs } = useSWR<CategoryJob[]>("/api/job/category", fetcher);

  const form = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      requiredSkills: [],
    },
  });

  const onSubmit = async (val: z.infer<typeof jobFormSchema>) => {
    try {
      const data: any = {
        needs: 20,
        applicants: 0,
        datePosted: new Date(),
        categoryId: val.categoryId,
        roles: val.roles,
        jobType: val.jobType,
        salaryFrom: val.salaryFrom,
        salaryTo: val.salaryTo,
        requiredSkills: val.requiredSkills,
        responsiblity: val.responsiblity,
        whoYouAre: val.whoYouAre,
        niceToHaves: val.niceToHaves,
        benefits: val.benefits,
        dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        companyId: session?.user.id,
        jobDescription: val.jobDescription,
      };

      await fetch("/api/job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      router.push("/job");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <>
      <div
        className="inline-flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/job")}
      >
        <div className="h-7 w-7">
          <Icon name="chevron-left-circle"></Icon>
        </div>
        <span className="text-2xl font-semibold">Post a Job</span>
      </div>
      <div className="my-5">
        <div className="text-lg font-semibold">Basic Information</div>
        <div className="text-gray-400">
          List out your top perks and benefits
        </div>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5 space-y-6 pt-6"
        >
          <FieldInput
            title="Job Title"
            subtitle="Job titles must be describe one position"
          >
            <FormField
              name="roles"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-[450px]"
                      placeholder="e.g. Software Engineer"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>At least 80 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FieldInput>
          <FieldInput
            title="Type of Employement"
            subtitle="You can select type of employement"
          >
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {JOBTYPES.map((item: string, i: number) => {
                        return (
                          <FormItem
                            className="flex items-center space-x-3 space-y-0"
                            key={i}
                          >
                            <FormControl>
                              <RadioGroupItem value={item} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item}
                            </FormLabel>
                          </FormItem>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FieldInput>
          <FieldInput
            title="Salary"
            subtitle="Please specify the estimated salary range for the role"
          >
            <div className="w-[450px] flex flex-row justify-between items-center">
              <FormField
                name="salaryFrom"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="w-full" placeholder="$100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span className="text-center">To</span>
              <FormField
                name="salaryTo"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="$1.000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FieldInput>
          <FieldInput
            title="Categories"
            subtitle="You can select job categories"
          >
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[450px]">
                      <SelectValue placeholder="Select Job Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <Each
                        of={jobs ?? []}
                        render={({ item }) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        )}
                      />
                    </SelectContent>
                  </Select>
                  <FormMessage className="mt-3"></FormMessage>
                </FormItem>
              )}
            />
          </FieldInput>
          <FieldInput
            title="Required Skills"
            subtitle="Add required skills for the job"
          >
            <InputSkills form={form}></InputSkills>
          </FieldInput>
          <FieldInput
            title="Job Description"
            subtitle="Job description must be describe a job"
          >
            <TextareaInput
              form={form}
              name="jobDescription"
              editorLoaded={editorLoaded}
            />
          </FieldInput>
          <FieldInput
            title="Responsibilities"
            subtitle="Outline the core responsibilities of the position"
          >
            <TextareaInput
              form={form}
              name="responsiblity"
              editorLoaded={editorLoaded}
            />
          </FieldInput>
          <FieldInput
            title="Who You Are"
            subtitle="Add your preferred candidates qualifications"
          >
            <TextareaInput
              form={form}
              name="whoYouAre"
              editorLoaded={editorLoaded}
            />
          </FieldInput>
          <FieldInput
            title="Nice-To-Haves"
            subtitle="Add nice-to-have skills and qualifications for the role to encourage a more diverse set of candidates to apply"
          >
            <TextareaInput
              form={form}
              name="niceToHaves"
              editorLoaded={editorLoaded}
            />
          </FieldInput>
          <FieldInput
            title="Perks and Benefits"
            subtitle="Encourage more people to apply by sharing the attractive rewards and benefits you offer your employees"
          >
            <InputBenefits form={form}></InputBenefits>
          </FieldInput>
          <div className="flex justify-end">
            <Button type="submit" size={"lg"} className="rounded-none">
              Do a Review
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default PostJobPage;
