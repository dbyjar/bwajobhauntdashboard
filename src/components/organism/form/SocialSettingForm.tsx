"use client";

import { FC } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { socialSettingFormSchema } from "@/lib/form-schema";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FieldInput from "../FieldInput";

import { CompanySocialMedia } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

interface SocialSettingFormProps {
  detail: CompanySocialMedia | undefined;
}

const SocialSettingForm: FC<SocialSettingFormProps> = ({
  detail,
}: SocialSettingFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof socialSettingFormSchema>>({
    resolver: zodResolver(socialSettingFormSchema),
    defaultValues: {
      facebook: detail?.facebook,
      twitter: detail?.twitter,
      instagram: detail?.instagram,
      linkedin: detail?.linkedin,
      youtube: detail?.youtube,
    },
  });

  const onSubmit = async (val: z.infer<typeof socialSettingFormSchema>) => {
    try {
      await fetch("/api/company/social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...val, companyId: session?.user.id }),
      });

      await toast({
        title: "Success",
        description: "Edit social successfully",
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

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5 space-y-6 pt-6"
        >
          <FieldInput
            title="Basic Information"
            subtitle="Add elsewhere links to your company profile. You can add only username without full https link."
          >
            <div className="space-y-5">
              <FormField
                name="facebook"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="https://facebook.com/@user"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="twitter"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="https://twitter.com/@user"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="instagram"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="https://instagram.com/@user"
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
                        className="w-[450px]"
                        placeholder="https://linkedin.com/@user"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="youtube"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Youtube</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="https://youtube.com/@user"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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

export default SocialSettingForm;
