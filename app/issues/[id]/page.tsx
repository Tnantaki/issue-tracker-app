import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import IssueDetailPage from './IssueDetailPage';
import IssueEditButton from './IssueEditButton';
import IssueDeleteButton from './IssueDeleteButton';

interface Props {
  params: Promise<{id: string}>
}

const IssueLayoutPage = async ({ params }: Props) => {
  const id = parseInt((await params).id)
  if (isNaN(id)) return notFound()

  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) return notFound()

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetailPage issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <IssueEditButton issueId={issue.id} />
          <IssueDeleteButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueLayoutPage