import React, { Component, useEffect, useState } from "react";
// import SegmentedControl from "@react-native-segmented-control/segmented-control"; 
import SegmentedControlTab from "react-native-segmented-control-tab"
import { Box, Center, HStack, ScrollView, Text, useColorMode } from "native-base";
import AntDesign from 'react-native-vector-icons/AntDesign'
import CommentList from "../components/CommentList";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../components/Background";

const CommentScreen = (props) => {

    const [customStyleIndex, setCustomStyleIndex] = useState(0);
    const handleCustomIndexSelect = (index) => {
        setCustomStyleIndex(index);
    };
    const {colorMode} = useColorMode();

    return(
        <SafeAreaView backgroundColor={colorMode=="dark"? "#181B2A": "#ffffff"}>
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
                <HStack justifyContent="space-between" alignItems="center" my={23} px={10}>
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
                <Center mb={150}>
                    {
                        customStyleIndex === 0 ?
                            <CommentList isSpoiler={false}/>:
                            <CommentList isSpoiler={true}/>
                    }
                </Center>
            </ScrollView>                      
        </SafeAreaView>
    );
}

export default CommentScreen;