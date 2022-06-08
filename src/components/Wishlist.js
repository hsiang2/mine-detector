import React from "react";
import { Center, FlatList, HStack, Text, useColorMode,Image } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign"
import { useSelector } from "react-redux";
//import { selectWatchlist } from "../redux/accountSlice";
import WishlistDetail from "./WishlistDetail";
import { selectInfo } from "../redux/accountSlice";

const Wishlist = ({data, navigation}) => {
    const {colorMode} = useColorMode();
    const { watchlist } = useSelector(selectInfo);
    //const watchlist = useSelector(selectWatchlist);
    const renderItem = ({item}) => (<WishlistDetail movie={item} navigation={navigation}/>)
    return (
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
                    我的片單
                </Text>
                <AntDesign name="right" color= {colorMode =="dark"?"#F4F4F4":"#445B6C"} size={20}/>
                
            </HStack>
            {
                (watchlist.length == 0)? 
                <Center h={130}>
                    <Image 
                        w={77} h={50} alt="logo" opacity={0.5}
                        source={{uri: "https://github.com/hsiang2/movie_image/blob/main/rat-grey.png?raw=true"}}
                    />
                    <Text 
                        fontSize={12}
                        _dark={{color: "#989898"}}
                        _light={{color: "#A8A8A8"}}
                    >尚無片單</Text>
                </Center>:
                <FlatList 
                    horizontal={true}
                    data={watchlist}
                    //data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.title}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginLeft: 24, marginTop: 25, marginBottom: 40, paddingRight: 24
                }}
            />
            }
            
        </>
    );
};

export default Wishlist;