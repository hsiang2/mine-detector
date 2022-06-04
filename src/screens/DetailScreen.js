import React, { useEffect, useState } from "react";
import { Box, HStack, Image, ScrollView, Text, useColorMode } from "native-base";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
//import { doc, updateDoc } from "firebase/firestore";

import ActorList from "../components/ActorList";
import CommentSection from "../components/CommentSection";
import Background from "../components/Background";
import Star from "../components/Star";
import MovieInfo from "../components/MovieInfo";
import Rated from "../components/Rated";
//import { db, auth } from "../../App";
//import { addWatchlist,removeWatchlist, selectWatchlist } from "../redux/accountSlice";


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
    const { colorMode } = useColorMode();
    //const watchlist = useSelector(selectWatchlist);
    const [isPressed, setIsPressed] = useState(false);
        // () => {
        //     const isSaved = (element) => {
        //         return element.title === route.params.title;
        //     }
        //     if(watchlist.find(isSaved) === undefined){
        //         console.log("沒看過");
        //         return false
        //     } else {
        //         console.log("看過");
        //         return true
        //     }
        // });
    //const watchlistRef = doc(db, "users", auth.currentUser.uid);
    
    // const dispatch = useDispatch();
    // useEffect(async () => {
    //     await updateDoc(watchlistRef, {
    //         watchlist
    //     }).then(() => {
    //         const isSaved = (element) => {
    //             return element.title === route.params.title;
    //         }
    //         if(watchlist.find(isSaved) === undefined){
    //             //console.log("沒看過");
    //             setIsPressed(false);
    //         } else {
    //             //console.log("看過");
    //             setIsPressed(true);
    //         }
    //     })
    // }, [watchlist])


    return(
        <SafeAreaView style={{backgroundColor: colorMode == 'dark'? "#181B2A": "#ffffff"}}>
            <Background />
            <ScrollView>
                <Box>
                    <Image h={179} mt={14} mx={5} source={{uri: image}} borderRadius={5} alt="movie"/>
                    <HStack mt={47} mb={52} mx={4} justifyContent="space-between">
                        <HStack space={1.5}>
                            {genres.map(genre => {
                                return (
                                    <Box 
                                        justifyContent="center"
                                        alignItems="center"
                                        w={53} h={22} borderRadius={12}
                                         key={genre}
                                        _dark={{bgColor: "#C4C4C433"}}
                                        _light={{borderColor: "#768DA1B3", borderWidth: 1}}
                                    >
                                        <Text 
                                            fontSize={12} letterSpacing={0.2}
                                            _dark={{color: "#CCCACA"}}
                                            _light={{color: "#768DA1"}}
                                        >
                                            {genre}
                                        </Text>
                                    </Box>
                                );
                            })}
                        </HStack>
                        <Rated rated={rated}/>
                    </HStack>
                    <Box mx={27}  pr={1.25}>
                        <HStack justifyContent="space-between" alignItems="flex-start">
                            <Box>
                                <Text 
                                    mb={1} fontSize={24} letterSpacing={0.2}
                                    _dark={{color: "#F2F1F1"}} _light={{color: "#124C7B"}}
                                >
                                    {title}
                                </Text>
                                <Star star={star.toFixed(1)}/>
                            </Box>
                            <Pressable onPress={() => {
                                if (isPressed){
                                    setIsPressed(false);
                                    //dispatch(removeWatchlist(route.params));
                        
                                    //console.log(route)
                                } else {
                                    setIsPressed(true);
                                    //dispatch(addWatchlist(route.params));
                                    //console.log(route)
                                }
                                // setIsPressed(!isPressed)
                                // isPressed?dispatch(addWatchlist(route))
                                // :dispatch(removeWatchlist(route))
                            }}>
                                < Ionicons 
                                    name={isPressed? "bookmark": "bookmark-outline"} 
                                    color={colorMode == "dark"?"#FFDA7B": "#D99F3ED9"}
                                    size={28} style={{paddingTop: 5}}
                                />
                            </Pressable>
                            
                        </HStack>
                        <Text 
                            mt={2} mb={30} fontSize={16} letterSpacing={1}
                            _dark={{color: "#B7B7B7"}} _light={{color: "#626262"}}
                        >
                            {plot}
                        </Text>
                        <HStack justifyContent="space-between">
                            <MovieInfo data={runtime} title="影片時長"/>
                            <MovieInfo data={released} title="上映日期"/>
                            <MovieInfo data={platform} title="觀看平台"/>
                        </HStack>    
                    </Box>
                    <ActorList data={actors}/>
                </Box>
                <BottomTabBarHeightContext.Consumer>
                    {tabBarHeight => (
                        <Box mb={tabBarHeight}>
                            <CommentSection navigation={navigation} movie={title}/>
                        </Box>
                    )}
                </BottomTabBarHeightContext.Consumer>
            </ScrollView>
        </SafeAreaView>
        
    );
}

export default DetailScreen;