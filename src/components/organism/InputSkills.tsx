import React, { FC, useState } from "react";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { jobFormSchema } from "@/lib/form-schema";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { LiaTimesSolid } from "react-icons/lia";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface InputSkillsProps {
  form: UseFormReturn<z.infer<typeof jobFormSchema>>;
}

const InputSkills: FC<InputSkillsProps> = ({ form }: InputSkillsProps) => {
  const [isHide, setHide] = useState<boolean>(false);
  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");

  const saveValue = () => {
    if (value === "") return;

    const newValue: any = [...values, value];

    setValue("");
    setValues(newValue);
    form.setValue("requiredSkills", newValue);
  };

  const deleteValue = (item: string) => {
    const skills: any = values.filter((value: string) => item !== value);

    setValues(skills);
    form.setValue("requiredSkills", skills);
  };

  return (
    <>
      <FormField
        control={form.control}
        name="requiredSkills"
        render={() => (
          <FormItem>
            <FormControl>
              <>
                <Button
                  type="button"
                  variant="outline"
                  className="mb-2"
                  onClick={() => setHide(!isHide)}
                >
                  {!isHide && (
                    <PlusIcon className="-ms-2 me-2 w-4 h-4"></PlusIcon>
                  )}
                  {isHide && (
                    <MinusIcon className="-ms-2 me-2 w-4 h-4"></MinusIcon>
                  )}
                  Add Skill
                </Button>
                {isHide && (
                  <div className="my-4 flex flex-row gap-2">
                    <Input
                      className="w-[246px]"
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

export default InputSkills;
