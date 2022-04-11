import React from "react";
import { Text, Image, Box, HStack, useColorMode } from "native-base";
import { LinearGradient } from "expo-linear-gradient";

const ActorDetail = ({actor}) => {
    const {colorMode} = useColorMode();
    return(
        <HStack mr={29}>
            <Box  h={39} borderLeftRadius={8} borderRightRadius={50} overflow="hidden">
                <LinearGradient
                    colors= {colorMode=="dark"? ["#E8E8E833"]: ["#D5E9F2", "#F5EFEF"]}
                    start= {{x: 0, y: 0}}
                    end= {{x: 1, y: 0}}
                    //colors= {["#FF4747", "#479CFF", "#FF4747"]}
                    style={{
                        flex: 1,
                        paddingLeft: 12,
                        paddingRight: 48,
                        // borderLeftRadius: 8,
                        // borderRightRadius: 50,
                         justifyContent: "center"
                    }}
                >
                    <Text 
                        letterSpacing={0.2}
                        fontSize={12} mb={-0.5}
                        _dark={{color: "#F2F1F1"}}
                        _light={{color: "#243243"}}
                    >
                        {actor.title}
                    </Text>
                    <Text 
                        letterSpacing={0.2}
                        fontSize={12}
                        _dark={{color: "#B9B9B9"}}
                        _light={{color: "#959595"}}
                    >
                        {actor.role}
                    </Text>
                </LinearGradient>
            </Box>
            {/* <Box 
                bgColor="#E8E8E833" pl={3} pr={12} 
                borderLeftRadius={8} borderRightRadius={50}
                height={39} justifyContent="center"
            > */}
                
            {/* </Box> */}
            <Image 
                h={39} w={39}
                source={{uri: actor.image}}
                alt="actor"
                position="absolute"
                right={0}
            />
        </HStack>
    );
};

export default ActorDetail;