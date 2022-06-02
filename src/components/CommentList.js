import React, { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";

import Comment from "./Comment";
import commentData from "../json/comment.json"
import { db } from "../../App";
import { async } from "@firebase/util";
import { selectComment, finish } from "../redux/commentSlice";


const CommentList = ({isSpoiler, movie}) => {
    const commentUpdate = useSelector(selectComment);
    const dispatch = useDispatch();
    //const [noComment, setNoComment] = useState(false);
    const [data, setData] = useState([]);
    //let data;
    //console.log(movie);
    console.log(commentUpdate)
    const commentRef = doc(db, "comments", movie);
    useEffect(async () => {
        
        //console.log("執行")
        const commentSnap = await getDoc(commentRef);
        if (commentSnap.exists()) {
                if(isSpoiler){
                    if(commentSnap.data().spoiler){
                        onSnapshot(commentRef, (doc) => {
                            setData(doc.data().spoiler)
                        });
                        //setData(commentSnap.data().spoiler)
                        //console.log(commentSnap.data().spoiler);
                    } 
                } else {
                    if(commentSnap.data().noSpoiler){
                        onSnapshot(commentRef, (doc) => {
                            setData(doc.data().noSpoiler)
                            //console.log("新留言")
                        });
                        //setData(commentSnap.data().noSpoiler)
                        //console.log(commentSnap.data().spoiler);
                    } 
                }
            }
    }, [commentUpdate])
    //dispatch(finish);
    //const data = isSpoiler ? commentData.spoilerComments: commentData.comments;
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