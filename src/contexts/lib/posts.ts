import { collection, doc, getDoc, getDocs, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { firestore } from './firebase'; // Adjust the import based on your file structure
import DOMPurify from 'dompurify'

interface Post {
    id: string;
    title: string;
    tags: string[];
    content: string;
    authorId: string;
    createdAt: Date;
    likes:string[];
  }

  export const fetchPosts = async (): Promise<Post[]> => {
    try {
      const postsCollection = collection(firestore, "posts");
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "", // Ensure title is included
          content: data.content,
          authorId: data.authorId,
          createdAt: data.createdAt.toDate(), // Ensure this is converted from Firestore Timestamp to Date
          tags: data.tags || [], // Ensure tags is always an array
        } as Post;
      });
      return postsList;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };

export const sanitizeHtml = (content: string) => {
    return DOMPurify.sanitize(content);
};

export async function getPostById(postId: string) {
  if (!postId) {
      throw new Error('Post ID is required');
  }

  try {
      const postDocRef = doc(firestore, 'posts', postId);
      const postSnapshot = await getDoc(postDocRef);

      if (postSnapshot.exists()) {
          return postSnapshot.data();
      } else {
          throw new Error('Post not found');
      }
  } catch (error) {
      console.error('Error fetching post by ID:', error);
      throw error;
  }
}


// Fetch the user's tags (preferences)
export const getUserTags = async (userId: string) => {

    const userRef = doc(firestore, "users", userId);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        return userData.tags || []; // Return the tags or an empty array if not found
    } else {
        return [];
    }
};

export const getPostsByTags = async (tags: string[]): Promise<Post[]> => {
  try {
    const postsCollection = collection(firestore, 'posts');
    const postsQuery = query(
      postsCollection,
      where('tags', 'array-contains-any', tags)
    );
    const postsSnapshot = await getDocs(postsQuery);
    
    const postsList = postsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || '',
        content: data.content || '',
        tags: data.tags || [],
        authorId: data.authorId || '',
        createdAt: data.createdAt?.toDate() || new Date(),
      } as Post;
    });
    return postsList;
  } catch (error) {
    console.error('Error fetching posts by tags:', error);
    throw error;
  }
};

export const getPersonalizedFeed = async (userId: string): Promise<Post[]> => {
  const userTags = await getUserTags(userId);
  if (!userTags || userTags.length === 0) {
    console.log('No tags found for user, fetching all posts.');
    // If no tags are found, you might want to fetch all posts
    return fetchPosts(); // Ensure fetchPosts returns a valid Post[]
  }
  
  // Fetch and filter posts based on the retrieved tags
  const posts = await getPostsByTags(userTags);
  return posts;
};

export const searchPosts = async (searchTerm: string): Promise<Post[]> => {
  try {
    if (!searchTerm.trim()) {
      return []; // Return empty array if searchTerm is empty
    }

    // Prepare search term with wildcard for Firestore query
    const searchTermLower = searchTerm.toLowerCase();
    const start = searchTermLower;
    const end = searchTermLower + '\uf8ff'; // Unicode character for end of range

    // Perform search query
    const postsCollection = collection(firestore, 'posts');
    const searchQuery = query(
      postsCollection,
      where('title', '>=', start),
      where('title', '<=', end),
      orderBy('title')
    );

    const postsSnapshot = await getDocs(searchQuery);
    const postsList = postsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "",
        content: data.content || "",
        contentHash: data.contentHash || "",
        authorId: data.authorId || "",
        createdAt: data.createdAt.toDate(), // Convert Firestore Timestamp to Date
        tags: data.tags || [],
        likes: data.likes,
      } as Post;
    });

    return postsList;
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};