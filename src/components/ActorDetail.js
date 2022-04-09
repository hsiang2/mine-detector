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
                <Text fontSize={12} mb={-0.5}>{actor.title}</Text>
                <Text fontSize={12}>{actor.role}</Text>
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