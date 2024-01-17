import { FC } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "../../../../lib/prisma";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewSettingForm from "@/components/organism/form/OverviewSettingForm";
import SocialSettingForm from "@/components/organism/form/SocialSettingForm";
import TeamsSettingForm from "@/components/organism/form/TeamsSettingForm";

interface SettingsPageProps {}

const getSettingDetailData = async () => {
  const session = await getServerSession(authOptions);
  const company = await prisma.company.findFirst({
    where: {
      id: session?.user.id,
    },
    include: {
      CompanyOverview: true,
      CompanySocialMedia: true,
      CompanyTeam: true,
    },
  });

  return company;
};

const SettingsPage = async ({}: SettingsPageProps) => {
  const company = await getSettingDetailData();

  return (
    <>
      <div className="font-semibold text-3xl mb-5">Settings</div>
      <Tabs defaultValue="overview" className="mt-5">
        <TabsList className="mb-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="socialLinks">Social Link</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewSettingForm detail={company?.CompanyOverview[0]} />
        </TabsContent>
        <TabsContent value="socialLinks">
          <SocialSettingForm detail={company?.CompanySocialMedia[0]} />
        </TabsContent>
        <TabsContent value="teams">
          <TeamsSettingForm detail={company?.CompanyTeam} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default SettingsPage;
