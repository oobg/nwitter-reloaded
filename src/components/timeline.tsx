import {useEffect, useState} from "react";
import {styled} from "styled-components";
import {query, collection, orderBy, limit, onSnapshot, Unsubscribe} from "firebase/firestore";
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
    gap: 10px;
`;

export default function Timeline() {
    const [tweets, setTweets] = useState<ITweet[]>([]);

    useEffect(() => {
        let unsubcribe : Unsubscribe | null;
        const fetchTweets = () => {
            const tweetsQuery = query(
                collection(db, "tweets"),
                orderBy("createdAt", "desc"),
                limit(25)
            );

            unsubcribe = onSnapshot(tweetsQuery, (snapshot) => {
                const tweets = snapshot.docs.map((doc) => {
                    const { tweet, createdAt, userId, username, photo } = doc.data();
                    return {
                        tweet,
                        createdAt,
                        userId,
                        username,
                        photo,
                        id: doc.id,
                    };
                });
                setTweets(tweets);
            });
        }
        fetchTweets();
        return () => {
            unsubcribe && unsubcribe();
        }
    }, []);
    return (
        <Wrapper>
            { tweets.map(tweet => <Tweet id={tweet.id} {...tweet} />) }
        </Wrapper>
    );
}