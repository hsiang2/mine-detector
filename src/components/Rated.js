import React from "react";
import { Box, Text } from "native-base";

const Rated = ({rated}) => {
    let darkColor;
    let lightColor;
    if(rated == "普0+") {
        darkColor = {bgColor: "#BCBD8BA3"};
        lightColor = {bgColor: "#C6CE87"};
    } else if (rated == "護6+") {
        darkColor = {bgColor: "#B2D6FF99"};
        lightColor = {bgColor: "#A0B8CF91"};
    } else if (rated == "輔12+") {
        darkColor = {bgColor: "#FFDA7BB2"};
        lightColor = {bgColor: "#DFC87C"};
    } else if (rated == "輔15+") {
        darkColor = {bgColor: "#D99F3E99"};
        lightColor = {bgColor: "#ED9E1999"};
    } else if (rated == "限18+") {
        darkColor = {bgColor: "#D93E3E73"};
        lightColor = {bgColor: "#E1121280"};
    }
    return(
        <Box 
            justifyContent="center"
            alignItems="center"
            w={53} h={22} borderRadius={12}
            _dark={darkColor}
            _light={lightColor}
        >
            <Text 
                fontSize={12} letterSpacing={0.2}
                color="white"
            >
                {rated}
            </Text>
        </Box>
    )
}

export default Rated;