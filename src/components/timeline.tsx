import {useEffect, useState} from "react";
import {styled} from "styled-components";
import {query, collection, orderBy, getDocs} from "firebase/firestore";
import {db} from "../firebase.ts";
import Tweet from "./tweet.tsx";

export interface ITweet {
    id: string;
    photo: string;
    tweet: string;
    userId: string;
    username: string;
    createdAt: number;
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 10px;
`;

export default function Timeline() {
    const [tweets, setTweets] = useState<ITweet[]>([]);
    const fetchTweets = async () => {
        const tweetsQuery = query(
            collection(db, "tweets"),
            orderBy("createdAt", "desc"),
        );

        const snapshot = await getDocs(tweetsQuery);
        const tweets = snapshot.docs.map(doc => {
            const { tweet, createdAt, userId, username, photo } = doc.data();
            console.log("type : ", typeof doc.id)
            return {
                tweet,
                createdAt,
                userId,
                username,
                photo,
                id: doc.id
            }
        });
        setTweets(tweets);
    }
    useEffect(() => {
        fetchTweets();
    }, []);
    return (
        <Wrapper>
            { tweets.map(tweet => <Tweet id={tweet.id} {...tweet} />) }
        </Wrapper>
    );
}