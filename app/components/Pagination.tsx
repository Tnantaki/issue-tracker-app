'use client'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  itemCount: number
  pageSize: number
  currentPage: number
}

const Pagination = ({itemCount, pageSize, currentPage}: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const totalPage = Math.ceil(itemCount / pageSize)

  if (totalPage <= 1) return null


  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push("?" + params);
  }

  return (
    <Flex align="center" gap="3">
      <IconButton
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </IconButton>
      <Text>
        page {currentPage} of {totalPage}
      </Text>
      <IconButton
        variant="soft"
        disabled={currentPage === totalPage}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </IconButton>
    </Flex>
  );
}

export default Pagination