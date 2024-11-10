import React from 'react'
import IssueForm from '../../_components/IssueForm'
import { notFound } from 'next/navigation'
import prisma from '@/prisma/client'

interface Props {
  params: Promise<{id: string}>
}

const EditIssuePage = async ({ params }: Props) => {
  const id = parseInt((await params).id)
  if (isNaN(id)) return notFound()

  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) return notFound()
  
  return (
    <IssueForm issue={issue} />
  )
}

export default EditIssuePage