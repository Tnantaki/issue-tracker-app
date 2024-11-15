import { issueSchema } from "@/app/schemas/issueSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json()

  const validate = issueSchema.safeParse(body)
  if (!validate.success)
    return NextResponse.json({ error: validate.error.errors }, { status: 400 });

  const createdIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(createdIssue, { status: 201 });
}