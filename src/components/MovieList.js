import React from "react";
import { FlatList, Text, Box } from "native-base";
import MovieDetail from "./MovieDetail";

const MovieList = ({data, navigation}) => {
    const renderItem = ({item}) => (<MovieDetail movie={item} navigation={navigation}/>)
    return(
        <Box >
            <Text ml={4} fontSize={18}>{data.title}</Text>
            <FlatList 
                contentContainerStyle={{paddingLeft: 16, marginTop: 16, marginBottom:26}}
                horizontal={true}
                data={data.list}
                renderItem={renderItem}
                keyExtractor={item => item.title}
                showsHorizontalScrollIndicator={false}
            />
        </Box>
    );
};

export default MovieList;