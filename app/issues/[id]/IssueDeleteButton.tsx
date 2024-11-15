'use client'
import { Spinner } from '@/app/components';
import { AlertDialog, Box, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const IssueDeleteButton = ({issueId}: {issueId: number}) => {
  const router = useRouter()
  const [error, setError] = useState(false)
  const [isDeleting, setDeleting] = useState(false)

  const onDelete = async () => {
    try {
      setDeleting(true)
      await axios.delete(`/api/issues/${issueId}`)
      router.push('/issues')
    } catch (error) {
      setDeleting(false)
      setError(true)
      console.log('Error on Delete Issue: ', error)
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            Delete
            {isDeleting && <Spinner /> }
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action can be
            undone.
          </AlertDialog.Description>
          <Flex gap="4" mt="4">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={onDelete}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            Can&apos;t delete this issue
          </AlertDialog.Description>
          <Flex justify="center" mt="4">
            <Button color="gray" variant="soft" onClick={() => setError(false)}>
              <Box px="5">OK</Box>
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default IssueDeleteButton