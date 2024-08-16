'use client';
// import { useRouter } from "next/router";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import InitialLoader from "./InitialLoader";
import { Box } from "@chakra-ui/react";
import RouteLoader from "./RoutingLoader";
import { usePathname } from "next/navigation";
import path from "path";



const ClientLayout: FC<PropsWithChildren> = ( {children}) => {

    // const router = useRouter();
    const [ initialLoading, setInitialLoading ] = useState(true);
    const [ routeLoading, setRouteLoading ] = useState(false);
    const pathName = usePathname();
    

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      
      const handleStart = () =>{ setRouteLoading(true);
        const timeout = setTimeout(() => {
            setRouteLoading(false);
        },1500);
        return () => clearTimeout(timeout);
      }
    //   const handleComplete = () => setRouteLoading(false);
    
    //   router.events.on('routeChangeStart', handleStart);
    //   router.events.on('routeChangeComplete', handleComplete);
    //   router.events.on('routeChangeError', handleComplete);
    
    //   return () => {
    //     router.events.off('routeChangeStart', handleStart);
    //     router.events.off('routeChangeComplete', handleComplete);
    //     router.events.off('routeChangeError', handleComplete);
    //   };
      handleStart();
      

    //   return () => clearTimeout(timeout);
    
    }, [pathName]);
     
    if(initialLoading){
      return <InitialLoader/>
    }

    return (
        <Box>
            {initialLoading && <InitialLoader/>}
            {routeLoading && <RouteLoader/>}
            <Box style={{ visibility: routeLoading ? 'hidden' : 'visible'}}>
                
            {children}
            </Box>
        </Box>
    );

    


};

export default ClientLayout;