import React from "react";
import { FlatList, Text } from "native-base";
import MovieDetail from "./MovieDetail";

const MovieList = ({data, navigation}) => {
    const renderItem = ({item}) => (<MovieDetail movie={item} navigation={navigation}/>)
    return(
        <>
            <Text>{data.title}</Text>
            <FlatList 
                horizontal={true}
                data={data.list}
                renderItem={renderItem}
                keyExtractor={item => item.title}
                showsHorizontalScrollIndicator={false}
            />
        </>
    );
};

export default MovieList;