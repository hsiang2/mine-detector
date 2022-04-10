import { FlatList } from "native-base";
import React from "react";
import Comment from "./Comment";
import commentData from "../json/comment.json"

const CommentList = ({isSpoiler}) => {
    //const renderItem = ({item}) => (<Comment comment={item} isLarge={true}/>);
    const data = isSpoiler ? commentData.spoilerComments: commentData.comments;
    return(
        data.map( item => {
            return (
                <Comment
                    key={item.id}
                    comment={item}
                    isLarge={true}
                />
            );
        })
        // <FlatList 
        //     data={data}
        //     renderItem={renderItem}
        //     keyExtractor={item => item.id}
        //     contentContainerStyle={{
        //         paddingVertical: 27
        //     }}
        // />
    );
};

export default CommentList;