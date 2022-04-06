import { FlatList } from "native-base";
import React from "react";
import Comment from "./Comment";
import commentData from "../json/comment.json"

const CommentList = ({isSpoiler}) => {
    const renderItem = ({item}) => (<Comment comment={item}/>);
    const data = isSpoiler ? commentData.spoilerComments: commentData.comments;
    return(
        <FlatList 
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    );
};

export default CommentList;