import { Box, Text, Button, Textarea, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { firestore } from '@/contexts/lib/firebase';
import { auth } from '@/contexts/lib/firebase';

interface Comment {
  id: string;
  authorId: string;
  content: string;
  createdAt: Date;
  replies: Comment[];
}

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyContent, setReplyContent] = useState("");
  const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null);

  useEffect(() => {
    const postRef = doc(firestore, 'posts', postId);

    const unsubscribe = onSnapshot(postRef, (doc) => {
      const data = doc.data();
      if (data && data.comments) {
        setComments(data.comments as Comment[]);
      }
    });

    return () => unsubscribe();
  }, [postId]);

  const handleAddReply = async (commentId: string) => {
    if (!auth.currentUser) return;

    const postRef = doc(firestore, 'posts', postId);

    const newReply = {
      id: new Date().toISOString(), // Use a unique ID for the reply
      authorId: auth.currentUser.uid,
      content: replyContent,
      createdAt: new Date(),
      replies: [] as Comment[],
    };

    try {
      await updateDoc(postRef, {
        comments: comments.map(comment =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, newReply] }
            : comment
        ),
      });
      setReplyContent("");
      setReplyToCommentId(null); // Clear reply field
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  return (
    <VStack spacing={4}>
      {comments.map((comment) => (
        <Box key={comment.id} p={2} borderWidth={1} borderRadius="md">
          <Text fontWeight="bold">{comment.authorId}</Text>
          <Text>{comment.content}</Text>
          <Button onClick={() => setReplyToCommentId(comment.id)} colorScheme="blue">
            Reply
          </Button>
          {replyToCommentId === comment.id && (
            <Box mt={2}>
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Add a reply..."
                mb={2}
              />
              <Button onClick={() => handleAddReply(comment.id)} colorScheme="blue">
                Add Reply
              </Button>
            </Box>
          )}
          {comment.replies && comment.replies.map((reply) => (
            <Box key={reply.id} p={2} borderWidth={1} borderRadius="md" ml={4}>
              <Text fontWeight="bold">{reply.authorId}</Text>
              <Text>{reply.content}</Text>
            </Box>
          ))}
        </Box>
      ))}
    </VStack>
  );
};

export default CommentSection;