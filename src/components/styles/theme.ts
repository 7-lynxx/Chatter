import { extendTheme,  ThemeConfig } from "@chakra-ui/react";
import { color } from "framer-motion";



const theme = extendTheme({
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false,
    }
    
    // styles: {
    //     global: ()=> ({
    //         body:{
    //             bg: "gray.800",
    //             color:"blue",
    //         },
    //     }),
    // },
});

export default theme;