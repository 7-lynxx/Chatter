import { useEffect, useState } from "react"
import { firestore } from "../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";


type FeedItem = {
    id: string;
    authorId: string;
    title: string;
    content: string;
    createdAt: Date;
    description?: string;
}

const useSpecializedFeed = (userId: string) => {
    const [ feed, setFeed ] = useState<FeedItem[]>([]);

    useEffect(() => {
        const fetchFeed = async () => {
            const feedQuery = query(collection(firestore, 'posts'), where('authorId', '==', userId ) 
            // filter based on user-specific data
        );
        const querySnapshot = await getDocs(feedQuery);

        const userFeed: FeedItem[] = querySnapshot.docs.map((doc) => {
            const data = doc.data() as Omit<FeedItem, 'id'>;
            // get data without "id"

            return{
                id: doc.id,
                ...data,
            }
            
        });

        setFeed(userFeed);
        };

        fetchFeed();
    }, [userId]);
    return feed;
};

export default useSpecializedFeed;