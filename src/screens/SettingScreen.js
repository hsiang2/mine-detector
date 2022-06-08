import React from "react";
import { Text, Box, useColorMode, Center, HStack, Button, Pressable } from "native-base";
import { SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Toggle from 'react-native-toggle-element'
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Background from "../components/Background";
import { signOut } from "../redux/accountSlice";

const SettingScreen = ({navigation}) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const color = colorMode == "dark"? 
            ["#38425870", "#384258", "#38425854"]:
            ["#CAE8EE", "#E2F1F4", "#EEF7F9", "#F7F7F7"]
    const location = colorMode == "dark"?
            [0, 0.0001, 1]: [0, 0, 0.4948, 1]
    
    return(
        <SafeAreaView style={{backgroundColor: colorMode == 'dark'? "#181B2A": "#ffffff", flex: 1}}>
            <Background />
            {/* <Text 
                _dark={{color: "#F4F4F4"}}
                _light={{color: "#445B6C"}}
                fontSize={20}
                letterSpacing={0.2}
                mt={5}
                mb={100}
                alignSelf="center"

            >
                設定
            </Text> */}
            
            <Pressable
                shadowOffset= {{width: 0, height: 4}}
                shadowRadius= {5}
                _dark={{
                    shadowColor: "#2D3E4E", shadowOpacity: 0.62
                }}
                _light={{ shadowColor: "#DDDDDD", shadowOpacity: 1}}
                mb={10} mt={150}
                width={330} alignSelf= "center"
                onPress={() => navigation.navigate('Edit')}
            >
                <LinearGradient
                    colors={color}
                    locations={location}
                    start= {{x: 0, y: 0}}
                    end= {{x: 1, y: 0}}
                    style={{
                        height: 73,
                        borderRadius: 5,
                        overflow: "hidden",
                        justifyContent: "center",
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
                        >編輯資料</Text>
                        <AntDesign name="right" color= {colorMode =="dark"?"#F4F4F4":"#445B6C"} size={20}/>
                    </HStack>
                </LinearGradient>
            </Pressable>
            <Box
                shadowOffset= {{width: 0, height: 4}}
                shadowRadius= {5}
                _dark={{
                    shadowColor: "#2D3E4E", shadowOpacity: 0.62
                }}
                _light={{ shadowColor: "#DDDDDD", shadowOpacity: 1}}
                mb={10}
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
                                value={colorMode == "dark"? true: false}
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
            </Box>
            <Pressable
                shadowOffset= {{width: 0, height: 4}}
                shadowRadius= {5}
                _dark={{
                    shadowColor: "#2D3E4E", shadowOpacity: 0.62
                }}
                _light={{ shadowColor: "#DDDDDD", shadowOpacity: 1}}
                width={330} alignSelf= "center"
                onPress={() => dispatch(signOut())}
            >
                <LinearGradient
                    colors={color}
                    locations={location}
                    start= {{x: 0, y: 0}}
                    end= {{x: 1, y: 0}}
                    style={{
                        height: 73,
                        borderRadius: 5,
                        overflow: "hidden",
                        justifyContent: "center"
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
                        >登出</Text>
                        <AntDesign name="logout" color= {colorMode =="dark"?"#F4F4F4":"#445B6C"} size={20}/>
                    </HStack>
                    
                </LinearGradient>
            </Pressable>
        </SafeAreaView>
    )
}

export default SettingScreen;