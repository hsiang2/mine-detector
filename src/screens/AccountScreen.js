import React, { useState, useEffect } from "react";
import { Text, Box, ScrollView, Image, HStack, useColorMode, Center, Button } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import { SvgUri } from "react-native-svg";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import Toggle from 'react-native-toggle-element'
import AppLoading from "expo-app-loading";
import { useFonts, Asap_400Regular } from "@expo-google-fonts/asap";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
//import { signOut } from "firebase/auth";

import { selectInfo, /*selectWatchlist*/ readUserAsync, updateUserAsync } from "../redux/accountSlice";
//import { auth, db } from "../../App";
import { /*logout,*/signOut, setAccountInfo } from "../redux/accountSlice";
import accountData from "../json/account.json"
import FavoriteActorList from "../components/FavoriteActorList";
import Wishlist from "../components/Wishlist";
import Background from "../components/Background";


const AccountScreen = ({navigation}) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { width } = Dimensions.get("window");
    const color = colorMode == "dark"? ["#DDDDDD19", "#F0F3F525"]:["#F2F9FE", "#E8F0F5"];
    const location = colorMode == "dark"? [0,1]: [0.0073, 0.9907];
    const info = useSelector(selectInfo);
    

    //const watchlist = useSelector(selectWatchlist);
    
   // const info = useSelector(selectInfo);
    //console.log(info.avatar);
    const [name, setName] = useState();
    //const [email, setEmail] = useState();
    const [avatar, setAvatar] = useState();
    //console.log(`"${info.avatar}"`);

    const dispatch = useDispatch();
    // const onSignOut = () => {
    //     signOut(auth);
    //     dispatch(logout());
    // };
    useEffect(() => {
        dispatch(readUserAsync());
     }, [])
     useEffect(() => {
        setName(info.name)
        //setEmail(info.email)
        setAvatar(info.avatar)
     }, [info]);

    let [fontsLoaded] = useFonts({
        Asap_400Regular
    });
    if (!fontsLoaded) {
        return <AppLoading />
    }
    return(
        <SafeAreaView style={{backgroundColor: colorMode == 'dark'? "#181B2A": "#ffffff", flex: 1}}>
            <Background />
            <ScrollView>
                <Center>
                    <SvgUri 
                        //style={{position: "relative"}}
                        
                        width={390} height={206.03}
                        uri={colorMode=="dark"?
                            "https://raw.githubusercontent.com/hsiang2/movie_image/7778a4730db5ec467ac3132bea85af1840d228e2/dark.svg":
                            "https://raw.githubusercontent.com/hsiang2/movie_image/7778a4730db5ec467ac3132bea85af1840d228e2/light.svg"}
                        opacity={colorMode=="dark"?1:0.3}
                    />
                </Center>
                <Box 
                    left={(width - 90)/2} top={117}
                    style={{position: "absolute"}}
                    alignItems="center"
                >
                    {/* {
                        (info.avatar != null)?
                        <Image 
                            w={90} h={90} mb={4} borderRadius={50}
                            //source={{uri: avatar}}
                            source={{uri: info.avatar}}
                            alt="avatar"
                        />: null
                    } */}
                    <Image 
                        w={90} h={90} mb={4} borderRadius={50}
                        //source={{uri: avatar}}
                        source={{uri: avatar}}
                        alt="avatar"
                    />
                    <Text 
                        fontSize={16}
                        _dark={{color: "#F2F1F1"}} 
                        _light={{color: "#445B6C"}}
                        letterSpacing={0.2}
                        fontFamily= "Asap_400Regular"
                    >
                        {name}
                    </Text>
                </Box>
                <Box mt={84}>
                    <Wishlist /*data={info.watchlist} /*data={accountData.wishlist}*/ navigation={navigation}/>
                </Box>
                
                <FavoriteActorList data={accountData.favoriteActors}/>
                
                    
                        {/* <Box
                            shadowOffset= {{width: 0, height: 4}}
                            shadowRadius= {5}
                            _dark={{
                                shadowColor: "#2D3E4E", shadowOpacity: 0.62
                            }}
                            _light={{ shadowColor: "#DDDDDD", shadowOpacity: 1}}
                            mb={4}
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
                                    </HStack>
                                </HStack>
                            </LinearGradient>    
                        </Box> */}
                {/* <BottomTabBarHeightContext.Consumer>
                    {tabBarHeight => (
                        <Button marginBottom= {tabBarHeight}
                            //onPress={() => onSignOut()}
                            onPress={() => dispatch(signOut())}
                        >
                            登出
                        </Button>
                    )}
                </BottomTabBarHeightContext.Consumer> */}
                
            </ScrollView>
        </SafeAreaView>
    );
}

export default AccountScreen;