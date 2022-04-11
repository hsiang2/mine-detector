import React from "react";
import { Text, Box, useColorMode } from "native-base";
import Background from "../components/Background";

const SearchScreen = () => {
    const { colorMode } = useColorMode();
    return(
        <Box flex={1} alignItems="center" justifyContent="center"
        style={{backgroundColor: colorMode == 'dark'? "#181B2A": "#ffffff"}}
        >
            <Background />
            <Text fontSize={20}>搜尋</Text>
        </Box>
    )
}

export default SearchScreen;