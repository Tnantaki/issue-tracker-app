import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import IssueDetailPage from './IssueDetailPage';
import IssueEditButton from './IssueEditButton';

interface Props {
  params: Promise<{id: string}>
}

const IssueLayoutPage = async ({ params }: Props) => {
  const id = parseInt((await params).id)
  if (isNaN(id)) return notFound()

  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) return notFound()

  return (
    <Grid columns={{ initial: "1", sm: "2" }} gap="3">
      <Box>
        <IssueDetailPage issue={issue} />
      </Box>
      <Box>
        <IssueEditButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueLayoutPage