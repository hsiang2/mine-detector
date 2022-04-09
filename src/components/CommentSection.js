import React from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { Box } from "native-base";
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
    const renderTabBar = props => (
        <TabBar 
            {...props}
            style={{ 
                backgroundColor: 'transparent', 
                marginLeft: 24, marginRight: 9, 
                borderColor: "#B9B9B9", borderBottomWidth: 1,
            }}
            tabStyle={{width: 80}}
            activeColor="#E0DAA4" inactiveColor="#B9B9B9"
            labelStyle={{fontSize: 15}}
            indicatorStyle={{
                backgroundColor: "#E0DAA4", height: 6, borderRadius: 3, 
                position: "absolute", bottom: -3
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