"use client";

import { IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { color } from "framer-motion";

const ColorModeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <IconButton 
        aria-label="Toggle color mode"
        h={7}
        w={3}
        ml={2}
        mr={2}
        icon = { colorMode === "light" ? <SunIcon/> : <MoonIcon/>}
        onClick={toggleColorMode}
        position="fixed"
        top="1rem"
        right="1rem"
        zIndex="tooltip"/>
    );
};

export default ColorModeToggle;