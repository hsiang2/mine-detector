import React from "react";
import { useColorMode } from "native-base";
import { Dimensions } from "react-native";
import { SvgUri } from "react-native-svg";

const Background = () => {
    const { colorMode } = useColorMode();
    const { width, height } = Dimensions.get("window");
    const darkuri = "https://raw.githubusercontent.com/hsiang2/movie_image/9823cc6dabc3796ab1e4b19f334bf62567d87a86/bg_dark.svg"
    const lighturi = "https://raw.githubusercontent.com/hsiang2/movie_image/5c5ccabe3512e6510721ff07393c3be3b1ecc330/淺色背景.svg";
    return(
        <SvgUri 
            width={width} height={height} style={{zIndex: -1, elevation: -1, position: "absolute"}} 
            uri={colorMode == 'dark' ? darkuri: lighturi}
        />
    );
}

export default Background;