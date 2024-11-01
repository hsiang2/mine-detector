import React, { useCallback, useState } from "react";
import { BlurView } from "expo-blur";
import { Box, HStack, Text, Image, useColorMode } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import AppLoading from "expo-app-loading";
import { useFonts, Asap_400Regular } from "@expo-google-fonts/asap";

import Star from "./Star";

const Comment = ({comment, isLarge}) => {
    const { colorMode } = useColorMode();
    const width = isLarge? 329: 293;
    const mr = isLarge? null: 25;
    const mb = isLarge? 5: null;
    const color = isLarge? 
        colorMode=="dark"?["#A1BAD01B","#A1BAD01B", "#A1BAD01B", "#9FB0BE00"]:
        ["#44BFDA1B", "#A1BAD000"]:
        colorMode=="dark"?["#C6DEF41B","#365F8310", "#A1BAD015"]:
        ["#E7F9FD", "#F3FCFEFC", "#FFFFFF", "#F1FCFE70", "#E7F9FD"];
    const locations = isLarge?
        colorMode=="dark"?[0, 0.0001, 0.4844, 1]:[0, 1]:
        colorMode=="dark"?[0.0073, 0.4687,0.9341]:[0, 0.276, 0.5573, 0.8073, 1];
    const end = isLarge? {x:0, y: 1}: {x: 1, y: 0}

    const [textShown, setTextShown] = useState(false);
    //const [lengthMore, setlengthMore] = useState(false);
    //const [ loadMore, setLoadMore ] = useState(false);
    const [ numOfLines, setNumOfLines ] = useState(0);

    const onTextLayout = useCallback(e => {
        if(numOfLines == 0) setNumOfLines(e.nativeEvent.lines.length);
        //setlengthMore(e.nativeEvent.lines.length > 1)
    });
    const toggleNumberOfLines = () => {
        setTextShown(!textShown);
    }
    //console.log(lengthMore);
    // let [fontsLoaded] = useFonts({
    //     Asap_400Regular
    // });
    // if (!fontsLoaded) {
    //     return <AppLoading />
    // }

    return(
        <Box 
            w={width} /*h={167}*/ borderWidth={1} mr={mr} mb={mb}
             borderRadius={5} 
            _dark={{borderColor: "#6477888C"}}
            _light={{borderColor: "#BFE1E980"}}
        >
            <BlurView 
                intensity={20}
                style={{
                    flex: 1, 
                    justifyContent: "space-between"
                }}
            >
                <LinearGradient 
                    colors= {color}
                    start= {{x: 0, y: 0}}
                    end= {end}
                    locations={locations}
                    style={{flex: 1, padding: 14}}
                >
                    <HStack>
                        <Image 
                            h={45} w={45} mr={14} borderRadius={50}
                            source={{uri: comment.avatar}}
                            alt="avatar"
                        />
                        <Box>
                            <Text
                                letterSpacing={0.2}
                                _dark={{color: "#E8E8E8"}}
                                _light={{color: "#243243"}}
                                //fontFamily= "Asap_400Regular"
                            >
                                {comment.user}
                            </Text>
                            <Star star={comment.star}/>
                        </Box>
                    </HStack>
                    <Text 
                        flex={1}
                        /*height={60}*/ my={4} fontSize={12}
                        letterSpacing={0.2}
                        _dark={{color: "#B7B7B7"}}
                        _light={{color: "#808080"}}
                        onTextLayout={onTextLayout}
                        //numberOfLines={textShown? undefined: 1}
                        numberOfLines={numOfLines == 0? null:textShown? numOfLines: 5}
                        //numberOfLines={5}
                        //ellipsizeMode="end"
                    >
                        {comment.content}
                    </Text>
                    {
                        (numOfLines > 5) &&
                        <Text 
                            onPress={toggleNumberOfLines}
                            alignSelf="flex-end"
                            fontSize={12}
                            _dark={{color: "#989898"}}
                            _light={{color: "#A8A8A8"}}
                        >{textShown? "隱藏":"顯示更多"}</Text>
                        // lengthMore ? <Text 
                        //     onPress={toggleNumberOfLines}
                        //     alignSelf="flex-end"
                        //     fontSize={12}
                        //     _dark={{color: "#989898"}}
                        //     _light={{color: "#A8A8A8"}}
                        // >{textShown? "隱藏":"顯示更多"}</Text>:null
                    }
                    <Text 
                        fontSize={12} letterSpacing={0.5}
                        _dark={{color: "#989898"}}
                        _light={{color: "#A8A8A8"}}
                        //fontFamily= "Asap_400Regular"
                    >
                        {comment.date}
                    </Text>
                </LinearGradient>
            </BlurView>
        </Box>
        
    );
    
}

export default Comment;