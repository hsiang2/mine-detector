import React from "react";
import { Text, Box, ScrollView, Image, StatusBar, Switch, HStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorMode } from "native-base";
import accountData from "../json/account.json"
import FavoriteActorList from "../components/FavoriteActorList";

import Wishlist from "../components/Wishlist";

const AccountScreen = ({navigation}) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return(
        <ScrollView>
            <Box>
                <Image 
                    w={90} h={90}
                    source={{uri: accountData.user.avatar}}
                    alt="avatar"
                />
                <Text>{accountData.user.name}</Text>
            </Box>
            <Wishlist data={accountData.wishlist} navigation={navigation}/>
            <FavoriteActorList data={accountData.favoriteActors}/>
            <HStack>
                <Text>深色模式</Text>
                <Switch 
                    name="Dark Mode"
                    isChecked={colorMode==="dark"}
                    onToggle={toggleColorMode}
                    accessibilityLabel="display-mode"
                    accessibilityHint="light or dark mode"
                />
            </HStack>
        </ScrollView>
    );
}

export default AccountScreen;