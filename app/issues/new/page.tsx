'use client'
import { Button, Callout, TextArea, TextField } from '@radix-ui/themes'
import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface IssueForm {
  title: string,
  description: string
}

const NewIssuePage = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState('')

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className='mb-3'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An Unexpected Error Occurred!");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        <TextArea placeholder="Description" {...register("description")} />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
}

export default NewIssuePage