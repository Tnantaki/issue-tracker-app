import { patchIssueSchema } from "@/app/schemas/issueSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const id = parseInt((await params).id)
  const body = await request.json()

  const validation = patchIssueSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json({error: validation.error.format()}, {status: 400})

  const { assignedToUserId, title, description } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({error: 'Invalid User'}, {status: 404})
  }

  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue)
    return NextResponse.json({error: 'Invalid Issue'}, {status: 404})

  const updatedIssue = await prisma.issue.update({
    where: { id },
    data: { title, description, assignedToUserId },
  });
  return NextResponse.json(updatedIssue, {status: 200})
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const id = parseInt((await params).id)

  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue)
    return NextResponse.json({error: 'Invalid Issue'}, {status: 404})

  await prisma.issue.delete({ where: { id } });
  return new NextResponse(null, {status: 204})
}
