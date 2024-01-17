"use client";

import { FC, useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { overviewSettingFormSchema } from "@/lib/form-schema";
import { cn, fetcher } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import TitleForm from "@/components/atoms/TitleForm";
import FieldInput from "../FieldInput";
import CustomUploads from "../CustomUploads";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import InputTechStack from "../InputTechStack";
import TextareaInput from "../TextareaInput";
import Each from "@/components/atoms/Each";

import useSWR from "swr";
import { CompanyOverview, Industry } from "@prisma/client";
import { supabaseUploadFile } from "@/lib/supabase";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface OverviewSettingFormProps {
  detail: CompanyOverview | undefined;
}

const OverviewSettingForm: FC<OverviewSettingFormProps> = ({
  detail,
}: OverviewSettingFormProps) => {
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const { data: industries } = useSWR<Industry[]>(
    "/api/company/industry",
    fetcher
  );

  const form = useForm<z.infer<typeof overviewSettingFormSchema>>({
    resolver: zodResolver(overviewSettingFormSchema),
    defaultValues: {
      name: detail?.name,
      image: detail?.image,
      website: detail?.website,
      employee: detail?.employee,
      industry: detail?.industry,
      location: detail?.location,
      techStack: detail?.techStack,
      dateFounded: detail?.dateFounded,
      description: detail?.description,
    },
  });

  const onSubmit = async (val: z.infer<typeof overviewSettingFormSchema>) => {
    try {
      let filename = "";

      if (typeof val.image === "object") {
        const uploadImg = await supabaseUploadFile(val.image, "company");
        filename = uploadImg.filename;
      } else {
        filename = val.image;
      }

      const body = {
        ...val,
        image: filename,
        companyId: session?.user.id,
      };

      await fetch("/api/company/overview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      await toast({
        title: "Success",
        description: "Edit profile successfully",
      });

      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Please try again",
      });

      console.log(error);
    }
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <>
      <div className="my-5">
        <TitleForm
          title="Basic Information"
          subtitle="List out your top perks and benefits"
        />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5 space-y-6 pt-6"
        >
          <FieldInput
            title="Company Logo"
            subtitle="This image will be shown publicly as company logo"
          >
            <FormField
              name="image"
              control={form.control}
              render={() => (
                <FormItem>
                  <FormControl>
                    <CustomUploads form={form} name="image" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FieldInput>
          <FieldInput
            title="Compant Details"
            subtitle="Introduce your company core info quickly to users by fill up company details"
          >
            <div className="space-y-5">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="e.g. Twitter"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="website"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="https://"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="location"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[450px]">
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Indonesia">Indonesia</SelectItem>
                        <SelectItem value="Malaysia">Malaysia</SelectItem>
                        <SelectItem value="Singapure">Singapure</SelectItem>
                        <SelectItem value="Thailand">Thailand</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4 w-[450px]">
                <FormField
                  name="employee"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Employee" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-50">1-50</SelectItem>
                          <SelectItem value="51-150">51-150</SelectItem>
                          <SelectItem value="101-250">101-250</SelectItem>
                          <SelectItem value="251-500">251-500</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="industry"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <Each
                            of={industries ?? []}
                            render={({ item }: { item: Industry }) => (
                              <SelectItem key={item.id} value={item.name}>
                                {item.name}
                              </SelectItem>
                            )}
                          />
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="dateFounded"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date Founded</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[450px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <InputTechStack form={form} />
            </div>
          </FieldInput>
          <FieldInput
            title="About Company"
            subtitle="Brief description for your company. URLs are hyperlinked"
          >
            <TextareaInput
              form={form}
              name="description"
              editorLoaded={editorLoaded}
            />
          </FieldInput>
          <div className="flex justify-end">
            <Button type="submit" size={"lg"} className="rounded-none">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default OverviewSettingForm;
