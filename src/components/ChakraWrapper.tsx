'use client';
import { ChakraProvider,cookieStorageManagerSSR, localStorageManager } from "@chakra-ui/react";
import theme from "./styles/theme";
import { ReactNode } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

interface ChakraWrapperProps {
    children: ReactNode;
    cookies?: string;
}

const ChakraWrapper: React.FC<ChakraWrapperProps> = ({ cookies, children } : ChakraWrapperProps ) => {
    const colorModeManager = 
    typeof cookies === 'string'? cookieStorageManagerSSR(cookies) : localStorageManager

    return (<ChakraProvider theme={theme} colorModeManager={colorModeManager}>
       
    {children} </ChakraProvider>);
};


const getServerSideProps: GetServerSideProps = async (context) => {const { req } = context
    return {
        props: {
            cookies: req.headers.cookie ?? '',
        },
    }
}
;

export  { ChakraWrapper, getServerSideProps };