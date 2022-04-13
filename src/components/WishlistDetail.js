import React from "react";
import { Pressable, Box, Image, Text, HStack, useColorMode } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { shadowColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const WishlistDetail = ({movie, navigation}) => {
    const {colorMode} = useColorMode();
    const color = colorMode == "dark"? 
            ["#38425870", "#384258", "#38425854"]:
            ["#CAE8EE", "#E2F1F4", "#EEF7F9", "#F7F7F7"]
    const location = colorMode == "dark"?
            [0, 0.0001, 1]: [0, 0, 0.4948, 1]

    return(
        <Pressable
            onPress={() => navigation.navigate('Detail', movie)}
            mr= {5}
            shadowOffset= {{width: 0, height: 4}}
            shadowRadius= {3}
            _dark={{
                shadowColor: "#2D3E4E", shadowOpacity: 0.62
            }}
            _light={{ shadowColor: "#DDDDDD", shadowOpacity: 1}}
            
        >
            {/* <BlurView 
                    intensity={44} 
                    style={{ 
                        height: 100, marginRight: 20,
                        padding: 17, borderRadius: 5, overflow: "hidden"
                    }}
            > */}
            <LinearGradient
                colors= {color}
                start= {{x: 0, y: 0}}
                end= {{x: 1, y: 0}}
                locations={location}
                style={{ 
                    height: 100,
                    padding: 17, borderRadius: 5, overflow: "hidden",
                }}
            >
                <HStack 
                    flex={1} 
                    alignItems= "center" justifyContent="space-between"
                >
                    <Box>
                        <Text 
                            fontSize={20} mb={1}
                            letterSpacing={0.2}
                            _dark={{color: "#F4F5F9"}}
                            _light={{color: "#445B6C"}}
                        >
                            {movie.title}
                        </Text>
                        <Text 
                            fontSize={12}
                            letterSpacing={0.5}
                            _dark={{color: "#DDDFE6"}}
                            _light={{color: "#767676"}}
                        >
                            {movie.runtime}
                        </Text>
                    </Box>
                    <Image 
                        borderRadius={8}
                        ml={70}
                        h={60} w={60}
                        source={{uri: movie.poster}}
                        alt="movie"
                    />
                </HStack>
            </LinearGradient>
                
            {/* </BlurView> */}
            
        </Pressable>
    );
};

export default WishlistDetail;