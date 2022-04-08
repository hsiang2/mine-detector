import React from "react";
import { Text, Image, Box, HStack } from "native-base";
import { ImageBackground } from "react-native";

const FavoriteActorDetail = ({actor}) => {
    return(
        <HStack>
            <ImageBackground 
                source={{uri: actor.image}}
                style={{height: 118, width: 88}}
            >
                <Box>
                    <Text>{actor.title}</Text>
                </Box>
            </ImageBackground>
        </HStack>
    );
};

export default FavoriteActorDetail;