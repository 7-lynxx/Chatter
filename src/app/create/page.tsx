"use client";

import { useAuth } from "@/contexts/AuthContext";
import { firestore } from "@/contexts/lib/firebase";
import { saveContent } from "@/contexts/lib/user";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { debounce } from "lodash";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  content?: string;
  authorId: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

const MdEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const CreatePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [ image, setImage ] = useState('');
  const [content, setContent] = useState<string>("");
  const { user } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [ loading, setLoading ] =  useState(false);
  const router = useRouter();
  const toast = useToast();
  useEffect(() => {
    setIsClient(true);
  }, []);
  const [existingPosts, setExistingPosts] = useState<Post[]>([]);




//   const fetchPosts = useCallback(
//     debounce(async(userId: string) => {
//       setLoading(true);

//       try{
//         const q = query(
//           collection(firestore, "posts"),
//           where("authorId", "==", userId)
//         );
//         const querySnapshot = await getDocs(q);
//         const posts: Post[] = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...(doc.data() as Omit<Post, "id">),
//         }));
//         setExistingPosts(posts);
//       } catch(error){
//         console.error('Error fetchong posts ', error);
//       }finally{
//         setLoading(false);
//       }
//     }, 500),
//  [firestore] )

  useEffect(() => {
    setIsClient(true);
       if (!user) return;
      const fetchPosts = debounce(async (userId: string) => {
        setLoading(true);
        try{
          const q = query(
            collection(firestore, "posts"),
            where("authorId", "==", userId)
          );
          const querySnapshot = await getDocs(q);
          const posts: Post[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Post, "id">),
          }));
          setExistingPosts(posts);
        } catch(error){
          console.error('Error fetchong posts ', error);
        }finally{
          setLoading(false);
        }
      }, 500);
      fetchPosts(user.uid);
       return () => {
        fetchPosts.cancel();
       };
      }, [user]);

  const handleContentChange = (value?: string) => {
    setContent(value || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !content) {

        
      toast({
        title: "Error",
        description: "All fields are required",
        status: "error",
        duration: 3000,
        variant: 'subtle',
        isClosable: true,
      });
      return;
    }

    if (user) {
      // console.log('cehcking for duplicate posts ...');
      const isDuplicate = existingPosts.some(
        (post) =>
          post.title === title &&
          post.description === description &&
          post.content === content
      );

      if (isDuplicate) {
        toast({
          title: "Duplicate Post",
          description: "Post already exists",
          status: "warning",
          variant: 'subtle',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      await saveContent(title, description, content, user.uid, toast);
      toast({
        title: "Success",
        description: "post is successfully created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // implement redirect
      setTitle("");
      setDescription("");
      setContent("");
      // router.push("/UserPosts");
    } else {
      // handle user not logged in
      console.log("User not logged in");
    }
  };
  if (!isClient) {
    return null;
  }

  return (
    <Box className="container mx-auto p-4">
      <VStack spacing={4} align="start">
        <FormControl id="title" isRequired>
          <FormLabel> Title </FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>

        <FormControl id="description" isRequired>
          <FormLabel> Description </FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a short description"
          />
        </FormControl>

        <FormControl id="content" isRequired>
          <FormLabel> Content </FormLabel>
          <MdEditor value={content} onChange={handleContentChange} />
        </FormControl>

        <Button
          colorScheme="teal"
          onClick={handleSubmit}
          className="rounded p-2"
        >
          Create Post
        </Button>
      </VStack>
    </Box>
  );
};

export default CreatePage;
