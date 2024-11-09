import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{id: string}>
}

const IssueDetailPage = async ({ params }: Props) => {
  const id = parseInt((await params).id)
  if (isNaN(id)) return notFound()

  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) return notFound()

  return (
    <div className='max-w-5xl'>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="3" align='center'>
        <Text>{issue.createdAt.toDateString()}</Text>
        <IssueStatusBadge status={issue.status} />
      </Flex>
      <Card>
        <Text>{issue.description}</Text>
      </Card>
    </div>
  );
};

export default IssueDetailPage