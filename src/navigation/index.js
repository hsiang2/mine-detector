import React from "react";
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
            <Tab.Screen name='Home' component={MovieStack} />
            <Tab.Screen name='Rankings' component={RankingsScreen} />
            <Tab.Screen name='Search' component={SearchScreen} />
            <Tab.Screen name='Account' component={AccountScreen} />
        </Tab.Navigator>
    );
}

const MovieStack = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Movie"
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

export default Navigation;