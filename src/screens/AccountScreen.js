import React, { useState } from "react";
import { Text, Box, ScrollView, Image, StatusBar, Switch, HStack, useColorMode, Center } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import { SvgUri } from "react-native-svg";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import Toggle from 'react-native-toggle-element'

import accountData from "../json/account.json"
import FavoriteActorList from "../components/FavoriteActorList";
import Wishlist from "../components/Wishlist";
import DarkBackground from "../components/DarkBackground";
import { BlurView } from "expo-blur";


const AccountScreen = ({navigation}) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [ toggleValue, settoggleValue] = useState(true)
    const { width, height } = Dimensions.get("window");
    return(
        <SafeAreaView style={{backgroundColor: "#181B2A"}}>
            <DarkBackground />
            <ScrollView>
                <Center>
                    <SvgUri 
                        style={{position: "relative"}}
                        width={358} height={331}
                        uri="https://raw.githubusercontent.com/hsiang2/movie_image/2160daa3c3c74e255b3a0a526a556e8923e854ef/弧形背景.svg"
                    />
                </Center>
                {/* <AntDesign 
                    name="setting" color="#EDF0F5" size={24} 
                    style={{position: "absolute", right: 40, top: 20}}
                /> */}
                <Box 
                    left={(width - 90)/2} top={259}
                    style={{position: "absolute"}}
                >
                    <Image 
                        w={90} h={90} mb={4}
                        source={{uri: accountData.user.avatar}}
                        alt="avatar"
                    />
                    <Text>{accountData.user.name}</Text>
                </Box>
                <Box mt={84}>
                    <Wishlist data={accountData.wishlist} navigation={navigation}/>
                </Box>
                
                <FavoriteActorList data={accountData.favoriteActors}/>
                <BottomTabBarHeightContext.Consumer>
                    {tabBarHeight => (
                        <BlurView 
                            intensity={44} 
                            style={{
                                marginBottom: tabBarHeight,
                                height: 73,
                                width: 330,
                                alignSelf: "center",
                                borderRadius: 5,
                                overflow: "hidden"
                            }}>
                            <HStack flex={1} px={18} 
                                alignItems="center" 
                                justifyContent="space-between"
                            >
                                <Text fontSize={20}>深色模式</Text>
                                <HStack alignItems="center" space={3}>
                                    <Text fontSize={12}>開啟</Text>
                                    <Toggle
                                        value={true}
                                        onPress={toggleColorMode}
                                        thumbActiveComponent={
                                            <Box justifyContent="center" alignItems="center" w={27} h={27} >
                                                <MaterialCommunityIcons name="weather-night" size={16} color="#243243"/>
                                            </Box>
                                        }
                                        thumbInActiveComponent={
                                            <Box justifyContent="center" alignItems="center" w={27} h={27}>
                                                <Ionicons name="partly-sunny-outline" size={16} color="#EDF0F5"/>
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
                        </BlurView>
                            
                    )}
                </BottomTabBarHeightContext.Consumer>
                
            </ScrollView>
        </SafeAreaView>
    );
}

export default AccountScreen;