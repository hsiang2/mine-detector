import React, { Component } from "react";
// import SegmentedControl from "@react-native-segmented-control/segmented-control"; 
import SegmentedControlTab from "react-native-segmented-control-tab"
import { Box, Center, HStack, ScrollView, Text } from "native-base";
import AntDesign from 'react-native-vector-icons/AntDesign'
import CommentList from "../components/CommentList";
import { SafeAreaView } from "react-native-safe-area-context";
import DarkBackground from "../components/DarkBackground";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

// const CommentScreen = () => {
//     return(
//         // <SegmentedControl 
//         //     values={['無雷區', '有雷區']}
//         //     selectedIndex={this.state.selectedIndex}
//         //     onChange={(event) => {
//         //         this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
//         //     }}
//         // />
//         <Box></Box>
//     );
// }

class CommentScreen extends Component {
    constructor() {
        super();
        this.state= {
            selectedIndex: 0
        };
    }

    handleIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index
        });
    };

    render() {
        return(
            <SafeAreaView style={{backgroundColor: "#181B2A"}}>
                <DarkBackground />
                <Box mt={65} px={23} mb={108}>
                    <Box 
                        w={343} h={8} p={0.5} borderColor= "#E7E4E4" 
                        borderRadius={9} borderWidth={1}
                        justifyContent="center" alignItems="center"
                    >
                        <SegmentedControlTab 
                            values={['無雷區', '有雷區']}
                            selectedIndex={this.state.selectedIndex}
                            onTabPress={this.handleIndexChange}
                            tabStyle={{backgroundColor: "transparent", borderWidth: 0, borderColor: "#151520"}}
                            borderRadius={7}
                            activeTabStyle={{
                                borderRadius: 7, backgroundColor: "#E7E4E4",
                            }}
                            activeTabTextStyle={{color: "#151520", fontSize: 13}}
                            tabTextStyle={{color: "#E7E4E4", fontSize: 13}}
                        />
                    </Box>
                    <ScrollView>
                        <HStack justifyContent="space-between" alignItems="center" my={23} px={3}>
                            <Text fontSize={24}>評論區</Text>
                            <HStack alignItems="center">
                                <Text fontSize={16} color="#B9B9B9" mr={1}>排序</Text>
                                <AntDesign name="down" color="#B9B9B9" size={14}/>
                            </HStack>
                        </HStack>
                        <Center>
                            {
                                this.state.selectedIndex === 0 ?
                                <CommentList isSpoiler={false}/>:
                                <CommentList isSpoiler={true}/>
                            }
                        </Center>
                    </ScrollView>
                    
                </Box>
                
            </SafeAreaView>
        );
    }

};

export default CommentScreen;