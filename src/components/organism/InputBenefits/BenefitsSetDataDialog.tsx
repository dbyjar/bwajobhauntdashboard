import { FC, useRef, useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface propsTypes {
  updateBenefits: (item: any) => void;
}

const BenefitsSetDataDialog: FC<propsTypes> = ({
  updateBenefits,
}: propsTypes) => {
  const [open, setOpen] = useState<boolean>(false);
  const benefitRefs = useRef<HTMLInputElement>(null);
  const descriptionRefs = useRef<HTMLTextAreaElement>(null);

  const saveBenefit = () => {
    const benefit = benefitRefs.current?.value;
    const description = descriptionRefs.current?.value;

    if (benefit == "" || description == "") return;

    updateBenefits({
      benefit,
      description,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          <PlusIcon className="-ms-2 me-2"></PlusIcon>
          Add Benefit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Benefit</DialogTitle>
          <DialogDescription>
            Make a new benefit, click save when your done
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8 mb-5">
          <div>
            <Label htmlFor="benefit" className="sr-only">
              Benefit
            </Label>
            <Input
              id="benefit"
              placeholder="fill your benefit..."
              ref={benefitRefs}
            />
          </div>
          <div>
            <Label htmlFor="description" className="sr-only">
              description
            </Label>
            <Textarea
              id="description"
              placeholder="fill your description..."
              ref={descriptionRefs}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={saveBenefit}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BenefitsSetDataDialog;
