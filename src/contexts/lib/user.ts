import { addDoc, collection, doc, getDoc, getDocs, query, queryEqual, setDoc, where } from "firebase/firestore"
import { auth, firestore } from "./firebase"
import { User } from "firebase/auth";
import { useToast } from "@chakra-ui/react";



interface customUser extends User {
    // uid: string;
    // email: string;
    // displayName?: string;
    // photoURL?: string;
    preferences?: string[];
}

const saveUserData = async (user: customUser)=> {
    const userDoc = doc(firestore, 'users', user.uid);
    const userDocSnapshot = await getDoc(userDoc);


    if(!userDocSnapshot.exists()){
        await setDoc(userDoc, {
            uid: user.uid,
            email:user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        })
    }
};

export const getUserData = async (uid: string): Promise<customUser | null> => {
    const userDoc = await getDoc(doc(firestore, 'users', uid));
    if (userDoc.exists()){
        return userDoc.data() as customUser;
    }else {
        return null;
    }
};

export const saveUserPreferences = async (userId: string, preferences:string[]) =>{
    await setDoc(doc(firestore, 'users', userId), { preferences }, { merge: true});
};


interface SaveContentParams {
    title: string;
    content: string;
    authorId: string;
    tags: string[];
}
import { createHash } from 'crypto';

// Function to hash content using SHA-256
export const hashContent = (content: string): string => {
    return createHash('sha256')  // Specify the algorithm
        .update(content)         // Add the content to be hashed
        .digest('hex');          // Output the hash as a hexadecimal string
};

export const saveContent = async ({title, content, authorId, tags }: SaveContentParams): Promise<void> => {
    try {
        const contentHash = hashContent(content);

        // Check for existing content with the same hash
        const postsRef = collection(firestore, 'posts');
        const q = query(postsRef, where('contentHash', '==', contentHash));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            throw new Error('Duplicate content detected. The content has already been saved.');
        }

            // Create a new post
            const docRef = await addDoc(postsRef, {
                title,
                content,
                authorId,
                contentHash,
                tags,
                createdAt: new Date(),
            });
            console.log('Document written with ID:', docRef.id);
    }catch (e) {
        console.error('Error saving document:', e);
        throw e; // Re-throw the error for handling in the calling code
    }
};


export const saveUserTags = async (tags: string[]) => {
    try {
     
      const user = auth.currentUser;
  
      if (!user) {
        throw new Error("No user is logged in.");
      }
  
      const userDocRef = doc(firestore, "users", user.uid);
      
      // Assuming you want to save the tags under a "tags" field in the user document
      await setDoc(userDocRef, { tags }, { merge: true });
  
      console.log("Tags saved successfully.");
    } catch (error) {
      console.error("Error saving tags:", error);
      throw error;
    }
  };
export default saveUserData;