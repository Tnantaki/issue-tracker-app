import IssueSummary from "./_components/IssueSummary";
import LatestIssue from "./_components/LatestIssue";

export default function Home() {
  // return <LatestIssue />
  return <IssueSummary open={1} inProgress={2} closed={3} />
}
