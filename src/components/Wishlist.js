import React from "react";
import { FlatList, HStack, Text } from "native-base";
import WishlistDetail from "./WishlistDetail";

const Wishlist = ({data, navigation}) => {
    const renderItem = ({item}) => (<WishlistDetail movie={item} navigation={navigation}/>)
    return(
        <>
            <HStack>
                <Text>我的片單</Text>
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

export default Wishlist;