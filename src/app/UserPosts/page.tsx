import useSpecializedFeed from "@/contexts/hooks/useSpecializedFeed";
import { auth } from "@/contexts/lib/firebase"
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
const UserPosts =() => {
     const user = auth.currentUser;
     const feed = useSpecializedFeed(user? user.uid : '');

     const router =  useRouter();

     if(!user){
        return(
            <Box textAlign='center' mt={10}>
                <Text color='red.500'> User not Logged In</Text>
            </Box>
        );


     }


      if(feed.length === 0){
        return(
            <Box textAlign='center' mt={10}>
                <Text> No Posts Found </Text>
            </Box>
        );
      }

      return (
        <VStack spacing={4} mt={10}>
            {feed.map((post) => (
                <Box key={post.id}
                p={5}
                shadow='md'
                borderWidth='1px'
                width='100%'
                maxW='3xl'
                >
                    <Text fontWeight='bold'>{post.title}</Text>
                    <Text >{post.description}</Text>
                    <Button colorScheme="teal" onClick={()=> router.push(`/posts/${post.id}`)}> View Post </Button>
                </Box>
            ))}
            
        </VStack>
      );


};

export default UserPosts;