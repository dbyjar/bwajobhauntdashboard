import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(context: { params: { companyId: string } }) {
  const id = context?.params?.companyId ?? null;
  const res = await prisma.job.findMany({
    where: { id },
  });

  return NextResponse.json(res, { status: 200 });
}
