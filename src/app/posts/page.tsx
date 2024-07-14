'use client'

import usePreferenceFeed from "@/contexts/hooks/usePreferencesFeed";
import { auth, firestore } from "@/contexts/lib/firebase";
// import { fetchUserPreferences } from "@/contexts/lib/user";
import { Box, Button, Divider, HStack, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";


type Post ={
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    content: string;
    authorId: string;
    createdAt: {
        seconds: number;
        nanoseconds: number;

    };
};

const Posts: React.FC = () => {
    const router = useRouter();
    const [ feed, setFeed ] = useState<Post[]>([]);
    // toggling
    const [ loading, setLoading ] = useState(true);
    const [ activeTab, setActiveTab ] = useState<'personalized' | 'all'>('personalized');
    const user = auth.currentUser;
    const userId = user? user.uid : '';
 
    const [ preferences, setPreferences ] = useState<string[]>([]);

    useEffect(() => {
        const fetchFeed = async () => {
            const feedQuery = query(collection(firestore, 'posts'), orderBy('createdAt', 'desc'));

            const querySnapshot = await getDocs(feedQuery);

            const allPosts: Post[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Post, 'id'>)
            }));

            setFeed(allPosts);
            setLoading(false);

        };

        // const fetchPreferences = async ()=> {
        //     if (user){
        //         const userPreferences = await fetchUserPreferences(userId);
        //         setPreferences(userPreferences)
        //     }
        // };

        fetchFeed();
        // fetchPreferences();
    }, [user, userId]);

    const handleToggleFeed = (tab: 'personalized' | 'all') => {
        setActiveTab(tab);

    };

    const preferencesFeed = usePreferenceFeed(userId, preferences);

    if(loading){
        return (
            <Box textAlign='center' mt={10}>
                <Spinner/>
            </Box>
        );}

        const postSummary = (post: Post) => (
            <Box  key={post.id}
            p={5}
            shadow='md'
            borderWidth='1px'
            width='100%'>
                {post.imageUrl && <Image src={post.imageUrl} alt={post.title}/> 
                }
                <Text fontWeight='bold'> { post.title }</Text>
                <Text mt={2}> {post.title} </Text>
                <Button mt={4} onClick={() => router.push(`/posts/${post.id}`)}> View Post </Button>
            </Box>);

        return (
            <VStack spacing={4} mt={10} width='100%'
            maxW='3xl' mx='auto'>
                <HStack spacing={8}>

                    <Button variant='ghost' 
                    onClick={() => {handleToggleFeed('personalized')}}
                    position='relative'
                    // _after={{
                    //     content: '""',
                    //     position: 'absolute',
                    //     width: '100%',
                    //     height: '2px',
                    //     botom: '-2px',
                    //     left: 0,
                    //     bg: activeTab === 'personalized' ? 'teal.500' : 'transparent',
                    //     transition: 'background-color 0.3s ease',

                    // }}
                    >
                        For You
                    </Button>
                    
                    <Button variant='ghost' 
                    onClick={() => {handleToggleFeed('all')}}
                    position='relative'
                   
                    >
                       All Posts
                    </Button>
                    </HStack>
                    <Divider mt={4}/>

                    {activeTab === 'personalized' ? (
                        <Box>
                            <Text fontSize ="2xl" fontWeight='bold'
                            >
                             Recommended for you
                            </Text>
                            {preferencesFeed.map(postSummary)}
                        </Box>
                    ): (
                        <Box>
                             <Text fontSize ="2xl" fontWeight='bold'
                            >
                             All Posts
                            </Text>
                            {feed.map(postSummary)}
                                    </Box>


                            
                    )}

             
            </VStack>
        );
  
        

   
    


};

export default Posts;