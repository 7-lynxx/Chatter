'use client';
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";

const LoginForm = ()=> {
    const { signIn } = useAuth();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    
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
    );
};

export default LoginForm;