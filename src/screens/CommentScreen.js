import React, { Component } from "react";
// import SegmentedControl from "@react-native-segmented-control/segmented-control"; 
import SegmentedControlTab from "react-native-segmented-control-tab"
import { Box, Center, ScrollView, Text } from "native-base";
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
                            tabStyle={{
                                backgroundColor: "transparent",
                                borderWidth: 0
                            }}
                            borderRadius={7}
                            tabsContainerStyle={{borderWidth: 0}}
                            tabsContainerDisableStyle={{borderWidth: 0}}
                            activeTabStyle={{
                                backgroundColor: "#E7E4E4",
                                borderRadius: 7,
                            }}
                            tabsContainerDisableStyle={{borderWidth:0}}
                            activeTabTextStyle={{
                                color: "#151520",
                            }}
                            tabTextStyle={{
                                color: "#E7E4E4",
                            }}
                        />
                    </Box>
                    
                    <Center>
                        {
                            this.state.selectedIndex === 0 ?
                            <CommentList isSpoiler={false}/>:
                            <CommentList isSpoiler={true}/>
                        }
                    </Center>
                </Box>
                
            </SafeAreaView>
        );
    }

};

export default CommentScreen;