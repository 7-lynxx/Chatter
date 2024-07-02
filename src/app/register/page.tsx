'use client';

import { EmailIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Input, Button, InputRightElement, Box, FormControl, FormLabel } from "@chakra-ui/react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";

const RegisterForm = () => {
    const auth = getAuth();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        }catch(error){
            console.error('failed to register', error);
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

export default RegisterForm;