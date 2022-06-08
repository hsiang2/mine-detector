import React, {useState, useEffect} from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { useColorMode } from "native-base";
import CommentSectionDetail from "./CommentSectionDetail";
import { doc, onSnapshot } from "firebase/firestore";
import { Box, FlatList, Text, Pressable } from "native-base";
import Comment from "./Comment";
import { db } from "../api/firebase";

const CommentSection = ({navigation, movie}) => {
    const [index, setIndex] = React.useState(0);
    const renderItem = ({item}) => (<Comment comment={item} isLarge={false}/>);
    const [data, setData] = useState([]);
    const [spoilerData, setSpoilerData] = useState([]);
    
    useEffect( () => {
        //console.log("hi");
        const unsubscribe = onSnapshot(doc(db, "comments", movie), (doc) => {
            
                if(doc.data().spoiler){
                    const comment = doc.data().spoiler
                    setSpoilerData(comment)
                } 
           
                if(doc.data().noSpoiler){
                    
                    const comment = doc.data().noSpoiler
                    setData(comment)
                } 

        });
        return (() => { unsubscribe();})
    }, [])
    const CommentRoute = () => (
        <Box flex={1} >
            <Pressable 
                mt={15} mb={18} mr={30} alignItems="flex-end" 
                onPress={() => navigation.navigate('Comment', {isSpoiler: false, movie})}
            >
                <Text 
                    fontSize={14} letterSpacing={0.2}
                    _dark={{color: "#FFDA7B"}}
                    _light={{color: "#D99F3E"}}
                >
                    查看更多
                </Text>
            </Pressable>
            <FlatList 
                horizontal={true}
                data={data.slice(0, 3)}
                renderItem={renderItem}
                keyExtractor={item => item.date + item.user}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: 22
                }}
            />
        </Box>
    );
    const SpoilerCommentRoute = () => (
        <Box flex={1} >
            <Pressable 
                mt={15} mb={18} mr={30} alignItems="flex-end" 
                onPress={() => navigation.navigate('Comment', {isSpoiler: true, movie})}
            >
                <Text 
                    fontSize={14} letterSpacing={0.2}
                    _dark={{color: "#FFDA7B"}}
                    _light={{color: "#D99F3E"}}
                >
                    查看更多
                </Text>
            </Pressable>
            <FlatList 
                horizontal={true}
                data={spoilerData.slice(0, 3)}
                renderItem={renderItem}
                keyExtractor={item => item.date + item.user}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: 22
                }}
            />
        </Box>
    );
    const renderScene = SceneMap({
        comment: CommentRoute,
        spoilerComment: SpoilerCommentRoute,
    }); 

    
    const [routes] = React.useState([
        { key: 'comment', title: '無雷區'},
        { key: 'spoilerComment', title: '有雷區'},
    ]);
    
    const layout = useWindowDimensions();
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