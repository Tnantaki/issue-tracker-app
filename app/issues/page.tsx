import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { TriangleUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from 'next/link';
import IssueActions from "./_components/IssueActions";

const columns: {label: string, value: keyof Issue, className?: string}[] = [
  {label: 'Issue', value: 'title'},
  {label: 'Status', value: 'status', className: "hidden md:table-cell"},
  {label: 'Created', value: 'createdAt', className: "hidden md:table-cell"},
]

interface Props {
  searchParams: Promise<{ status: Status, orderBy: keyof Issue }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status)
  const { status, orderBy } = await searchParams
  const filterStatus = statuses.includes(status) ? status : undefined
  const issues = await prisma.issue.findMany({
    where: { status: filterStatus },
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface" layout="fixed">
        <Table.Header>
          <Table.Row>
            {columns.map((c) => (
              <Table.ColumnHeaderCell key={c.value} className={c.className}>
                <NextLink href={{query: {status, orderBy: c.value}}}>
                  {c.label}
                  {c.value === orderBy && <TriangleUpIcon className="inline" />}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
