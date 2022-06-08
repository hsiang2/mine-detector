import React, { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { Box, FlatList, Text, Pressable } from "native-base";

import commentData from "../json/comment.json"
import Comment from "./Comment";
import { db } from "../api/firebase";
//import { selectComment, finish } from "../redux/commentSlice";
import { getComment } from "../api/firebase";
import { getCommentAsync, selectComment } from "../redux/commentSlice";

const CommentSectionDetail = ({isSpoiler, navigation, movie}) => {
    const renderItem = ({item}) => (<Comment comment={item} isLarge={false}/>);
    //const data = isSpoiler ? commentData.spoilerComments: commentData.comments;
    //const commentUpdate = useSelector(selectComment);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [snapShot, setSnapShot] = useState(null);
    const comment = useSelector(selectComment)
    // useEffect(() => {
    //     //dispatch(getCommentAsync({movie, isSpoiler}));
       
    //  }, [])
     
    // useEffect(()=> {
    //     getComment({movie, isSpoiler});
    // }, [])
    // useEffect(() => {
    //     //dispatch(getCommentAsync({movie, isSpoiler}));
    //     getComment({movie, isSpoiler})
    //     setData(comment)
    // }, [comment]);
    //console.log(commentUpdate)
    
    useEffect( () => {
        console.log("hi");
        //const commentRef = doc(db, "comments", movie);
        //const commentSnap = await getDoc(commentRef);
        const unsubscribe = onSnapshot(doc(db, "comments", movie), (doc) => {
            if(isSpoiler){
                if(doc.data().spoiler){
                    const comment = doc.data().spoiler
                    setData(comment)
                } 
            } else {
                if(doc.data().noSpoiler){
                    const comment = doc.data().noSpoiler
                    setData(comment)
                } 
            }
                
        });

        return (() => { unsubscribe();})
        // if (commentSnap.exists()) {
        //         if(isSpoiler){
                    
        //                 onSnapshot(commentRef, (doc) => {
        //                     if(commentSnap.data().spoiler){
        //                         setData(doc.data().spoiler)
        //                     } 
        //                 });
                    
        //         } else {
                    
        //                 onSnapshot(commentRef, (doc) => {
        //                     if(commentSnap.data().noSpoiler){
        //                         setData(doc.data().noSpoiler)
        //                     } 
        //                 });
                    
        //         }
        //     }

    }, [/*commentUpdate, isSpoiler*/])

    // useEffect(() => {
    //     if(snapShot !== null){
    //         setData(snapShot);
    //     }
    // }, [snapShot])
    
    return(
        <Box flex={1} >
            <Pressable 
                mt={15} mb={18} mr={30} alignItems="flex-end" 
                onPress={() => navigation.navigate('Comment', {isSpoiler, movie})}
            >
                <Text 
                    fontSize={14} letterSpacing={0.2}
                    _dark={{color: "#FFDA7B"}}
                    _light={{color: "#D99F3E"}}
                >
                    查看更多
                </Text>
            </Pressable>
            <FlatList 
                horizontal={true}
                data={data.slice(0, 3)}
                renderItem={renderItem}
                keyExtractor={item => item.date + item.user}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: 22
                }}
            />
        </Box>
    );  
};

export default CommentSectionDetail;