import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { TriangleUpIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import NextLink from 'next/link';
import IssueActions from "./_components/IssueActions";
import Pagination from "../components/Pagination";
import { Metadata } from "next";

const columns: {label: string, value: keyof Issue, className?: string}[] = [
  {label: 'Issue', value: 'title'},
  {label: 'Status', value: 'status', className: "hidden md:table-cell"},
  {label: 'Created', value: 'createdAt', className: "hidden md:table-cell"},
]

interface Props {
  searchParams: Promise<{ status: Status, orderBy: keyof Issue, page: string }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status)
  const { status, orderBy, page } = await searchParams

  const filterStatus = statuses.includes(status) ? status : undefined

  const sortColumn = columns.map((c) => c.value).includes(orderBy)
    ? { [orderBy]: "asc" }
    : undefined;

  const currentPage = page ? parseInt(page) : 1
  const pageSize = 10

  const issues = await prisma.issue.findMany({
    where: { status: filterStatus },
    orderBy: sortColumn,
    skip: (currentPage - 1) * pageSize,
    take: pageSize
  });

  const totalIssue = await prisma.issue.count({where: {status: filterStatus}})

  return (
    <Flex direction="column">
      <IssueActions />
      <Table.Root variant="surface" layout="fixed">
        <Table.Header>
          <Table.Row>
            {columns.map((c) => (
              <Table.ColumnHeaderCell key={c.value} className={c.className}>
                <NextLink href={{ query: { status, orderBy: c.value } }}>
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
      <Flex justify="center" mt='3'>
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          itemCount={totalIssue}
        />
      </Flex>
    </Flex>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue",
  description: "View all Issue",
};