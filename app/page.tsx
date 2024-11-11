import prisma from "@/prisma/client";
import IssueSummary from "./_components/IssueSummary";
import IssueChart from "./_components/IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssue from "./_components/LatestIssue";

export default async function Home() {
  const totalOpen = await prisma.issue.count({ where: { status: "OPEN" } });
  const totalInProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const totalClosed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <Grid columns={{ initial: "1", sm: "2" }} gap='5'>
      <Flex direction="column" gap='5'>
        <IssueSummary
          open={totalOpen}
          inProgress={totalInProgress}
          closed={totalClosed}
        />
        <IssueChart
          open={totalOpen}
          inProgress={totalInProgress}
          closed={totalClosed}
        />
      </Flex>
      <LatestIssue />
    </Grid>
  );
}
