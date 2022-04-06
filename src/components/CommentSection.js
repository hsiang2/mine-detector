import React from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view'
import CommentSectionDetail from "./CommentSectionDetail";

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

    return(
        <TabView 
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
        />
    );
}

export default CommentSection;