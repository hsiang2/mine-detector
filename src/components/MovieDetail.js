import { Pressable, Box, Image, Text } from "native-base";
import React from "react";

const MovieDetail = ({movie, navigation}) => {
    return(
        <Pressable
          onPress={() => navigation.navigate('Detail', movie)}
        >
            <Box>
                <Image 
                h={125} w={90}
                source={{uri: movie.poster}}
                alt="movie"
                />
                <Text>{movie.title}</Text>
                <Box>
                    <Text>{movie.star}</Text>
                </Box>
            </Box>
        </Pressable>
    );
};

export default MovieDetail;