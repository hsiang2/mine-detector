import React from "react";
import { Dimensions } from "react-native";
import { SvgUri } from "react-native-svg";

const DarkBackground = () => {
    const { width, height } = Dimensions.get("window");
    return(
        <SvgUri 
            width={width} height={height} style={{zIndex: -1, elevation: -1, position: "absolute"}} 
            uri="https://raw.githubusercontent.com/hsiang2/movie_image/9823cc6dabc3796ab1e4b19f334bf62567d87a86/bg_dark.svg"
        />
    );
}

export default DarkBackground;