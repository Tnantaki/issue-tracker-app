import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import IssueDetailPage from './IssueDetailPage';
import IssueEditButton from './IssueEditButton';
import IssueDeleteButton from './IssueDeleteButton';
import { auth } from '@/auth';
import AssignSelect from './AssignSelect';

interface Props {
  params: Promise<{id: string}>
}

const IssueLayoutPage = async ({ params }: Props) => {
  const id = parseInt((await params).id)
  if (isNaN(id)) return notFound()

  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) return notFound()

  const session = await auth()

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetailPage issue={issue} />
      </Box>
      { session && <Box>
        <Flex direction="column" gap="4">
          <AssignSelect issue={issue}/>
          <IssueEditButton issueId={issue.id} />
          <IssueDeleteButton issueId={issue.id} />
        </Flex>
      </Box> }
    </Grid>
  );
};

export default IssueLayoutPage

export async function generateMetadata({ params }: Props) {
  const id = parseInt((await params).id)

  const issue = await prisma.issue.findUnique({ where: { id } });
  return {
    title: issue?.title,
    description: 'Detail of issue ' + issue?.id
  } 
}