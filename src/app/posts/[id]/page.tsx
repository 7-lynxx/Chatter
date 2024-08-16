'use client'

import { useEffect, useState } from 'react';
import { getDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth, firestore } from '@/contexts/lib/firebase'; // Adjust path if needed
import { Box, Text, Spinner, Button, HStack, Textarea } from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import { sanitizeHtml } from '@/contexts/lib/posts';
import { onAuthStateChanged } from 'firebase/auth';
import LikeButton from '@/components/LikeButton';
import CommentSection from '@/components/Comments';

interface Comment {
  id: string;
  authorId: string;
  content: string;
  createdAt: Date;
  replies: Comment[];
}

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  tags: string[];
  likes: string[];
  comments: Comment[];
}

const PostPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthor, setIsAuthor] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.uid === post?.authorId) {
        setIsAuthor(true);
      }
    });

    return () => unsubscribe();
  }, [post?.authorId]);

  const handleEdit = () => {
    router.push(`/posts/${post?.id}/edit`);
  };

  const updateLikesCount = (newLikesCount: number) => {
    setLikesCount(newLikesCount);
  };

  const handleAddComment = async () => {
    if (!auth.currentUser) return;

    const postRef = doc(firestore, 'posts', id as string);
    const newComment = {
      id: new Date().toISOString(), // Use a unique ID for the comment
      authorId: auth.currentUser.uid,
      content: commentContent,
      createdAt: new Date(),
      replies: [],
    };

    try {
      await updateDoc(postRef, {
        comments: arrayUnion(newComment),
      });
      setCommentContent(""); // Clear input field
      // Optionally, you can update local state or re-fetch post data
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return; // Check if id is available
      try {
        const docRef = doc(firestore, 'posts', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPost({
            id: docSnap.id,
            title: data.title,
            content: data.content,
            authorId: data.authorId,
            createdAt: data.createdAt.toDate(),
            tags: data.tags || [],
            likes: data.likes || [],
            comments: data.comments || [],
          } as Post);
          setLikesCount(data.likes?.length || 0);
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (!id) {
    return <Spinner />; // Or any loading indicator while waiting for the id
  }

  if (loading) {
    return <Spinner />;
  }

  if (!post) {
    return <Text>No post found.</Text>;
  }

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold">
        {post.title}
      </Text>
      <Box as='div' dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}></Box>
      <Text mt={4} color="gray.600">
        Tags: {post.tags.join(', ')}
      </Text>
      {isAuthor && (
        <Button onClick={handleEdit} mt={4} colorScheme='blue'>
          Edit
        </Button>
      )}
      <Box mt={2}>
        <HStack>
          <LikeButton postId={post.id} currentLikes={post.likes || []} onLikeUpdate={updateLikesCount} />
          <Text>{likesCount} {likesCount === 1 ? 'like' : 'likes'}</Text>
        </HStack>
      </Box>
      <Box mt={4}>
        <Textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Add a comment..."
          mb={2}
        />
        <Button onClick={handleAddComment} colorScheme="blue">
          Add Comment
        </Button>
        <CommentSection postId={post.id}/>
      </Box>
    </Box>
  );
};

export default PostPage;