import React, { Component, useEffect, useState } from "react";
// import SegmentedControl from "@react-native-segmented-control/segmented-control"; 
import SegmentedControlTab from "react-native-segmented-control-tab"
import { Box, Center, HStack, ScrollView, Text, useColorMode, Image, View,Pressable, Input, KeyboardAvoidingView } from "native-base";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
// import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Dimensions, TextInput, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import CommentList from "../components/CommentList";
import Background from "../components/Background";
import Slider from "../components/Slider";

// import CustomLabel from "../components/CustomLabel";

const CommentScreen = ({route}) => {
    const {isSpoiler} = route.params;
    const [customStyleIndex, setCustomStyleIndex] = isSpoiler?useState(1): useState(0);
    const handleCustomIndexSelect = (index) => {
        setCustomStyleIndex(index);
    };
    const {colorMode} = useColorMode();
    const { width, height } = Dimensions.get("window");
    const tabBarHeight = useBottomTabBarHeight();
    // const insets = useSafeAreaInsets();
    // const [sliderOneChanging, setSliderOneChanging] = React.useState(false);
    // const [sliderOneValue, setSliderOneValue] = React.useState([0]);
    // const sliderOneValuesChangeStart = () => setSliderOneChanging(true);
    // const sliderOneValuesChange = values => setSliderOneValue(values);
    // const sliderOneValuesChangeFinish = () => setSliderOneChanging(false);

    const [inputComponent, setInputComponent] = React.useState(<Slider />);
    const [isSlider, setIsSlider] = React.useState(true);

    return(
        <KeyboardAvoidingView
            behavior= { Platform.OS == 'ios' ? "padding": "height"}
            flex={1}
        >
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
                <ScrollView>
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
                    <Center mb={tabBarHeight+66}>
                        {
                            customStyleIndex === 0 ?
                                <CommentList isSpoiler={false}/>:
                                <CommentList isSpoiler={true}/>
                        }
                        
                    </Center>
                        
                </ScrollView>
                <BlurView 
                    tint={colorMode == "dark"? "dark": "light"} 
                    intensity={60} style={{ position: "absolute",
                    bottom: tabBarHeight, height: 66, width: width}} 
                />
                <Box
                    position="absolute"
                    bottom={tabBarHeight}
                    _dark={{backgroundColor: "#2A3B4B80"}} 
                    _light={{backgroundColor: "#E7F9FD80"}}
                    h={66} w={width} pt={2}
                >
                    <HStack justifyContent="space-between" px={5} alignItems="center">
                        <Pressable
                            onPress={()=>{
                                if(isSlider){

                                    setInputComponent(
                                        <HStack alignItems="center"  w={280} height={50}>
                                            <Input 
                                                variant="rounded"
                                                placeholder= "輸入評論..."
                                                w="100%"
                                                px={4}
                                                multiline
                                                //mx={3} //w="75%" //maxWidth="280px"
                                            />
                                        </HStack>
                                    )
                                }else {
                                    setInputComponent(<Slider />)
                                }
                                setIsSlider(!isSlider);
                            }}
                        >
                            <Ionicons 
                                name={ isSlider? "chatbubble-ellipses-sharp": "arrow-back-circle" }
                                color={colorMode=="dark"? "#EDF0F5": "#5A7D9D"} size={21} 
                                //style={{marginRight: 10}}
                            />
                        </Pressable>
                        {inputComponent}
                        <Ionicons name="send" color={colorMode=="dark"?"#EDF0F5": "#5A7D9D"} size={21}/>
                    </HStack>
                </Box>
            </SafeAreaView>
        </KeyboardAvoidingView>
        
    );
}

export default CommentScreen;