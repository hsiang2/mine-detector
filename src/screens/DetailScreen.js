import React from "react";
import { Box, HStack, Image, ScrollView, Text } from "native-base";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";

import ActorList from "../components/ActorList";
import CommentSection from "../components/CommentSection";
import DarkBackground from "../components/DarkBackground";
import Star from "../components/Star";
import { SafeAreaView } from "react-native-safe-area-context";

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
    return(
        <SafeAreaView style={{backgroundColor: "#181B2A"}}>
            <DarkBackground />
            <ScrollView>
                <Box>
                    <Image h={179} mt={49} mx={4} source={{uri: image}} alt="movie"/>
                    <HStack mt={47} mb={52} mx={5} justifyContent="space-between">
                        <HStack space={1.5}>
                            {genres.map(genre => {
                                return (
                                    <Box 
                                        justifyContent="center"
                                        alignItems="center"
                                        w={53} h={22} borderRadius={12}
                                        bgColor="#C4C4C433" key={genre}
                                    >
                                        <Text fontSize={12}>{genre}</Text>
                                    </Box>
                                );
                            })}
                        </HStack>
                        <Box 
                            justifyContent="center"
                            alignItems="center"
                            w={53} h={22} borderRadius={12}
                            bgColor="#B2D6FF99" 
                        >
                            <Text fontSize={12}>{rated}</Text>
                        </Box>
                    </HStack>
                    <Box mx={27}>
                        <Text mb={1} fontSize={24}>{title}</Text>
                        <Star star={star.toFixed(1)}/>
                        <Text mt={2} mb={30} fontSize={16}>{plot}</Text>
                        <HStack>
                            <Box mr={1.5} bgColor="#5E7B8D" borderRadius={3} w={1.5} h={35}>
                            </Box>
                            <Box>
                                <Text fontSize={12}>影片時長</Text>
                                <Text fontSize={12}>{runtime}</Text>
                            </Box>
                            <Box ml={49}mr={1.5} bgColor="#5E7B8D" borderRadius={3} w={1.5} h={35}>
                            </Box>
                            <Box>
                                <Text fontSize={12}>上映日期</Text>
                                <Text fontSize={12}>{released}</Text>
                            </Box>
                            <Box ml={49}mr={1.5} bgColor="#5E7B8D" borderRadius={3} w={1.5} h={35}></Box>
                            <Box>
                                <Text fontSize={12}>觀看平台</Text>
                                <Text fontSize={12}>{platform}</Text>
                            </Box>
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