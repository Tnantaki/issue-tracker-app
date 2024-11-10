import { auth } from '@/auth';
import { Box, DropdownMenu, Avatar, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const AuthStatus = async () => {
  const session = await auth();

  return (
    <Box>
      {session && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session.user?.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Logout</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
      {!session && <Link href="/api/auth/signin" className='nav-link'>Login</Link>}
    </Box>
  );
}

export default AuthStatus