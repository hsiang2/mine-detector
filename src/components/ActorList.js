import React from "react";
import { FlatList } from "native-base";
import ActorDetail from "./ActorDetail";

const ActorList = ({data}) => {
    const renderItem = ({item}) => (<ActorDetail actor={item}/>)
    return(
        <FlatList 
            contentContainerStyle={{marginLeft: 27, marginTop: 36, marginBottom: 32}}
            horizontal={true}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.title}
            showsHorizontalScrollIndicator={false}
        />
    );
};

export default ActorList;