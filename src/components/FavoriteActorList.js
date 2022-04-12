import React from "react";
import { FlatList, HStack, Text, useColorMode } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign"
import FavoriteActorDetail from "./FavoriteActorDetail";

const FavoriteActorList = ({data}) => {
    const {colorMode} = useColorMode();
    const renderItem = ({item}) => (<FavoriteActorDetail actor={item}/>)
    return(
        <>
            <HStack 
                px={28}
                alignItems="center" justifyContent="space-between"
            >
                <Text 
                    _dark={{color: "#F4F4F4"}}
                    _light={{color: "#445B6C"}}
                    fontSize={20}
                    letterSpacing={0.2}
                >
                    喜愛演員
                </Text>
                <AntDesign name="right" color={colorMode =="dark"?"#F4F4F4":"#445B6C"} size={20}/>
                
            </HStack>
            <FlatList 
                horizontal={true}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.title}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginLeft: 26, marginTop: 25, marginBottom: 29, paddingRight: 26
                }}
            />
        </>
    );
};

export default FavoriteActorList;