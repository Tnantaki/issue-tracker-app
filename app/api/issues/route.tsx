import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const issueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1)
})

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