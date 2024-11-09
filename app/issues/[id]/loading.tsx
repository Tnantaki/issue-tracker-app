import { Flex, Card } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const IssueDetailLoadingPage = () => {
  return (
    <div className='max-w-5xl'>
      <Skeleton />
      <Flex gap="3" my="3" align='center'>
        <Skeleton width='8rem' />
        <Skeleton width='5rem' />
      </Flex>
      <Card>
        <Skeleton count={3} />
      </Card>
    </div>
  )
}

export default IssueDetailLoadingPage