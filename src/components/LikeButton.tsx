import { IconButton, useToast } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { firestore } from '@/contexts/lib/firebase';
import { auth } from '@/contexts/lib/firebase';

interface LikeButtonProps {
  postId: string;
  currentLikes: string[];
  onLikeUpdate: (newLikesCount: number) => void; // Callback to update like count
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, currentLikes, onLikeUpdate }) => {
  const [likes, setLikes] = useState<string[]>(currentLikes);
  const [userLiked, setUserLiked] = useState<boolean>(currentLikes.includes(auth.currentUser?.uid || ''));
  const toast = useToast();

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    // Update userLiked state when userId or likes changes
    setUserLiked(likes.includes(userId || ''));
  }, [likes, userId]);

  const handleLike = async () => {
    if (!userId) {
      toast({
        title: "Error",
        description: "You must be logged in to like posts.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const postRef = doc(firestore, "posts", postId);

    try {
      if (userLiked) {
        // Unlike the post
        await updateDoc(postRef, {
          likes: arrayRemove(userId),
        });
        setLikes((prevLikes) => prevLikes.filter((id) => id !== userId));
        onLikeUpdate(likes.length - 1); // Update likes count directly
      } else {
        // Like the post
        await updateDoc(postRef, {
          likes: arrayUnion(userId),
        });
        setLikes((prevLikes) => [...prevLikes, userId]);
        onLikeUpdate(likes.length + 1); // Update likes count directly
      }
    } catch (error) {
      console.error("Error updating likes:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating likes.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <IconButton
      icon={<FaHeart />}
      aria-label="Like post"
      colorScheme={userLiked ? "red" : "gray"}
      onClick={handleLike}
    />
  );
};

export default LikeButton;