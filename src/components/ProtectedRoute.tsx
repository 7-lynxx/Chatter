'use client';
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
    children: ReactNode;

}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user){

            router.push('/login');
        }
    }, [ user, loading, router ]);

    if (loading){
        return <Spinner/>;
    }

    if (user){
        return <>{ children }</>
    }
    return null;
};

export default ProtectedRoute;