import React from "react";
import { HStack, Box, Text } from "native-base";


const MovieInfo = ({data, title}) => {
    return(
        <HStack>
            <Box 
                mr={1.5} borderRadius={3} w={1.5} h={35}
                _dark={{bgColor: "#5E7B8D"}}
                _light={{bgColor: "#B3C1D1A6"}}
            ></Box>
            <Box>
                <Text 
                    fontSize={12} letterSpacing={0.2}
                    _dark={{color: "#F2F1F1"}}
                    _light={{color: "#243243"}}
                >
                    {title}
                </Text>
                <Text
                     fontSize={12} letterSpacing={0.5}
                     _dark={{color: "#CCCCCC"}}
                     _light={{color: "#959595"}}
                >
                    {data}
                </Text>
            </Box>
        </HStack>
    );
}

export default MovieInfo;