import { background, extendTheme,  StyleFunctionProps,  Text,  textDecoration,  ThemeConfig, ThemeOverride } from "@chakra-ui/react";
import { color } from "framer-motion";
import Link from "next/link";


const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}


const theme: ThemeOverride = extendTheme({
    
    config,
    
    styles: {
        global: (props: StyleFunctionProps)=> ({
            body:{
                bg: props.colorMode === "dark" ? 'dark.background' : 'light.background',
                color: props.colorMode === 'dark' ? 'dark.primaryText' : 'light.primaryText'  
                     },
                     "*::placeholder":{
                        color: props.colorMode === 'dark' ? 'dark.secondaryText' : 'light.secondaryText'
                     },
                   "a,  Link" :{
                        color: props.colorScheme = 'dark'? 'dark.link' : 'light.link',
                        textDecoration:'none',

                     },
                     "Input, textarea" : {
                        borderColor: props.colorMode === 'dark' ? 'dark.border' : 'light.border',
                        _focus:{
                            borderColor: props.colorMode === 'dark' ? 'dark.highlight' : 'light.highlight'
                        },
                     },
                     components:{
                        Text:{
                            baseStyle: (props: StyleFunctionProps) =>
                                ({
                                    color: props.colorMode === 'dark' ? 'dark.primaryText' : 'light.primaryText',
                                })
                        }
                     }
        }),
    },
    colors: {
        dark: {
            background:"gray",
            surface: "#252526",
            card: "#2D2D2D",
            primaryText: "#D4D4D4",
            secondaryText: "#A0A0A0",
            link: "#007ACC",
            highlight: "#569CD6",
            error: "#D16969",
            border: "#3C3C3C",
            text: "blue"


        },
        light: {
            background:"#FFFFFF",
            surface: "#F3F3F3",
            card: "E5E5E5",
            primaryText: "1E1E1E",
            secondaryText: "#4A4A4A",
            link: "#007ACC",
            highlight: "#569CD6",
            error: "#D16969",
            border: "#D1D1D1",
            text: "black"

        }
    },
   
});

export default theme;