import React, { useState } from "react";
import SegmentedControlTab from "react-native-segmented-control-tab"
import { Box, Center, HStack, ScrollView, Text, useColorMode, Image, View,Pressable, Input, KeyboardAvoidingView } from "native-base";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView, } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { BlurView } from "expo-blur";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux"; 

import CommentList from "../components/CommentList";
import Background from "../components/Background";
import Slider from "../components/Slider";
import { db } from "../api/firebase";
import { selectInfo } from "../redux/accountSlice";
import { selectSlider, setSlider } from "../redux/sliderSlice";

const CommentScreen = ({route}) => {
    const {isSpoiler, movie} = route.params;
    const [customStyleIndex, setCustomStyleIndex] = isSpoiler?useState(1): useState(0);
    const handleCustomIndexSelect = (index) => {
        setCustomStyleIndex(index);
    };
    const {colorMode} = useColorMode();
    const { width } = Dimensions.get("window");
    const tabBarHeight = useBottomTabBarHeight();

    const [isSlider, setIsSlider] = React.useState(true);
    const [sliderVisible, setSliderVisible]= React.useState('flex');
    const [inputVisible, setInputVisible]= React.useState('none');
    const [comment, setComment] = useState("");

    const { name, avatar } = useSelector(selectInfo);
    const slider = useSelector(selectSlider);
    const dispatch = useDispatch();
    
    const commentRef = doc(db, "comments", movie);
    const submit = () => {
        if(customStyleIndex===1) {
            setDoc(commentRef, { spoiler: arrayUnion({
                user: name, 
                star: slider[0].toFixed(1), 
                date: new Date().toLocaleString('zh-tw'),
                content: comment, 
                avatar: avatar}) }, {merge: true});
        } else {
            setDoc(commentRef, { noSpoiler: arrayUnion({
                user: name, 
                star: slider[0].toFixed(1), 
                date: new Date().toLocaleString('zh-tw'),
                content: comment, 
                avatar: avatar}) }, {merge: true});
        }
        dispatch(setSlider([0]));
        //dispatch(update());
        setComment("");
    }

    

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
                                <CommentList isSpoiler={false} movie={movie}/>:
                                <CommentList isSpoiler={true} movie={movie}/>
                        }
                        
                    </Center>
                        
                </ScrollView>
                <BlurView 
                    tint={colorMode == "dark"? "dark": "light"} 
                    intensity={60} style={{ position: "absolute",
                    bottom: tabBarHeight, /*height: 66,*/ width: width}} 
                />
                <Box
                    position="absolute"
                    bottom={tabBarHeight}
                    _dark={{backgroundColor: "#2A3B4BB3"}} 
                    _light={{backgroundColor: "#E7F9FDB3"}}
                    /*h={66}*/ w={width} pt={2}
                >
                    <HStack justifyContent="space-between" px={5} alignItems="center">
                        <Pressable
                            onPress={()=>{
                                if(isSlider){
                                    setSliderVisible('none');
                                    setInputVisible('flex');
                                }else {
                                    setSliderVisible('flex');
                                    setInputVisible('none');
                                }
                                setIsSlider(!isSlider);
                            }}
                        >
                            <Ionicons 
                                name={ isSlider? "chatbubble-ellipses-sharp": "arrow-back-circle" }
                                color={colorMode=="dark"? "#EDF0F5": "#5A7D9D"} size={21} 
                            />
                        </Pressable>
                        <Slider visible={sliderVisible}/>
                        <HStack alignItems="center"  w={280} /*height={50}*/ mr={2} my={2} display={inputVisible}>
                            <Input 
                                //variant="rounded"
                                //py={3}
                                borderRadius={50}
                                placeholder= "輸入評論..."
                                //h="90%"
                                w="100%"
                                px={4}
                                _focus={{borderColor: "#CAEAF1"}}
                                multiline
                                _light={{borderColor: "#5A7D9D", color: "#5A7D9D"}}
                                borderColor="#C4C4C4"
                                value={comment}
                                placeholderTextColor="#B9B9B9"
                                onChangeText={text => setComment(text)}
                            />
                            </HStack>
                        <Ionicons 
                            name="send" color={colorMode=="dark"?"#EDF0F5": "#5A7D9D"} size={21}
                            onPress={submit}
                        />
                    </HStack>
                </Box>
            </SafeAreaView>
    );
}

export default CommentScreen;