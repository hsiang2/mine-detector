import { Image, Pressable } from "native-base";
import React from "react";
import { useWindowDimensions } from "react-native"
import Carousel from "react-native-snap-carousel";
import { Component } from "react/cjs/react.production.min";

// class MovieCarousel extends Component {
//     _renderItem = ({item, index}) => {
//         return(
//             <Pressable>
//                 <Image 

//                 />
//             </Pressable>
//         );
//     }

//     render () {
//         return(
//             <Carousel 
//                 ref={(c) => { this._carousel = c; }}
//                 data={this.state.entries}
//                 renderItem={this._renderItem}
//                 sliderWidth={sliderWidth}
//                 itemWidth={itemWidth}
//             />
//         );
//     }
// }

const MovieCarousel = ({data, navigation}) => {
    const layout = useWindowDimensions();
    const renderItem = ({item}) => {
        return(
            <Pressable 
                onPress={() => navigation.navigate('Detail',item)}
            >
                <Image 
                    w={250} h={370}
                    source={{uri: item.poster}}
                    alt="movie"
                />
            </Pressable>
        );
    }
    return (
        <Carousel 
            //ref={ref => { this._carousel = ref; }}
            data={data}
            renderItem={renderItem}
            sliderWidth={layout.width}
            itemWidth={250}
            loop={true}
        />
    );
}

export default MovieCarousel;