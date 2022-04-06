import React from "react";
import { ScrollView } from "native-base";
import MovieList from "../components/MovieList";
import movieData from "../json/movie.json"

const HomeScreen = ({navigation}) => {
    return(
        <ScrollView>
            {movieData.map( data => {
                return (
                    <MovieList 
                        key={data.title}
                        data={data}
                        navigation={navigation}
                    />
                );
            })}
        </ScrollView>
    );
};

export default HomeScreen;
