import React from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { Box, useColorMode } from "native-base";
import CommentSectionDetail from "./CommentSectionDetail";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const CommentSection = ({navigation}) => {
    const CommentRoute = () => (
        <CommentSectionDetail isSpoiler={false} navigation={navigation}/>
    );
    
    const SpoilerCommentRoute = () => (
        <CommentSectionDetail isSpoiler={true} navigation={navigation}/>
    );
    
    const renderScene = SceneMap({
        comment: CommentRoute,
        spoilerComment: SpoilerCommentRoute,
    }); 

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'comment', title: '無雷區'},
        { key: 'spoilerComment', title: '有雷區'},
    ]);
    const {colorMode} = useColorMode();

    const renderTabBar = props => (
        <TabBar 
            {...props}
            style={{ 
                backgroundColor: 'transparent', 
                marginLeft: 20, marginRight: 20, 
                borderBottomWidth: 1,
                borderColor: colorMode=="dark"? "#D3D3D366": "#D3D3D3"
            }}
            tabStyle={{width: 80}}
            activeColor={colorMode=="dark"?"#FFDA7B": "#D99F3E"} 
            inactiveColor={colorMode=="dark"?"#B9B9B9": "#858585"}
            labelStyle={{fontSize: 15, letterSpacing: 0.2}}
            indicatorStyle={{
                backgroundColor: colorMode=="dark"?"#FFDA7B":"#D99F3E8C", 
                height: 3, borderRadius: 3, 
                position: "absolute", bottom: -1.5
            }}
        />
    )
    return(
        <TabView 
            swipeEnabled={false}
            renderTabBar={renderTabBar}
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
            style={{height: 270}}
            
        />
    );
}

export default CommentSection;