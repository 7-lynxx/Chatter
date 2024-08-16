'use client'

import { fetchPosts, sanitizeHtml } from '@/contexts/lib/posts';
import { Box, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


interface Post {
  id: string;
  title: string;
  content: string;
  tags: string[];
  authorId: string;
  createdAt: Date;
}
 const Explore = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };

    loadPosts();
  }, []);

  const handlePostClick = (postId: string) => {
    router.push(`/posts/${postId}`);
  };

  return (
    <Box>
      {posts.map((post) => (
        <Box key={post.id} mb={4} p={4} borderWidth={1} borderRadius="md">
          <Text  fontWeight="bold">{post.title}</Text>
          <Text mt={2}>{post.tags.join(', ')}</Text>
          <Button mt={2} onClick={() => handlePostClick(post.id)}>
            View Full Content
          </Button>
        </Box>
      ))}
    </Box>
  );
};
export default Explore;