import 'react-native-gesture-handler';
import React from "react";
import { Pressable, StatusBar, Text, useColorMode, Box, KeyboardAvoidingView } from "native-base";
import { NavigationContainer, useNavigation } from '@react-navigation/native' 
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from "react-redux";

import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import CommentScreen from "../screens/CommentScreen";
import RankingsScreen from "../screens/RankingsScreen";
import SearchScreen from "../screens/SearchScreen";
import AccountScreen from "../screens/AccountScreen";
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AuthScreen from '../screens/AuthScreen';
import { selectLogin, selectInfo } from '../redux/accountSlice';
import EditScreen from '../screens/EditScreen';
import SettingScreen from '../screens/SettingScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
    const { colorMode } = useColorMode();
    const login = useSelector(selectLogin);
    //console.log(login.hasLogin);
     //const info = useSelector(selectInfo)
     //console.log(info);

     return (
          <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.select({ ios: 0, android: -500 })}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            flex={1}
          >
            {
              !login.hasLogin
              ? <AuthScreen />
              : (
                <NavigationContainer>
                    <StatusBar
                        barStyle={ colorMode == "dark"? "light-content": "dark-content"}
                    />
                    <MyTabs />
                </NavigationContainer>          
              )
            }
          </KeyboardAvoidingView>
      );


    // return login? (
    //     <NavigationContainer>
    //         <StatusBar
    //             barStyle={ colorMode == "dark"? "light-content": "dark-content"}
    //         />
    //         <MyTabs />
    //         {/* <StatusBar
    //             barStyle={ colorMode == "dark"? "light-content": "dark-content"}
    //         />
    //         <MyTabs /> */}
    //     </NavigationContainer>
    // ) : (
    //     <NavigationContainer>
    //         <LoginStack />
    //     </NavigationContainer>
    // );
}

const LoginStack = () => {
    const navigation = useNavigation();
    return(
        <Stack.Navigator>
            <Stack.Screen 
                options={{headerShown: false}}
                name='Login' component={LoginScreen}
            />
            <Stack.Screen 
                options={{ 
                    headerTransparent: true, title: null, 
                    headerLeft: () => (
                        <AntDesign 
                            name="left" style={{marginLeft: 26}}
                            size={24} color="#FFF8E8"
                            onPress={()=> navigation.goBack()}
                    />)
                }}
                name='Register' component={RegisterScreen}
            />
        </Stack.Navigator>
    )
} 

const MyTabs = () => {
    const { colorMode } = useColorMode();
    return(
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarStyle: { position: 'absolute', borderTopWidth: 0 },
                tabBarBackground: () => (
                    <>
                        <BlurView 
                            tint={colorMode == "dark"? "dark": "light"} 
                            intensity={60} style={StyleSheet.absoluteFill} 
                        />
                        <Box
                            flex={1}
                            _light={{backgroundColor: "#E7F9FD"}}
                            _dark={{backgroundColor: "#2A3B4B"}}
                            opacity={0.5}
                        ></Box>
                    </>
                ),
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === 'HomePage') {
                        iconName = 'home-outline';
                    } else if (route.name === 'RankingsPage') {
                        iconName = 'trophy-outline'
                    } else if (route.name === 'SearchPage') {
                        iconName = 'search'
                    } else if (route.name === 'AccountPage') {
                        iconName = 'person-outline'
                    }
                    return <Ionicons name={iconName} color={color} size={size}/>
                },
                tabBarActiveTintColor: colorMode == 'dark'?'#FFDA7B': "#D99F3E",
                tabBarInactiveTintColor: colorMode == 'dark'?'#CCCCCC': "#A4A4A4",
                tabBarLabel: ({focused, color, size}) => {
                    let labelName;
                    if (route.name === 'HomePage') {
                        labelName = '首頁';
                    } else if (route.name === 'RankingsPage') {
                        labelName = '排行榜'
                    } else if (route.name === 'SearchPage') {
                        labelName = '搜尋'
                    } else if (route.name === 'AccountPage') {
                        labelName = '帳戶'
                    }
                    return <Text fontSize={10} color={color} letterSpacing={0.2}>{labelName}</Text>
                },
            })}
        >
            <Tab.Screen name='HomePage' component={MovieStack} 
                //options={{unmountOnBlur: true}}
                //listeners={({navigation}) => ({blur: () => navigation.setParams({ screen: undefined })})}
            />
            <Tab.Screen name='RankingsPage' component={RankingsScreen} />
            <Tab.Screen name='SearchPage' component={SearchScreen} />
            <Tab.Screen name='AccountPage' component={AccountStack} />
        </Tab.Navigator>
    );
}


