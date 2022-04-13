import React from "react";
import Comment from "./Comment";
import commentData from "../json/comment.json"

const CommentList = ({isSpoiler}) => {
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
    );
};

export default CommentList;