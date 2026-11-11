import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createIssueSchema } from "../../validationSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(z.treeifyError(validation.error), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: validation.data,
  });

  return NextResponse.json(newIssue, { status: 201 });
}
