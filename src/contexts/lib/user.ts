import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore"
import { firestore } from "./firebase"



interface customUser{
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
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

export const saveContent = async (content: string, authorId: string) => {
    try {
        const docRef = await addDoc(collection(firestore,'posts'), {
            content,
            authorId,
            createdAt: new Date(),
        });
        console.log('Document written with ID: ', docRef.id);
    }catch(e){
        console.error('Error adding Document: ', e);
    }
};

export default saveUserData;