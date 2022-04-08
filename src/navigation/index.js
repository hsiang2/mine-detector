import React from "react";
import { Pressable, Text } from "native-base";
import { NavigationContainer, TabActions } from '@react-navigation/native' 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import CommentScreen from "../screens/CommentScreen";
import RankingsScreen from "../screens/RankingsScreen";
import SearchScreen from "../screens/SearchScreen";
import AccountScreen from "../screens/AccountScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
    return(
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}

const MyTabs = () => {
    return(
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerShown: false
            })}
        >
            <Tab.Screen name='HomePage' component={MovieStack} />
            <Tab.Screen name='RankingsPage' component={RankingsScreen} />
            <Tab.Screen name='SearchPage' component={SearchScreen} />
            <Tab.Screen name='AccountPage' component={AccountStack} />
        </Tab.Navigator>
    );
}

const MovieStack = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen 
                name="Detail"
                component={DetailScreen}
            />
            <Stack.Screen 
                name="Comment"
                component={CommentScreen}
            /> 
        </Stack.Navigator>
    );
}

const AccountStack = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Account"
                component={AccountScreen}
            /> 
            <Stack.Screen 
                name="Detail"
                component={DetailScreen}
            />
            <Stack.Screen 
                name="Comment"
                component={CommentScreen}
            /> 
        </Stack.Navigator>
        
    )
}

export default Navigation;