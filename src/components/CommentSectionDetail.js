import React from "react";
import { Box, FlatList, Text, Pressable } from "native-base";
import commentData from "../json/comment.json"
import Comment from "./Comment";

const CommentSectionDetail = ({isSpoiler, navigation}) => {
    const renderItem = ({item}) => (<Comment comment={item} isLarge={false}/>);
    const data = isSpoiler ? commentData.spoilerComments: commentData.comments;

    return(
        <Box flex={1} >
            <Pressable 
                mt={15} mb={18} mr={30} alignItems="flex-end" 
                onPress={() => navigation.navigate('Comment')}
            >
                <Text fontSize={14} color="#E0DAA4">查看更多</Text>
            </Pressable>
            <FlatList 
                horizontal={true}
                data={data.slice(0, 3)}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginLeft: 22
                }}
            />
        </Box>
    );  
};

export default CommentSectionDetail;