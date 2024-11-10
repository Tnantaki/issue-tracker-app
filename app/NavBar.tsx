import Link from 'next/link';
import { FaBug } from "react-icons/fa";
import CurrentPath from './CurrentPath';
import { auth } from '@/auth';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const NavBar = async () => {
  const session = await auth()

  return (
    <nav className="border-b-1 p-3 bg-zinc-800">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="4">
            <Link href="/">
              <FaBug />
            </Link>
            <CurrentPath />
          </Flex>
          <Box>
            {
              session && (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Avatar
                      src={session.user!.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                      className='cursor-pointer'
                      referrerPolicy='no-referrer'
                    />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Label>
                      <Text size='2'>{session.user?.email}</Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                      <Link href="/api/auth/signout">Logout</Link>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              )
            }
            {!session && <Link href="/api/auth/signin">Login</Link>}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}

export default NavBar