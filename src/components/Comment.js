import { Box, HStack, Text, Image } from "native-base";
import React from "react";

const Comment = ({comment}) => {
    return(
        <Box>
            <HStack>
                <Image 
                    h={45} w={45}
                    source={{uri: comment.avatar}}
                    alt="avatar"
                />
                <Box>
                    <Text>{comment.user}</Text>

                </Box>
            </HStack>
            <Box>
                <Text>{comment.content}</Text>
            </Box>
            <Text>{comment.date}</Text>
        </Box>
    );
    
}

export default Comment;