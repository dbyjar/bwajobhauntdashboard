import React, { FC, useEffect, useState } from "react";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { overviewSettingFormSchema } from "@/lib/form-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { LiaTimesSolid } from "react-icons/lia";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

interface InputTechStackProps {
  form: UseFormReturn<z.infer<typeof overviewSettingFormSchema>>;
}

const InputTechStack: FC<InputTechStackProps> = ({
  form,
}: InputTechStackProps) => {
  const [isHide, setHide] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [values, setValues] = useState<string[]>([]);

  const saveValue = () => {
    if (value === "") return;

    const newValue: any = [...values, value];

    setValue("");
    setValues(newValue);
    form.setValue("techStack", newValue);

    setHide(!isHide);
  };

  const deleteValue = (item: string) => {
    const stack: any = values.filter((value: string) => item !== value);

    setValues(stack);
    form.setValue("techStack", stack);
  };

  useEffect(() => {
    const val = form.getValues("techStack");

    if (val && val.length > 0) {
      setValues(val);
    }
  }, [form]);

  return (
    <>
      <FormField
        control={form.control}
        name="techStack"
        render={() => (
          <FormItem className="flex flex-col">
            <FormLabel>Add Tech Stack</FormLabel>
            <FormControl>
              <>
                <Button
                  type="button"
                  variant="outline"
                  className="mb-2 w-[200px]"
                  onClick={() => setHide(!isHide)}
                >
                  {isHide ? (
                    <MinusIcon className="-ms-2 me-2 w-4 h-4"></MinusIcon>
                  ) : (
                    <PlusIcon className="-ms-2 me-2 w-4 h-4"></PlusIcon>
                  )}
                  Add Tech Stack
                </Button>
                {isHide && (
                  <div className="my-4 flex flex-row gap-2">
                    <Input
                      className="w-[200px]"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                    <Button type="button" onClick={saveValue}>
                      Save
                    </Button>
                  </div>
                )}
                <div className="space-x-3">
                  {values.map((item: string, index: number) => (
                    <Badge
                      className="cursor-pointer text-sm mb-2"
                      variant="outline"
                      key={index}
                      onClick={() => deleteValue(item)}
                    >
                      {item}
                      <LiaTimesSolid className="ms-2" />
                    </Badge>
                  ))}
                </div>
              </>
            </FormControl>
            <FormMessage className="mt-3"></FormMessage>
          </FormItem>
        )}
      />
    </>
  );
};

export default InputTechStack;
