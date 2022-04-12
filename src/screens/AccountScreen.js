import React, { useState } from "react";
import { Text, Box, ScrollView, Image, StatusBar, Switch, HStack, useColorMode, Center } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, Pressable } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import { SvgUri } from "react-native-svg";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import Toggle from 'react-native-toggle-element'

import accountData from "../json/account.json"
import FavoriteActorList from "../components/FavoriteActorList";
import Wishlist from "../components/Wishlist";
import Background from "../components/Background";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";


const AccountScreen = ({navigation}) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [ toggleValue, settoggleValue] = useState(true)
    const { width, height } = Dimensions.get("window");
    const color = colorMode == "dark"? ["#DDDDDD19", "#F0F3F525"]:["#F2F9FE", "#E8F0F5"];
    const location = colorMode == "dark"? [0,1]: [0.0073, 0.9907];
    return(
        <SafeAreaView style={{backgroundColor: colorMode == 'dark'? "#181B2A": "#ffffff"}}>
            <Background />
            <ScrollView>
                <Center>
                    <SvgUri 
                        style={{position: "relative"}}
                        width={358} height={331}
                        uri={colorMode=="dark"?
                            "https://raw.githubusercontent.com/hsiang2/movie_image/2160daa3c3c74e255b3a0a526a556e8923e854ef/弧形背景.svg":
                            "https://raw.githubusercontent.com/hsiang2/movie_image/f67a625ab278e91b72d9debabe61a2f1e326c85b/淺弧形背景.svg"}
                    />
                </Center>
                <Box 
                    left={(width - 90)/2} top={259}
                    style={{position: "absolute"}}
                    alignItems="center"
                >
                    <Image 
                        w={90} h={90} mb={4}
                        source={{uri: accountData.user.avatar}}
                        alt="avatar"
                    />
                    <Text 
                        fontSize={16}
                        _dark={{color: "#F2F1F1"}} 
                        _light={{color: "#445B6C"}}
                        letterSpacing={0.2}
                    >
                        {accountData.user.name}
                    </Text>
                </Box>
                <Box mt={84}>
                    <Wishlist data={accountData.wishlist} navigation={navigation}/>
                </Box>
                
                <FavoriteActorList data={accountData.favoriteActors}/>
                <BottomTabBarHeightContext.Consumer>
                    {tabBarHeight => (
                        // <BlurView 
                        //     intensity={44} 
                        //     style={{
                        //         marginBottom: tabBarHeight,
                        //         height: 73,
                        //         width: 330,
                        //         alignSelf: "center",
                        //         borderRadius: 5,
                        //         overflow: "hidden"
                        //     }}>
                        <Box
                            shadowOffset= {{width: 0, height: 4}}
                            shadowRadius= {5}
                            _dark={{
                                shadowColor: "#2D3E4E", shadowOpacity: 0.62
                            }}
                            _light={{ shadowColor: "#DDDDDD", shadowOpacity: 1}}
                            marginBottom= {tabBarHeight}
                            width={330} alignSelf= "center"
                        >
                            <LinearGradient
                                colors={color}
                                locations={location}
                                start= {{x: 0, y: 0}}
                                end= {{x: 1, y: 0}}
                                style={{
                                    height: 73,
                                    borderRadius: 5,
                                    overflow: "hidden"
                                }}
                            >
                                <HStack flex={1} px={18} 
                                    alignItems="center" 
                                    justifyContent="space-between"
                                >
                                    <Text 
                                        fontSize={20} 
                                        _dark={{color: "#F4F4F4"}}
                                        _light={{color: "#445B6C"}}
                                        letterSpacing={0.2}
                                    >
                                        深色模式
                                    </Text>
                                    <HStack alignItems="center" space={3}>
                                        <Text 
                                            fontSize={12}
                                            _dark={{color: "#B9B9B9"}}
                                            _light={{color: "#626262"}}
                                            letterSpacing={0.2}
                                        >
                                            開啟
                                        </Text>
                                        <Toggle
                                            value={true}
                                            onPress={toggleColorMode}
                                            thumbActiveComponent={
                                                <Box justifyContent="center" alignItems="center" w={27} h={27} >
                                                    <Ionicons name="ios-moon" size={16} color="#243243"/>
                                                </Box>
                                            }
                                            thumbInActiveComponent={
                                                <Box justifyContent="center" alignItems="center" w={27} h={27}>
                                                    <Ionicons name="ios-sunny" size={16} color="#EDF0F5"/>
                                                </Box>
                                            }
                                            trackBar={{
                                                inActiveBackgroundColor: "transparent",
                                                activeBackgroundColor: "transparent",
                                                width: 51,
                                                height: 31,
                                                borderWidth: 1, 
                                                borderActiveColor: "#EDF0F5",
                                                borderInActiveColor: "#243243",
                                            }}
                                            thumbButton={{
                                                width: 27, height: 27, 
                                                activeBackgroundColor: "#EDF0F5", inActiveBackgroundColor: "#243243"
                                            }}
                                        />
                                        {/* <Switch 
                                            name="Dark Mode"
                                            value={true}
                                            isChecked={colorMode==="dark"}
                                            onToggle={toggleColorMode}
                                            accessibilityLabel="display-mode"
                                            accessibilityHint="light or dark mode"
                                        /> */}
                                    </HStack>
                                    
                                </HStack>
                            {/* </BlurView> */}
                            </LinearGradient>    
                        </Box>
                        
                    )}
                </BottomTabBarHeightContext.Consumer>
                
            </ScrollView>
        </SafeAreaView>
    );
}

export default AccountScreen;