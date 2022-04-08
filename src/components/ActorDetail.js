import React from "react";
import { Text, Image, Box, HStack } from "native-base";

const ActorDetail = ({actor}) => {
    return(
        <HStack>
            <Box>
                <Text>{actor.title}</Text>
                <Text>{actor.role}</Text>
            </Box>
            <Image 
                h={39} w={39}
                source={{uri: actor.image}}
                alt="actor"
            />
        </HStack>
    );
};

export default ActorDetail;