import React, { useState, useEffect } from "react";
import { Text, Box, ScrollView, Image, useColorMode, Center } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { SvgUri } from "react-native-svg";
import AppLoading from "expo-app-loading";
import { useFonts, Asap_400Regular } from "@expo-google-fonts/asap";
import { useDispatch, useSelector } from "react-redux";

import { selectInfo, readUserAsync } from "../redux/accountSlice";
import accountData from "../json/account.json"
import FavoriteActorList from "../components/FavoriteActorList";
import Wishlist from "../components/Wishlist";
import Background from "../components/Background";


const AccountScreen = ({navigation}) => {
    const { colorMode } = useColorMode();
    const { width } = Dimensions.get("window");
    const info = useSelector(selectInfo);
    
    const [name, setName] = useState();
    const [avatar, setAvatar] = useState();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(readUserAsync());
     }, [])
     useEffect(() => {
        setName(info.name)
        setAvatar(info.avatar)
     }, [info]);

    // let [fontsLoaded] = useFonts({
    //     Asap_400Regular
    // });
    // if (!fontsLoaded) {
    //     return <AppLoading />
    // }
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
                    <Image 
                        w={90} h={90} mb={4} borderRadius={50}
                        source={{uri: avatar}}
                        alt="avatar"
                    />
                    <Text 
                        fontSize={16}
                        _dark={{color: "#F2F1F1"}} 
                        _light={{color: "#445B6C"}}
                        letterSpacing={0.2}
                        //fontFamily= "Asap_400Regular"
                    >
                        {name}
                    </Text>
                </Box>
                <Box mt={84}>
                    <Wishlist navigation={navigation}/>
                </Box>
                
                <FavoriteActorList data={accountData.favoriteActors}/>  
            </ScrollView>
        </SafeAreaView>
    );
}

export default AccountScreen;