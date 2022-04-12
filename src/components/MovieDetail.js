import React from "react";
import { Pressable, Box, Image, Text } from "native-base";
import Star from "./Star";

const MovieDetail = ({movie, navigation}) => {
    return(
        <Pressable
          onPress={() => navigation.navigate('Detail', movie)}
        >
            <Box w={104}>
                <Image 
                    h={125} w={90} mb={1.5}
                    source={{uri: movie.poster}}
                    alt="movie"
                />
                <Text 
                    fontSize={12} letterSpacing={0.2}
                    _dark={{color: "#E2E0E0"}} _light={{color: "#445B6C"} }
                    numberOfLines={1}
                >
                    {movie.title}
                </Text>
                <Star star={movie.star.toFixed(1)}/>
            </Box>
        </Pressable>
    );
};

export default MovieDetail;