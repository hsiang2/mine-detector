import React from "react";
import { Text, Box } from "native-base";
import { ImageBackground } from "react-native";
import { BlurView } from "expo-blur";
import AppLoading from "expo-app-loading";
import { useFonts, Asap_400Regular } from "@expo-google-fonts/asap";

const FavoriteActorDetail = ({actor}) => {
    const firstName = actor.title.slice(0, actor.title.indexOf(' '));
    const lastName = actor.title.slice(actor.title.indexOf(' ')+1);
    // let [fontsLoaded] = useFonts({
    //     Asap_400Regular
    // });
    // if (!fontsLoaded) {
    //     return <AppLoading />
    // }
    return(
        <Box mr={5}>
            <ImageBackground 
                source={{uri: actor.image}}
                style={{
                    height: 118, width: 88, 
                    borderRadius: 5, overflow: "hidden",
                    justifyContent: "flex-end",
                    
                }}
            >
                
                <BlurView intensity={45} style={{height: 34, paddingHorizontal: 7, paddingTop: 4}}>
                    <Text 
                        fontSize={12} 
                        color= "#E8E8E8"
                        letterSpacing={0.2}
                        //fontFamily="Asap_400Regular"
                        lineHeight={13}
                        numberOfLines={2}
                    >
                        {firstName}{"\n"}{lastName}
                    </Text>
                </BlurView>
            </ImageBackground>
        </Box>
    );
};

export default FavoriteActorDetail;