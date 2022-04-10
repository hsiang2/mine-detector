import React from "react";
import { FlatList, HStack, Text } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign"
import WishlistDetail from "./WishlistDetail";


const Wishlist = ({data, navigation}) => {
    const renderItem = ({item}) => (<WishlistDetail movie={item} navigation={navigation}/>)
    return(
        <>
            <HStack 
                px={28}
                alignItems="center" justifyContent="space-between"
            >
                <Text fontSize={20}>我的片單</Text>
                <AntDesign name="right" color="#F4F4F4" size={20}/>
                
            </HStack>
            <FlatList 
                horizontal={true}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.title}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginLeft: 21, marginTop: 25, marginBottom: 40
                }}
            />
        </>
    );
};

export default Wishlist;