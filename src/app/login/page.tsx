'use client';
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertIcon, AlertTitle, Box, Button, CloseButton, FormControl, FormLabel, HStack, IconButton, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightElement, Text, VStack } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { signInWithFacebook, signInWithGithub, signInWithGoogle } from "@/contexts/lib/auth";
import { auth } from "@/contexts/lib/firebase";

const LoginForm = ()=> {
    const { signIn } = useAuth();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const user = auth.currentUser;
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        
        try{
           

            await signIn(email, password);
        }catch (error){
            console.error('failed to sign in', error);
        }
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    };


    const [ show, setShow ] = useState(false);
    const handleClick = () => {
        setShow(!show)
    };

    return (
        <Box>
        <Box as="form" onSubmit={handleSubmit}>
            <FormControl id="email" mb={4}>
            <InputGroup>
            <FormLabel> Email </FormLabel>
            
            <InputRightElement pointerEvents="none">
            <EmailIcon color="grey.300"/>
            </InputRightElement>
            <Input type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email"
            required/>
            </InputGroup>
            </FormControl>

            <FormControl id="password" mb={4}>
            <InputGroup>
            <FormLabel> Password </FormLabel>
            <Input type=  {show ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter Password"
            borderEndColor='teal'
            required/>

            <InputRightElement>
            <Button onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
            </Button>
            </InputRightElement>
            </InputGroup>
            </FormControl>

            <Button type="submit"> Sign In </Button>
        </Box>
        <HStack justifyContent="center" mb={4}>
            <VStack>

        <IconButton
          borderRadius="full"
          colorScheme="gray"
          color="gray.800"
          
          aria-label="Sign up with Github"
          icon={<FaGithub />}
          onClick={signInWithGithub}
          />
          <Text fontSize="xs">Github</Text>
          </VStack>

          <VStack>


        <IconButton
          borderRadius="full"
          colorScheme="blue"
          color="white"
          aria-label="Sign up with Google"
          icon={<FaGoogle />}
          onClick={signInWithGoogle}
          />
        <Text fontSize="xs">Google</Text>
          </VStack>

        <VStack>

        <IconButton
          borderRadius="full"
          colorScheme="blue"
          color="white"
          aria-label="Sign up with Faceboook"
          icon={<FaFacebook />}
          onClick={signInWithFacebook}
          />
        <Text fontSize="xs">Facebook</Text>
          </VStack>
      </HStack>
            </Box>
    );
};

export default LoginForm;