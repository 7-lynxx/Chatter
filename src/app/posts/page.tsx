'use client'

import { fetchPosts, getPersonalizedFeed, getPostsByTags, sanitizeHtml } from '@/contexts/lib/posts';
import { Box, Button, Text, ButtonGroup } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { auth } from '@/contexts/lib/firebase'; // Import auth to get current user's ID

interface Post {
  id: string;
  title: string;
  content: string;
  tags: string[];
  authorId: string;
  createdAt: Date;
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [view, setView] = useState<'all' | 'personalized'>('all');
  const router = useRouter();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        let fetchedPosts: Post[] = [];

        if (view === 'all') {
          fetchedPosts = await fetchPosts();
        } else {
          const user = auth.currentUser;
          if (user) {
            fetchedPosts = await getPersonalizedFeed(user.uid);
          }
        }

        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };

    loadPosts();
  }, [view]);

  const handlePostClick = (postId: string) => {
    router.push(`/posts/${postId}`);
  };

  const handleTagFilter = async (tag: string) => {
    try {
      const filteredPosts = await getPostsByTags([tag]); // Assuming single tag filter for simplicity
      setPosts(filteredPosts);
    } catch (error) {
      console.error('Failed to filter posts', error);
    }
  };
  
  return (
    <Box>
      <ButtonGroup mb={4} spacing={4}>
        <Button
          colorScheme={view === 'all' ? 'teal' : 'gray'}
          onClick={() => setView('all')}
        >
          All Posts
        </Button>
        <Button
          colorScheme={view === 'personalized' ? 'teal' : 'gray'}
          onClick={() => setView('personalized')}
        >
          For You
        </Button>
      </ButtonGroup>

      {posts.map((post) => (
        <Box key={post.id} mb={4} p={4} borderWidth={1} borderRadius="md">
          <Text fontWeight="bold">{post.title}</Text>
          <Text mt={2}>{post.tags.join(', ')}</Text>
          <Button mt={2} onClick={() => handlePostClick(post.id)}>
            View Full Content
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default Posts;