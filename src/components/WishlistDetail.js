import React from "react";
import { Pressable, Box, Image, Text, HStack } from "native-base";
import { BlurView } from "expo-blur";

const WishlistDetail = ({movie, navigation}) => {
    return(
        <Pressable
          onPress={() => navigation.navigate('Detail', movie)}
        >
            <BlurView 
                    intensity={44} 
                    style={{ 
                        height: 100, marginRight: 20,
                        padding: 17, borderRadius: 5, overflow: "hidden"
                    }}
            >
                <HStack 
                    flex={1} 
                    alignItems= "center" justifyContent="space-between"
                >
                    <Box>
                        <Text fontSize={20} mb={1}>{movie.title}</Text>
                        <Text fontSize={12}>{movie.runtime}</Text>
                    </Box>
                    <Image 
                        ml={70}
                        h={60} w={60}
                        source={{uri: movie.poster}}
                        alt="movie"
                    />
                </HStack>
            </BlurView>
            
        </Pressable>
    );
};

export default WishlistDetail;