import React from "react";
import { FlatList, HStack, Text } from "native-base";
import FavoriteActorDetail from "./FavoriteActorDetail";

const FavoriteActorList = ({data}) => {
    const renderItem = ({item}) => (<FavoriteActorDetail actor={item}/>)
    return(
        <>
            <HStack>
                <Text>喜愛演員</Text>
            </HStack>
            <FlatList 
                horizontal={true}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.title}
                showsHorizontalScrollIndicator={false}
            />
        </>
    );
};

export default FavoriteActorList;