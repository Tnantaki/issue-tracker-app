import prisma from "@/prisma/client";
import IssueSummary from "./_components/IssueSummary";
import IssueChart from "./_components/IssueChart";

export default async function Home() {
  const totalOpen = await prisma.issue.count({ where: { status: "OPEN" } });
  const totalInProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const totalClosed = await prisma.issue.count({ where: { status: "CLOSED" } });

  // return (
  //   <IssueSummary
  //     open={totalOpen}
  //     inProgress={totalInProgress}
  //     closed={totalClosed}
  //   />
  // );
  return (
    <IssueChart
      open={totalOpen}
      inProgress={totalInProgress}
      closed={totalClosed}
    />
  );
}
