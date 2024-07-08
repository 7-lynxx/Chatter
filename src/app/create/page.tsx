'use client';

import { useAuth } from "@/contexts/AuthContext";
import { saveContent } from "@/contexts/lib/user";
import { Box, Button, Heading } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";





const MdEditor = dynamic(() => import ('@uiw/react-md-editor'), { ssr: false });

const CreatePage: React.FC = () => {
    const [ content, setContent ] = useState<string>('');
    const { user } = useAuth();
    const [ isClient, setIsClient ] = useState(false);

    useEffect(()=> {
        setIsClient(true);
    }, []);

    const handleContentChange = (value?: string) => {
        setContent(value || '');
    };
    const handleSubmit = async ()=> {
           if (user){
            await saveContent(content, user.uid);
            // implement redirect
           }else {
            // handle user not logged in 
            console.log('User not logged in')
           }
    };
    if(!isClient){
        return null;
    }

return(
    <Box className="container mx-auto p-4">
        <Heading as='h2'> Create Content </Heading>
        <MdEditor value={content} onChange={handleContentChange}/>
        <Button onClick={handleSubmit} className="rounded p-2">
            Publish
        </Button>
    </Box>
);

};

export default CreatePage;