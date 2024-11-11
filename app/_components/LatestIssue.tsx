import prisma from '@/prisma/client'
import { Avatar, Box, Card, Flex, Heading, Table } from '@radix-ui/themes'
import Link from 'next/link';
import React from 'react'
import { IssueStatusBadge } from '../components';

const LatestIssue = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true
    }
  });

  return (
    <Box>
      <Card>
        <Heading size='6'>Latest Issues</Heading>
        <Table.Root layout="fixed">
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Flex justify="between" align='center'>
                    <Flex direction="column" align="start" gap="2">
                      <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                      <IssueStatusBadge status={issue.status} />
                    </Flex>
                    {issue.assignedToUser && (
                      <Avatar
                        src={issue.assignedToUser.image!}
                        fallback="?"
                        size="2"
                        radius="full"
                      />
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </Box>
  );
}

export default LatestIssue