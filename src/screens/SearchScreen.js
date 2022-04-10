import React from "react";
import { Text, Box } from "native-base";
import DarkBackground from "../components/DarkBackground";

const SearchScreen = () => {
    return(
        <Box flex={1} alignItems="center" justifyContent="center"
            style={{backgroundColor: "#181B2A"}}
        >
            <DarkBackground />
            <Text fontSize={20}>Search</Text>
        </Box>
    )
}

export default SearchScreen;