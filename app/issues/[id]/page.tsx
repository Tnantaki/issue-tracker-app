import { IssueStatusBadge } from '@/app/components';
import prisma from '@/prisma/client';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';
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
    <Grid columns={{ initial: "1", sm: "2" }} gap="3">
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="3" my="3" align="center">
          <Text>{issue.createdAt.toDateString()}</Text>
          <IssueStatusBadge status={issue.status} />
        </Flex>
        <Card>
          <Text>{issue.description}</Text>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${id}`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage