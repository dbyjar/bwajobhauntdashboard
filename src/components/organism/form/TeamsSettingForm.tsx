import { FC } from "react";

import Icon from "../Icon";
import FieldInput from "../FieldInput";
import AddTeamCompanyDialog from "../AddTeamCompanyDialog";
import { CompanyTeam } from "@prisma/client";

interface TeamsSettingFormProps {
  detail: CompanyTeam[] | undefined;
}

const TeamsSettingForm: FC<TeamsSettingFormProps> = ({
  detail,
}: TeamsSettingFormProps) => {
  return (
    <>
      <FieldInput
        title="Basic Information"
        subtitle="Add team members of your company"
      >
        <div className="w-[65%] mb-5">
          <div className="flex flex-row justify-between items-center">
            <div className="text-lg font-semibold">
              {detail?.length} Members
            </div>
            <AddTeamCompanyDialog />
          </div>
          <div className="grid grid-cols-3 gap-5 mt-6">
            {detail?.map((item: CompanyTeam) => (
              <div key={item.id} className="p-3 shadow text-center rounded">
                <div className="w-14 h-14 rounded-full bg-gray-300 mx-auto" />
                <div className="mt-4 font-semibold">{item.name}</div>
                <div className="text-sm text-gray-500">{item.position}</div>
                <div className="inline-flex gap-3 mt-3 text-gray-500">
                  {item.instagram && (
                    <Icon name="instagram" className="w-4 h-4" />
                  )}
                  {item.linkedin && (
                    <Icon name="linkedin" className="w-4 h-4" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FieldInput>
    </>
  );
};

export default TeamsSettingForm;
