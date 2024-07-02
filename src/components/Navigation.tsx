"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Box, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";

const Navigation = () => {
  const { user, loading, signOutUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error("Log out Session Error", error);
    }
  };

  return (
    <Flex
      as="nav"
      bg="teal.500"
      color="white"
      padding="1.5rem"
      justify="space-between"
      align="center"
      mr="4rem"
    >
      <Box>
        <Link href="/" passHref>
          CHATTER
        </Link>
      </Box>
       
      <Box>
        <Link href="/login" passHref>
          LogIn
        </Link>
      </Box>

      <Box>
        {!loading && user ? (
          <>
            <Link href="/profile"> Profile </Link>
            <Button variant="outline" onClick={handleLogout}>
              {" "}
              Logout{" "}
            </Button>
          </>
        ) : (
          <>
            <Link href="/register" passHref>
              Register
            </Link>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Navigation;