const MovieStack = ({navigation}) => {
    const {colorMode} = useColorMode();
    return(
        <Stack.Navigator
            screenOptions={{
                headerTransparent: true,
            }}
        >
            <Stack.Screen 
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    
                    
                }}
            />
            <Stack.Screen 
                name="Detail"
                component={DetailScreen}
                options={{
                    //unmountOnBlur: true,
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.goBack()}
                            mr={4}
                        >
                            <AntDesign 
                                name="closecircleo"  size={24}
                                color={colorMode=="dark"? "#EDF0F5": "#243243"}
                            />
                        </Pressable>
                    ),
                    headerLeft: () => null,
                    title: null,
                    presentation:"modal"
                    
                }}
            />
            <Stack.Screen 
                name="Comment"
                component={CommentScreen}
                options={{
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.goBack()}
                            mr={4}
                        >
                            <AntDesign 
                                name="closecircleo" size={24}
                                color={colorMode=="dark"? "#EDF0F5": "#243243"}
                            />
                        </Pressable>
                    ),
                    headerLeft: () => null,
                    title: null,
                    presentation:"modal"
                }}
            /> 
        </Stack.Navigator>
    );
}

const AccountStack = ({navigation}) => {
    const {colorMode} = useColorMode();
    return(
        <Stack.Navigator
            screenOptions={{
                headerTransparent: true
            }}
        >
            <Stack.Screen 
                name="Account"
                component={AccountScreen}
                options={{
                    headerRight: () => (    
                        <AntDesign 
                            name="setting" size={24} 
                            color={colorMode=="dark"? "#EDF0F5": "#243243"}
                            style={{paddingTop: 20, paddingRight: 16}}
                            onPress={() => navigation.navigate('Setting')}
                        />
                    ),
                    title: null,
                }}
            /> 
            <Stack.Screen 
                name='Setting'
                component={SettingScreen}
                options={{
                    title: "設定",
                    headerTintColor: colorMode=="dark"? "#EDF0F5": "#243243",
                    headerLeft: () => (
                        <AntDesign 
                            name="left" size={24}
                            style={{marginLeft: 16}}
                            color={colorMode=="dark"? "#EDF0F5": "#243243"}
                            onPress={()=> navigation.navigate('Account')}
                    />)
                }}
            />
             <Stack.Screen 
                name='Edit'
                component={EditScreen}
                options={{
                    title: "編輯資料",
                    headerTintColor: colorMode=="dark"? "#EDF0F5": "#243243",
                    headerLeft: () => (
                        <AntDesign 
                            name="left" size={24}
                            style={{marginLeft: 16}}
                            color={colorMode=="dark"? "#EDF0F5": "#243243"}
                            onPress={()=> navigation.navigate('Setting')}
                    />)
                }}
            />
            <Stack.Screen 
                name="Detail"
                component={DetailScreen}
                options={{
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate('Account')}
                            mr={4}
                        >
                            <AntDesign 
                                name="closecircleo" size={24}
                                color={colorMode=="dark"? "#EDF0F5": "#243243"}
                            />
                        </Pressable>
                    ),
                    headerLeft: () => null,
                    title: null,
                    presentation:"modal"
                }}
            />
            <Stack.Screen 
                name="Comment"
                component={CommentScreen}
                options={{
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate('Account')}
                            mr={4}
                        >
                            <AntDesign 
                                name="closecircleo" size={24}
                                color={colorMode=="dark"? "#EDF0F5": "#243243"}
                            />
                        </Pressable>
                    ),
                    headerLeft: () => null,
                    title: null,
                    presentation:"modal"
                }}
            /> 
        </Stack.Navigator>
        
    )
}

export default Navigation;