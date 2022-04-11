import React from "react";
import { ScrollView, Box, StatusBar, useColorMode } from "native-base";
import MovieList from "../components/MovieList";
import movieData from "../json/movie.json"
import MovieCarousel from "../components/MovieCarousel";
import mainMovieData from "../json/mainMovie.json"
import { SafeAreaView } from "react-native";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import Background from "../components/Background";

const HomeScreen = ({navigation}) => {
    const { colorMode } = useColorMode();
    return(
        <SafeAreaView style={{backgroundColor: colorMode == 'dark'? "#181B2A": "#ffffff"}}>
            <Background />
            <ScrollView>
                <Box pt={17} pb={2.5} mb={10}>
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
