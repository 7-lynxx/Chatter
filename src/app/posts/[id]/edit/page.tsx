import { auth, firestore } from "@/contexts/lib/firebase";
import { Box, Button, Heading, Input, Spinner, VStack, useToast } from "@chakra-ui/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import dynamic from "next/dynamic";
import { useRouter } from "next/router"
import { FormEvent, useEffect, useState } from "react";


const MdEditor =dynamic(() => import('@uiw/react-md-editor'), { ssr: false });



const EditPost = () => {
    const router = useRouter();
    const { id } = router.query;
    const user = auth.currentUser;
    const toast = useToast();


    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const [ loading, setLoading ] = useState(true);
    const [ isSaving, setIsSaving ] = useState(false);


    const handleContentChange = (value?: string) => {
        setContent(value || '');
    };

    useEffect(() => {
        const fetchPost = async () => {
            if(!id) return;
            const docRef = doc(firestore, 'posts', id as string);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()){
                const postData = docSnap.data();
            if(postData.authorId !== user?.uid){
                toast({
                    title: 'Error',
                    description: 'You are not authorized to edit this post',
                    status: 'error',
                    duration: 3000,
                    isClosable: true
                });

            }else {
                setTitle(postData.Title);
                setContent(postData.content);
            }
            }else {
                toast({
                    title: 'Error',
                    description: 'Post not Found',
                    status: 'error',
                    duration: 3000,
                    isClosable: true
                });

            }
            setLoading(false);
        };
        fetchPost();
    }, [ id, user, router, toast]);

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        if(!user){
            toast({
                title: 'Error',
                description: 'User not logged in',
                status: 'error',
                duration: 3000,
                isClosable: true
            }); 
            return;
        }

        if(!title || !content){
            toast({
                title: 'Error',
                description: 'Title and Content are required',
                status: 'error',
                duration: 3000,
                isClosable: true
            });
            return;
        }
        setIsSaving(true);

        try{
            const docRef = doc(firestore, 'posts', id as string);
            await updateDoc(docRef, {
                title,
                content,
                updatedAt: new Date(),
            });
            toast({
                title: 'sucess'
                ,description: 'post uupdated'
                ,status:'success'
                ,duration:5000
                ,isClosable:true,
            })
        
            router.push('/UserPosts')
        }catch(error){
            toast({
                title: 'Error',
                description: 'Failed to update post',
                status: 'error',
                duration: 3000,
                isClosable: true
            });
            console.error('error updating post: ', error);
        }
        setIsSaving(false);
    };

    if(loading){
        return <Spinner/>
    }


return (
    <Box className="container mx-auto p-4">
    <Heading as='h2'> Create Content </Heading>
    <VStack as="form" spacing={4} onSubmit={handleUpdate}>
     <Input 
     placeholder="Post Title"
     value={title}
     onChange={(e) => setTitle(e.target.value)}
     required />
    <MdEditor value={content} onChange={handleContentChange}/>
    <Button type="submit" className="rounded p-2">
        Update Post
    </Button>
    </VStack>
</Box>
)

};

export default EditPost;