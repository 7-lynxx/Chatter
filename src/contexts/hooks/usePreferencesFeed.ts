import { DocumentData, QueryDocumentSnapshot, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../lib/firebase";


interface Post {
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    content: string;
    authorId: string;
    createdAt: {
        seconds: number;
        nanoseconds: number;

    };
}

const usePreferenceFeed = (userId: string, preferences: string[]) => {
    const [ feed, setFeed ] = useState<Post[]>([]);

    useEffect(() => {
        const fetchFeed = async () => {
            if (preferences.length === 0){
                setFeed([]);
                return;
            }
        const feedQuery = query(
            collection(firestore, 'posts'),
            where('category', 'in', preferences)
        );

        const querySnapshot = await getDocs(feedQuery);

        const preferenceFeed = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data() as Omit<Post,'id'>;
            return{
                id:doc.id,
                ...data,
            };
        });

        setFeed(preferenceFeed);
        };
        fetchFeed();
    }, [preferences]);
    return feed;
};

export default usePreferenceFeed;                