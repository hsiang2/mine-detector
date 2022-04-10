import React from "react";
import { FlatList, HStack, Text } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign"
import FavoriteActorDetail from "./FavoriteActorDetail";

const FavoriteActorList = ({data}) => {
    const renderItem = ({item}) => (<FavoriteActorDetail actor={item}/>)
    return(
        <>
            <HStack 
                px={28}
                alignItems="center" justifyContent="space-between"
            >
                <Text fontSize={20}>喜愛演員</Text>
                <AntDesign name="right" color="#F4F4F4" size={20}/>
                
            </HStack>
            <FlatList 
                horizontal={true}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.title}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginLeft: 26, marginTop: 25, marginBottom: 29
                }}
            />
        </>
    );
};

export default FavoriteActorList;