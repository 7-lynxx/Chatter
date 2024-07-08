"use client";

import {
  signInWithFacebook,
  signInWithGithub,
  signInWithGoogle,
} from "@/contexts/lib/auth";
import { EmailIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  InputRightElement,
  Box,
  FormControl,
  FormLabel,
  Divider,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";

const RegisterForm = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("failed to register", error);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <Box>
      <Box as="form" onSubmit={handleSubmit}>
        <FormControl id="email" mb={4}>
          <InputGroup>
            <FormLabel> Email </FormLabel>
            <InputRightElement pointerEvents="none">
              <EmailIcon color="grey.300" />
            </InputRightElement>
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter email"
              required
            />
          </InputGroup>
        </FormControl>

        <FormControl id="password" mb={4}>
          <InputGroup>
            <FormLabel> Password </FormLabel>
            <Input
              type={show ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter Password"
              required
            />

            <InputRightElement>
              <Button onClick={handleClick}>{show ? "Hide" : "Show"}</Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button type="submit"> Sign Up  </Button>
      </Box>

      <HStack justifyContent="center" mb={4}>
        <IconButton
          borderRadius="full"
          colorScheme="gray"
          color="gray.800"
          
          aria-label="Sign up with Github"
          icon={<FaGithub />}
          onClick={signInWithGithub}
        />
        <IconButton
          borderRadius="full"
          colorScheme="blue"
          color="white"
          aria-label="Sign up with Google"
          icon={<FaGoogle />}
          onClick={signInWithGoogle}
        />
        <IconButton
          borderRadius="full"
          colorScheme="blue"
          color="white"
          aria-label="Sign up with Faceboook"
          icon={<FaFacebook />}
          onClick={signInWithFacebook}
        />
      </HStack>
    </Box>
  );
};

export default RegisterForm;
