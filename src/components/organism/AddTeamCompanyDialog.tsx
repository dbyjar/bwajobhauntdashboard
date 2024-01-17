"use client";

import { FC, useState } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamsSettingFormSchema } from "@/lib/form-schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useSession } from "next-auth/react";

interface propsTypes {}

const AddTeamCompanyDialog: FC<propsTypes> = ({}: propsTypes) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();

  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof teamsSettingFormSchema>>({
    resolver: zodResolver(teamsSettingFormSchema),
  });

  const onSubmit = async (val: z.infer<typeof teamsSettingFormSchema>) => {
    try {
      await fetch("/api/company/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...val, companyId: session?.user.id }),
      });

      await toast({
        title: "Success",
        description: "Edit team successfully",
      });

      router.refresh();
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Please try again",
      });

      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          <PlusIcon className="-ms-2 me-2"></PlusIcon>
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription>Fill the field to add new team</DialogDescription>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="position"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="CEO" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-3">
              <FormField
                name="instagram"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://www.instagram.com/@user"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="linkedin"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://www.linkedin.com/@user"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator />
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeamCompanyDialog;
