import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

type StatusColor = 'red' | 'blue' | 'green'

const statusMap: Record<Status, {label: string, color: StatusColor}> = {
  OPEN: {label: 'Open', color: 'red'},
  IN_PROGRESS: {label: 'In Progress', color: 'blue'},
  CLOSED: {label: 'Closed', color: 'green'},
}

const IssueStatusBadge = ({status}: {status: Status}) => {
  const {label, color} = statusMap[status]
  return <Badge color={color}>{label}</Badge>;
}

export default IssueStatusBadge