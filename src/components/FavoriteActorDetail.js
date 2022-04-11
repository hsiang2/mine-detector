import React from "react";
import { Text, Image, Box, HStack } from "native-base";
import { ImageBackground } from "react-native";
import { BlurView } from "expo-blur";

const FavoriteActorDetail = ({actor}) => {
    return(
        <Box mr={5}>
            <ImageBackground 
                source={{uri: actor.image}}
                style={{
                    height: 118, width: 88, 
                    borderRadius: 5, overflow: "hidden",
                    justifyContent: "flex-end"
                }}
            >
                <BlurView intensity={45} style={{height: 34, paddingLeft: 7}}>
                    <Text 
                        fontSize={12} 
                        color= "#E8E8E8"
                        letterSpacing={0.2}
                    >
                        {actor.title}
                    </Text>
                </BlurView>
            </ImageBackground>
        </Box>
    );
};

export default FavoriteActorDetail;