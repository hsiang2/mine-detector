import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import Comment from "./Comment";
import { db } from "../api/firebase";


const CommentList = ({isSpoiler, movie}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "comments", movie), (doc) => {
            if(isSpoiler){
                if(doc.data().spoiler){
                    const comment = doc.data().spoiler
                    setData(comment)
                } else {setData([])}
            } else {
                if(doc.data().noSpoiler){
                    const comment = doc.data().noSpoiler
                    setData(comment)
                } else { setData([])}
            }
        });
        return (() => { unsubscribe();})
    }, [isSpoiler])

    return (
        data.map( item => {
            return (
                <Comment
                    key={item.date + item.user}
                    comment={item}
                    isLarge={true}
                />
            );
        })
    );
};

export default CommentList;