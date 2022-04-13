import React, { Component, useEffect, useState } from "react";
// import SegmentedControl from "@react-native-segmented-control/segmented-control"; 
import SegmentedControlTab from "react-native-segmented-control-tab"
import { Box, Center, HStack, ScrollView, Text, useColorMode, Image, View } from "native-base";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Dimensions, TextInput } from "react-native";

import CommentList from "../components/CommentList";
import Background from "../components/Background";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import CustomLabel from "../components/CustomLabel";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const CommentScreen = (props) => {
    const [customStyleIndex, setCustomStyleIndex] = useState(0);
    const handleCustomIndexSelect = (index) => {
        setCustomStyleIndex(index);
    };
    const {colorMode} = useColorMode();
    const { width, height } = Dimensions.get("window");
    const tabBarHeight = useBottomTabBarHeight();
    const insets = useSafeAreaInsets();
    const [sliderOneChanging, setSliderOneChanging] = React.useState(false);
    const [sliderOneValue, setSliderOneValue] = React.useState([0]);
    const sliderOneValuesChangeStart = () => setSliderOneChanging(true);
    const sliderOneValuesChange = values => setSliderOneValue(values);
    const sliderOneValuesChangeFinish = () => setSliderOneChanging(false);

    return(
        <SafeAreaView backgroundColor={colorMode=="dark"? "#181B2A": "#ffffff"} flex={1}> 
            <Background />
            <Box 
                w={343} h={8} p={0.5}  mt={14} alignSelf="center"
                borderRadius={9} borderWidth={1}
                justifyContent="center" alignItems="center"
                _dark={{borderColor: "#ffffff"}}
                _light={{borderColor: "#5A7D9D"}}
            >
                <SegmentedControlTab 
                    values={['無雷區', '有雷區']}
                    selectedIndex={customStyleIndex}
                    onTabPress={handleCustomIndexSelect}
                    tabStyle={{backgroundColor: "transparent", borderWidth: 0, borderColor: "transparent"}}
                    borderRadius={7}
                    activeTabStyle={{
                        borderRadius: 7, backgroundColor: colorMode=="dark"? "#E7E4E4": "#5A7D9DB3"
                    }}
                    activeTabTextStyle={{color: colorMode=="dark"? "#151520": "#F9F9F9", fontSize: 13}}
                    tabTextStyle={{color: colorMode=="dark"? "#E7E4E4": "#BCBCBC", fontSize: 13}}
                />
            </Box>
            <ScrollView >
                <HStack justifyContent="space-between" alignItems="center" py={23} px={10}>
                    <Text 
                        fontSize={24}
                        letterSpacing={0.2}
                        _dark={{color: "#EDF0F5"}}
                        _light={{color: "#445B6C"}}
                    >
                        評論區
                    </Text>
                    <HStack alignItems="center">
                        <Text fontSize={16} color="#B9B9B9" mr={1} letterSpacing={0.2}>
                            排序
                        </Text>
                        <AntDesign name="down" color="#B9B9B9" size={14}/>
                    </HStack>
                </HStack>
                <Center>
                    {
                        customStyleIndex === 0 ?
                            <CommentList isSpoiler={false}/>:
                            <CommentList isSpoiler={true}/>
                    }
                    
                </Center>
                    
            </ScrollView>
            <Box bgColor="#2A3B4B" h={66} mb={tabBarHeight-insets.bottom} pt={3}>
                <HStack justifyContent="space-between" px={5} alignItems="center">
                    <Pressable
                    >
                        <Ionicons name="chatbubble-ellipses-sharp" color="#EDF0F5" size={21} style={{marginRight: 10}}/>
                    </Pressable>
                    <HStack alignItems="center">
                        <MultiSlider 
                            values={sliderOneValue}
                            sliderLength={240} 
                            onValuesChangeStart={sliderOneValuesChangeStart}
                            onValuesChange={sliderOneValuesChange}
                            onValuesChangeFinish={sliderOneValuesChangeFinish}
                            step={0.5}
                            customMarker={({pressed})=>
                                <Box 
                                    shadowColor="#E7F9FD"
                                    shadowOffset={{width: 1, height:1}}
                                    shadowOpacity={pressed? 0.5: 0}
                                    shadowRadius={2}
                                >
                                    <Image 
                                        w={6} h={pressed? 8: 6} //borderRadius={50}
                                        alt="marker"
                                        source={{uri: pressed? "https://github.com/hsiang2/movie_image/blob/main/Group%202.png?raw=true":"https://github.com/hsiang2/movie_image/blob/main/米奇img.png?raw=true"}}
                                    />
                                </Box>
                            }
                            customLabel={CustomLabel}
                            enableLabel={true}
                            trackStyle={{backgroundColor: "#C4C4C4B2", borderRadius: 3, height: 3}}
                            selectedStyle={{backgroundColor: "#FFDA7B"}}
                        />
                        <Image w={5} h={5} ml={1.5} source={{uri: "https://github.com/hsiang2/movie_image/blob/main/ic_cheese.png?raw=true"}} alt="cheese"/>
                    </HStack>
                    
                    <Ionicons name="send" color="#EDF0F5" size={21}/>
                </HStack>
            </Box>
        </SafeAreaView>
    );
}

export default CommentScreen;