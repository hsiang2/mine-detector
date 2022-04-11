import { BlurView } from "expo-blur";
import { Box, HStack, Text, Image } from "native-base";
import React from "react";
import Star from "./Star";

const Comment = ({comment, isLarge}) => {
    const width = isLarge? 329: 293;
    const mr = isLarge? null: 25;
    const mb = isLarge? 5: null;
    return(
        <Box 
            w={width} h={167} borderWidth={1} mr={mr} mb={mb}
             borderRadius={5} 
            _dark={{borderColor: "#6477888C"}}
            _light={{borderColor: "#BFE1E980"}}
        >
            <BlurView 
                intensity={20}
                style={{
                    flex: 1, padding: 14,
                    justifyContent: "space-between"
                }}
            >
                <HStack>
                    <Image 
                        h={45} w={45} mr={14}
                        source={{uri: comment.avatar}}
                        alt="avatar"
                    />
                    <Box>
                        <Text
                            letterSpacing={0.2}
                            _dark={{color: "#E8E8E8"}}
                            _light={{color: "#243243"}}
                        >
                            {comment.user}
                        </Text>
                        <Star star={comment.star.toFixed(1)}/>
                    </Box>
                </HStack>
                
                <Text 
                    height={60} mt={4} fontSize={12}
                    letterSpacing={0.2}
                    _dark={{color: "#B7B7B7"}}
                    _light={{color: "#808080"}}
                >
                    {comment.content}
                </Text>
                <Text 
                    fontSize={12} letterSpacing={0.5}
                    _dark={{color: "#989898"}}
                    _light={{color: "#A8A8A8"}}
                >
                    {comment.date}
                </Text>
            </BlurView>
        </Box>
        
    );
    
}

export default Comment;