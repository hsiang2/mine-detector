import React from "react";
import { ScrollView, Box, useColorMode } from "native-base";
import { SafeAreaView, Dimensions } from "react-native";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";

import Background from "../components/Background";
import MovieList from "../components/MovieList";
import movieData from "../json/movie.json"
import MovieCarousel from "../components/MovieCarousel";
import mainMovieData from "../json/mainMovie.json"

const HomeScreen = ({navigation}) => {
    const { colorMode } = useColorMode();
    const { width } = Dimensions.get("window");
    const color = colorMode=="dark"? 
            ["#0C0C150F", "#0C0C0E33", "#030508A6"]:
            ["#F0F0F046", "#F1F1F111", "#0C0C0E1C", "#EEEEEE81"];
    const location = colorMode=="dark"? [0, 0.7553, 1]: [0, 0.3385, 0.7353, 1]
    return(
        <SafeAreaView style={{backgroundColor: colorMode == 'dark'? "#181B2A": "#ffffff"}}>
            <Background />
            <ScrollView>
                <LinearGradient
                    colors= {color}
                    locations={location}
                    style={{width: width, height: 397, position: "absolute"}}
                    pointerEvents="none"
                />
                <Box pt={17} pb={2.5} mb={10} zIndex={-1}>
                    <MovieCarousel data={mainMovieData} navigation={navigation}/>
                </Box>
                <BottomTabBarHeightContext.Consumer>
                    {tabBarHeight => (
                        <Box mb={tabBarHeight}>
                            {movieData.map( data => {
                                return (
                                    <MovieList 
                                        key={data.title}
                                        data={data}
                                        navigation={navigation}
                                    />
                                );
                            })}
                        </Box>
                    )}
                </BottomTabBarHeightContext.Consumer>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
