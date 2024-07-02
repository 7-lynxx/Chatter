"use client";

import { useAuth } from "@/contexts/AuthContext";
import { SettingsIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import NotificationBadge from "./NotificationBadge";

const Navigation = () => {
  const { user, loading, signOutUser } = useAuth();

  const messageCount = 5 ;
  const notificationCount = 6;

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
         <Button as="a" variant="ghost"> Home </Button>
        </Link>
     
        <Link href="/explore" passHref>
         <Button as="a" variant="ghost"> Explore </Button>
        </Link>
     
        <Link href="/create" passHref>
         <Button as="a" variant="ghost"> Create </Button>
        </Link>
    
        {/* <Link href="/messages" passHref>
         <Button as="a" variant="ghost">  </Button>
        </Link>
        <Link href="/notifications" passHref>
         <Button as="a" variant="ghost"> Home </Button>
        </Link> */}
   
        <Link href="/settings" passHref>
         <Button as="a" variant="ghost"> <SettingsIcon/> </Button>
        </Link>
     
      
        <Link href="/help" passHref>
         <Button as="a" variant="ghost"> Help </Button>
        </Link>
      
       
      
        <Link href="/login" passHref>
        <Button as="a" variant="ghost"> LogIn </Button>
        </Link>
  

      
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
            <Button as="a" variant="ghost"> Register </Button>
            </Link>
          </>
        )}
        <Spacer/>
        <NotificationBadge messageCount={messageCount} notificationCount={notificationCount}/>
      </Box>
    </Flex>
  );
};

export default Navigation;
