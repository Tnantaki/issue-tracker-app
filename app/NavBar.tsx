import Link from 'next/link';
import { FaBug } from "react-icons/fa";
import CurrentPath from './CurrentPath';
import { auth } from '@/auth';
import { Box } from '@radix-ui/themes';

const NavBar = async () => {
  const session = await auth()

  return (
    <nav className="flex space-x-5 border-b-1 p-3 items-center bg-zinc-800">
      <Link href="/">
        <FaBug />
      </Link>
      <CurrentPath />
      <Box>
        {session && <Link href='/api/auth/signout'>Logout</Link>}
        {!session && <Link href='/api/auth/signin'>Login</Link>}
      </Box>
    </nav>
  );
}

export default NavBar