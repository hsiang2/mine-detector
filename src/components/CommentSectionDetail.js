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
                onPress={() => navigation.navigate('Comment', {isSpoiler: isSpoiler})}
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
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: 22
                }}
            />
        </Box>
    );  
};

export default CommentSectionDetail;