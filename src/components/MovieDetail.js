import React from "react";
import { Pressable, Box, Image, Text } from "native-base";

const MovieDetail = ({movie, navigation}) => {
    return(
        <Pressable
          onPress={() => navigation.navigate('Detail')}
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