'use client'
import { Button, TextArea, TextField } from '@radix-ui/themes'
import axios from 'axios'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface IssueForm {
  title: string,
  description: string
}

const NewIssuePage = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<IssueForm>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/issues', data)
        router.push('/issues')
      })}
    >
      <TextField.Root placeholder="Title" {...register("title")} />
      <TextArea placeholder="Description" {...register("description")} />
      <Button>Submit New Issue</Button>
    </form>
  );
}

export default NewIssuePage