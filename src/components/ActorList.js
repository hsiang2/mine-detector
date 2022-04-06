import React from "react";
import { FlatList, Text } from "native-base";
import ActorDetail from "./ActorDetail";

const ActorList = ({data}) => {
    const renderItem = ({item}) => (<ActorDetail actor={item}/>)
    return(
        <>
            <Text>{data.title}</Text>
            <FlatList 
                horizontal={true}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.title}
                showsHorizontalScrollIndicator={false}
            />
        </>
    );
};

export default ActorList;