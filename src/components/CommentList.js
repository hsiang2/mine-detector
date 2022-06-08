import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";

import Comment from "./Comment";
import commentData from "../json/comment.json"
import { db } from "../api/firebase";
//import { readCommentAsync } from "../redux/commentSlice";
// import { db } from "../../App";
// import { async } from "@firebase/util";
import { selectComment, finish } from "../redux/commentSlice";


const CommentList = ({isSpoiler, movie}) => {
    //console.log(isSpoiler);
    // useEffect(()=> {
    //     if(isSpoiler) {
    //         if(dispatch(readCommentAsync(movie)).spoiler !== undefined){
    //             setData(dispatch(readCommentAsync(movie)).spoiler)
    //         }
    //     } else{
    //         if(dispatch(readCommentAsync(movie)).noSpoiler !== undefined){
    //             setData(dispatch(readCommentAsync(movie)).noSpoiler)
    //         }
    //     }
    // }, [commentUpdate])

    const commentUpdate = useSelector(selectComment);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [snapShot, setSnapShot] = useState(null);
    //const mounted = useRef(false);
    //const commentRef = doc(db, "comments", movie);
    useEffect(() => {
        //mounted.current = true;
        //const commentRef = doc(db, "comments", movie);
       // const commentSnap = await getDoc(commentRef);
        const unsubscribe = onSnapshot(doc(db, "comments", movie), (doc) => {
            if(isSpoiler){
                if(doc.data().spoiler){
                    const comment = doc.data().spoiler
                    setData(comment)
                } else {
                    setData([])
                }
            } else {
                if(doc.data().noSpoiler){
                    const comment = doc.data().noSpoiler
                    setData(comment)
                } else {
                    setData([])
                }
            }
                
        });

        return (() => { unsubscribe();})
        // const commentSnap = await getDoc(commentRef);
        // if (commentSnap.exists()) {
        //         if(isSpoiler){
        //             if(commentSnap.data().spoiler){
        //                 onSnapshot(commentRef, (doc) => {
        //                     setData(doc.data().spoiler)
        //                 });
        //             } else {
        //                 setData([])
        //             }
        //         } else {
        //             if(commentSnap.data().noSpoiler){
        //                 onSnapshot(commentRef, (doc) => {
        //                     setData(doc.data().noSpoiler)
        //                 });
        //             } else {
        //                 setData([])
        //             }
        //         }
        //     }else {
        //         setData([])
        //     }
    }, [/*commentUpdate,*/ isSpoiler])

    // useEffect(() => {
    //     if(snapShot !== null){
    //         setData(snapShot);
    //     }
    // }, [snapShot])
    
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