import React from "react";
import { Box, HStack, Image, ScrollView, Text } from "native-base";

import ActorList from "../components/ActorList";
import CommentSection from "../components/CommentSection";

const DetailScreen = ({route, navigation}) => {
    const { image,
            genres,
            rated,
            title,
            star,
            plot,
            runtime,
            released,
            platform,
            actors,
          } = route.params;
    return(
        <>
            {/* <ScrollView flex={1}> */}
            <Image h={179} source={{uri: image}} alt="movie"/>
            <HStack>
                <HStack>
                    {genres.map(genre => {
                        return <Text key={genre}>{genre}</Text>
                    })}
                </HStack>
                <Text>{rated}</Text>
            </HStack>
            <Text>{title}</Text>

            <Text>{plot}</Text>
            <HStack>
                <Box>
                    <Text>影片時長</Text>
                    <Text>{runtime}</Text>
                </Box>
                <Box>
                    <Text>上映日期</Text>
                    <Text>{released}</Text>
                </Box>
                <Box>
                    <Text>觀看平台</Text>
                    <Text>{platform}</Text>
                </Box>
            </HStack>       
            <ActorList data={actors}/>
            {/* </ScrollView> */}
            <CommentSection navigation={navigation}/>
        </>
    );
}

export default DetailScreen;