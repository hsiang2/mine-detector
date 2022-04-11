import React from "react";
import { Text, Image, Box, HStack } from "native-base";

const ActorDetail = ({actor}) => {
    return(
        <HStack mr={29}>
            <Box 
                bgColor="#E8E8E833" pl={3} pr={12} 
                borderLeftRadius={8} borderRightRadius={50}
                height={39} justifyContent="center"
            >
                <Text 
                    letterSpacing={0.2}
                    fontSize={12} mb={-0.5}
                    _dark={{color: "#F2F1F1"}}
                    _light={{color: "#243243"}}
                >
                    {actor.title}
                </Text>
                <Text 
                    letterSpacing={0.2}
                    fontSize={12}
                    _dark={{color: "#B9B9B9"}}
                    _light={{color: "#959595"}}
                >
                    {actor.role}
                </Text>
            </Box>
            <Image 
                h={39} w={39}
                source={{uri: actor.image}}
                alt="actor"
                position="absolute"
                right={0}
            />
        </HStack>
    );
};

export default ActorDetail;