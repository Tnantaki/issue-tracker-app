import Link from 'next/link';
import { FaBug } from "react-icons/fa";
import CurrentPath from './CurrentPath';
import { auth } from '@/auth';
import { Box, Container, Flex } from '@radix-ui/themes';

const NavBar = async () => {
  const session = await auth()

  return (
    <nav className="border-b-1 p-3 bg-zinc-800">
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='4'>
            <Link href="/">
              <FaBug />
            </Link>
            <CurrentPath />
          </Flex>
          <Box>
            {session && <Link href="/api/auth/signout">Logout</Link>}
            {!session && <Link href="/api/auth/signin">Login</Link>}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}

export default NavBar