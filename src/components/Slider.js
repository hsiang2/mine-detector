import React from "react";
import { Box, HStack, useColorMode, Image } from "native-base";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

import CustomLabel from "../components/CustomLabel";

const Slider = ({visible}) => {
    const {colorMode} = useColorMode();
    const [sliderOneChanging, setSliderOneChanging] = React.useState(false);
    const [sliderOneValue, setSliderOneValue] = React.useState([0]);
    const sliderOneValuesChangeStart = () => setSliderOneChanging(true);
    const sliderOneValuesChange = values => setSliderOneValue(values);
    const sliderOneValuesChangeFinish = () => setSliderOneChanging(false);

    return(
        <HStack alignItems="center" display={visible}>
            <MultiSlider 
                values={sliderOneValue}
                sliderLength={240} 
                onValuesChangeStart={sliderOneValuesChangeStart}
                onValuesChange={sliderOneValuesChange}
                onValuesChangeFinish={sliderOneValuesChangeFinish}
                step={0.5}
                customMarker={({pressed})=>
                    <Box 
                        shadowColor="#E7F9FD"
                        shadowOffset={{width: 1, height:1}}
                        shadowOpacity={pressed? 0.5: 0}
                        shadowRadius={2}
                    >
                        <Image 
                            w={6} h={pressed? 8: 6} //borderRadius={50}
                            alt="marker"
                            source={{uri: pressed? "https://github.com/hsiang2/movie_image/blob/main/Group%202.png?raw=true":"https://github.com/hsiang2/movie_image/blob/main/米奇img.png?raw=true"}}
                        />
                    </Box>
                }
                customLabel={CustomLabel}
                enableLabel={true}
                trackStyle={{backgroundColor: "#C4C4C4B2", borderRadius: 3, height: 3}}
                selectedStyle={{
                    backgroundColor: colorMode=="dark"?"#FFDA7B": "#D99F3E"
                }}
                containerStyle={{marginLeft: 10}}
            />
            <Image w={5} h={5} ml={1.5} source={{uri: "https://github.com/hsiang2/movie_image/blob/main/ic_cheese.png?raw=true"}} alt="cheese"/>
        </HStack>
    );

    
}

export default Slider;