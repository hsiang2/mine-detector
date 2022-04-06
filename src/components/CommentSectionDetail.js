import React from "react";
import { Box, FlatList, Text, Pressable } from "native-base";
import commentData from "../json/comment.json"
import Comment from "./Comment";

const CommentSectionDetail = ({isSpoiler, navigation}) => {
    const renderItem = ({item}) => (<Comment comment={item}/>);
    const data = isSpoiler ? commentData.spoilerComments: commentData.comments;

    return(
        <Box flex={1} backgroundColor='#ff4081'>
            <Pressable onPress={() => navigation.navigate('Comment')}>
                <Text>查看更多</Text>
            </Pressable>
            <FlatList 
                horizontal={true}
                data={data.slice(0, 3)}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
            />
        </Box>
    );  
};

export default CommentSectionDetail;