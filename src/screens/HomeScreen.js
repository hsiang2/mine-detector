import React from "react";
import { ScrollView } from "native-base";
import MovieList from "../components/MovieList";
import movieData from "../json/movie.json"
import MovieCarousel from "../components/MovieCarousel";
import mainMovieData from "../json/mainMovie.json"

const HomeScreen = ({navigation}) => {
    return(
        <ScrollView>
            <MovieCarousel data={mainMovieData} navigation={navigation}/>
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
