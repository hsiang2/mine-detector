import { Image, Pressable } from "native-base";
import React from "react";
import { useWindowDimensions } from "react-native"
import Carousel from "react-native-snap-carousel";
import { Component } from "react/cjs/react.production.min";

const MovieCarousel = ({data, navigation}) => {
    const layout = useWindowDimensions();
    const renderItem = ({item}) => {
        return(
            <Pressable 
                onPress={() => navigation.navigate('Detail',item)}
            >
                <Image 
                    borderRadius={5}
                    w={250} h={370}
                    source={{uri: item.poster}}
                    alt="movie"
                />
            </Pressable>
        );
    }
    return (
        <Carousel 
            data={data}
            renderItem={renderItem}
            sliderWidth={layout.width}
            itemWidth={250}
            loop={true}
        />
    );
}

export default MovieCarousel;