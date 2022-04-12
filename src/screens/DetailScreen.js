import React, { useState } from "react";
import { Box, HStack, Image, ScrollView, Text, useColorMode } from "native-base";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import ActorList from "../components/ActorList";
import CommentSection from "../components/CommentSection";
import Background from "../components/Background";
import Star from "../components/Star";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable } from "react-native";
import MovieInfo from "../components/MovieInfo";
import Rated from "../components/Rated";

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
    const [isPressed, setIsPressed] = useState(false);
    return(
        <SafeAreaView style={{backgroundColor: colorMode == 'dark'? "#181B2A": "#ffffff"}}>
            <Background />
            <ScrollView>
                <Box>
                    <Image h={179} mt={14} mx={5} source={{uri: image}} alt="movie"/>
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
                        {/* <Box 
                            justifyContent="center"
                            alignItems="center"
                            w={53} h={22} borderRadius={12}
                            _dark={{bgColor: "#B2D6FF99"}}
                            _light={{bgColor: "#A0B8CF"}}
                        >
                            <Text 
                                fontSize={12} letterSpacing={0.2}
                                color="white"
                            >
                                {rated}
                            </Text>
                        </Box> */}
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
                            <Pressable onPress={() => setIsPressed(!isPressed)}>
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
                            <CommentSection navigation={navigation}/>
                        </Box>
                    )}
                </BottomTabBarHeightContext.Consumer>
            </ScrollView>
        </SafeAreaView>
        
    );
}

export default DetailScreen;