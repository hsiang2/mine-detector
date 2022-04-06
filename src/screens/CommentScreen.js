import React, { Component } from "react";
// import SegmentedControl from "@react-native-segmented-control/segmented-control"; 
import SegmentedControlTab from "react-native-segmented-control-tab"
import { Box, ScrollView, Text } from "native-base";
import CommentList from "../components/CommentList";

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
            <Box>
                <SegmentedControlTab 
                    values={['無雷區', '有雷區']}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleIndexChange}
                />
                {
                    this.state.selectedIndex === 0 ?
                    <CommentList isSpoiler={false}/>:
                    <CommentList isSpoiler={true}/>
                }
            </Box>
        );
    }

};

export default CommentScreen;