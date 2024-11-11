import { Status } from '@prisma/client'
import { Box, Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

interface Props {
  open: number
  inProgress: number
  closed: number
}

const IssueSummary = ({open, inProgress, closed}: Props) => {
  const container: {label: string, value: number, status: Status}[] = [
    {label: 'Open Issue', value: open, status: 'OPEN'},
    {label: 'In Progress Issue', value: inProgress, status: 'IN_PROGRESS'},
    {label: 'Closed Issue', value: closed, status: 'CLOSED'},
  ]

  return (
    <Flex gap="3">
      {container.map((item) => (
        <Box key={item.label} flexGrow="1">
          <Card>
            <Flex direction="column" gap="1">
              <Link
                href={`/issues?status=${item.status}`}
                className="text-sm font-medium text-center"
              >
                {item.label}
              </Link>
              <Text size="6" align="center" className="font-bold">
                {item.value}
              </Text>
            </Flex>
          </Card>
        </Box>
      ))}
    </Flex>
  );
}

export default IssueSummary