import { issueSchema } from "@/app/schemas/issueSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const id = parseInt((await params).id)
  const body = await request.json()

  const validation = issueSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json({error: validation.error.format()}, {status: 400})

  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue)
    return NextResponse.json({error: 'Invalid Issue'}, {status: 404})

  const updatedIssue = await prisma.issue.update({
    where: { id },
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(updatedIssue, {status: 200})
}
