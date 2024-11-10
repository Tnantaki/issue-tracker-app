import { Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import NavLink from "./_components/NavLink";
import AuthStatus from "./_components/AuthStatus";

const NavBar = () => {
  return (
    <nav className="border-b-1 p-3 bg-zinc-800">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="4">
            <Link href="/">
              <FaBug />
            </Link>
            <NavLink />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
