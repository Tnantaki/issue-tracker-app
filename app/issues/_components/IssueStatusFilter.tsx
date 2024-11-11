'use client'
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';
import React from 'react'

// Step 1: Create lebel-value, the value should map to Filter option
const statuses: {label: string, value: Status | 'ALL'}[] = [
  {label: 'All', value: 'ALL'},
  {label: 'Open', value: 'OPEN'},
  {label: 'In Progress', value: 'IN_PROGRESS'},
  {label: 'Closed', value: 'CLOSED'},
]

const IssueStatusFilter = () => {
  const router = useRouter()

  // Step 2: Use query param to filter value
  const filterStatus = (status: string) => {
    const query = "?status=" + status;
    router.push("/issues" + query);
  };

  return (
    <Select.Root onValueChange={filterStatus}>
      <Select.Trigger placeholder='Filter by status...' />
      <Select.Content>
        {statuses.map(status => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

export default IssueStatusFilter