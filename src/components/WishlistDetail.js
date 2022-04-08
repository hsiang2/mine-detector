import React from "react";
import { Pressable, Box, Image, Text, HStack } from "native-base";

const WishlistDetail = ({movie, navigation}) => {
    return(
        <Pressable
          onPress={() => navigation.navigate('Detail', movie)}
        >
            <HStack>
                <Box>
                    <Text>{movie.title}</Text>
                    <Text>{movie.runtime}</Text>
                </Box>
                <Image 
                    h={60} w={60}
                    source={{uri: movie.poster}}
                    alt="movie"
                />
            </HStack>
        </Pressable>
    );
};

export default WishlistDetail;