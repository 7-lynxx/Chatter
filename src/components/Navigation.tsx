"use client";

import { useAuth } from "@/contexts/AuthContext";
import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, IconButton, Menu, MenuIcon, Spacer, useColorMode, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import NotificationBadge from "./NotificationBadge";
import React from "react";

const Navigation = () => {
  const { user, loading, signOutUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue ('gray.500', 'gray.600');
  // const color = useColorModeValue ('#5FD1BC', '#CDF7DD');


  const messageCount = 5 ;
  const notificationCount = 6;
  

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error("Log out Session Error", error);
    }
  };


  interface MenuItemProps{
    isDrawer: boolean,
    onClose: ()=> void

  }

  const MenuItems: React.FC<MenuItemProps> = ( {isDrawer, onClose})=> (
<Flex direction={isDrawer? 'column' : {base: 'column', md:'row'}} align={{ base:'flex-start'}}
gap={8} p={4}>    
    <Link href="/" passHref>
     <Box   onClick={onClose} > Home </Box>
    </Link>
 
    <Link href="/posts" passHref>
     <Box  onClick={onClose} > Explore </Box>
    </Link>
 
    <Link href="/login" passHref>
    <Box  onClick={onClose} > LogIn </Box>
    </Link>
    {!loading && user ? (
    <Box>

        <Link href="/profile"> Profile </Link>
        <Box  onClick={handleLogout}>
          {" "}
          Logout{" "}
        </Box>
    </Box>

    ) : (
      <>
        <Link href="/register" passHref>
        <Box  onClick={onClose}> Register </Box>
        </Link>
      </>
    )}
    
    <Link href='/crate' passHref>
     <Box   onClick={onClose}> Create </Box>
    </Link>

    {/* <Link href="/messages" passHref>
     <Box  >  </Box>
    </Link>
    <Link href="/notifications" passHref>
     <Box  > Home </Box>
    </Link> */}

    <Link href="/settings" passHref>
     <Box   onClick={onClose}> <SettingsIcon/> </Box>
    </Link>
 
  
    {/* <Link href="/help" passHref>
     <Box  onClick={onClose} > Help </Box>
    </Link> */}
  
   
  


  
    </Flex>

  );

  return (
    <Box bg={bgColor} px={4} boxShadow='sm' mb='10rem'>
    <Flex h={16}
    
      // bg="teal.500"
      // color="white"
      // padding="1.5rem"
      justifyContent="space-around"
      alignItems="center"
      mr="4rem"
    >
  

      <IconButton size="md"
      icon={<HamburgerIcon/>}
      aria-label="Open Menu"
      display={{md:'none'}}
      onClick={onOpen}
      colorScheme="gray.400"/>
      

      <HStack spacing={8} alignItems='center' p={4}>
        <Box fontWeight='bold' fontSize='xl' >
          Chatter
        </Box>

        <HStack as='nav' spacing={4}
        display={{ base:'none', md:'flex'}} >
       <MenuItems isDrawer={false} onClose={onClose}  />
        </HStack>


      </HStack>
     
        <Spacer/>
        <NotificationBadge messageCount={messageCount} notificationCount={notificationCount}/>
    </Flex>
    <Drawer
    isOpen={isOpen}
    placement="left"
    onClose={onClose}
  size='full'
  
    >
       <DrawerOverlay>
        <DrawerContent bg={bgColor} maxW={{ base:'50%', md:'30%'}} borderRadius='0 2rem 2rem 0' boxShadow='' >
          <DrawerCloseButton/>
          <DrawerHeader> Chatter </DrawerHeader>
          <DrawerBody bg='gray.400' > <MenuItems isDrawer={true} onClose={onClose}/> </DrawerBody>
        </DrawerContent>
       </DrawerOverlay>


    </Drawer>
      </Box>
  );
};

export default Navigation;