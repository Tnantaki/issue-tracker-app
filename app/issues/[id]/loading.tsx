import { Skeleton } from "@/app/components";
import { Card, Flex } from '@radix-ui/themes';

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