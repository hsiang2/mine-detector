import React from "react";
import { Text, Box, useColorMode } from "native-base";
import Background from "../components/Background";

const RankingsScreen = () => {
    const { colorMode } = useColorMode();
    return(
        <Box flex={1} alignItems="center" justifyContent="center" 
        style={{backgroundColor: colorMode == 'dark'? "#181B2A": "#ffffff"}}
        >
            <Background />
            <Text fontSize={20}>排行榜</Text>
        </Box>
    )
}

export default RankingsScreen;