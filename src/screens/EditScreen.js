import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-native";
import { ScrollView, FormControl, useColorMode, VStack, Text, Input, Button, Box, Image, Center, HStack, Pressable } from 'native-base'
import Foundation from 'react-native-vector-icons/Foundation';
import { SafeAreaView } from "react-native";

import { selectInfo, readUserAsync, updateUserAsync } from "../redux/accountSlice";
import Background from "../components/Background";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const EditScreen = () => {
    const info = useSelector(selectInfo);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [modalVisible, setModalVisible] = useState(false)
    const [index, setIndex] = useState(0);
    const [avatar, setAvatar] = useState();

    const dispatch = useDispatch();

    const { colorMode } = useColorMode();
    const formLabelStyle = {
        color: colorMode == "dark" ? "#F2F1F1" : "#124C7B",
        fontSize: "12"
    };
    const focusInputStyle = {
         borderColor: colorMode == "dark" ? "#F2F1F1" : "#124C7B",
    }

    const onUpdate = () => {
        dispatch(updateUserAsync({ name, email, avatar }));
    }

    useEffect(() => {
        dispatch(readUserAsync());
    }, [])

    useEffect(() => {
        setName(info.name)
        setEmail(info.email)
        setAvatar(info.avatar)
    }, [info]);

    return (
        <SafeAreaView style={{backgroundColor: colorMode == 'dark'? "#181B2A": "#ffffff", flex: 1}}>
            <Background />
            <Center mt={100}>
                <Box mt={7}>
                        <Modal 
                            visible={modalVisible}
                            transparent={true}
                        >
                            <Center flex={1} background="#000000E6">
                                <Text color="#FFF8E8"
                                    fontSize={20}
                                    letterSpacing={0.2} mb={10}
                                >
                                選擇頭像</Text>
                                <HStack>
                                    <Pressable
                                        p={2}
                                        onPress={() => {
                                            setIndex(1);
                                            setAvatar("https://github.com/hsiang2/movie_image/blob/main/avatar-rat.png?raw=true")
                                        }}
                                    >
                                        <Image 
                                            w={90} h={90} mb={4} borderRadius={50} mx={1}
                                            borderWidth={index === 1? 3: 0}
                                            borderColor="#FFF8E8" 
                                            source={{uri: "https://github.com/hsiang2/movie_image/blob/main/avatar-rat.png?raw=true"}}
                                            alt="rat"
                                        />
                                    </Pressable>
                                    <Pressable
                                        p={2}
                                        onPress={() => {
                                            setIndex(2);
                                            setAvatar("https://github.com/hsiang2/movie_image/blob/main/avatar-sealion.png?raw=true")
                                        }}
                                    >
                                        <Image 
                                            w={90} h={90} mb={4} borderRadius={50} mx={1}
                                            borderWidth={index === 2? 3: 0}
                                            borderColor="#FFF8E8"
                                            source={{uri: "https://github.com/hsiang2/movie_image/blob/main/avatar-sealion.png?raw=true"}}
                                            alt="sealion"
                                        />
                                    </Pressable>
                                </HStack>
                                <HStack>
                                    <Pressable
                                        p={2}
                                        onPress={() => {
                                            setIndex(3);
                                            setAvatar("https://github.com/hsiang2/movie_image/blob/main/avatar-dolphin.png?raw=true")
                                        }}
                                    >
                                        <Image 
                                            w={90} h={90} mb={4} borderRadius={50} mx={1}
                                            borderWidth={index === 3? 3: 0}
                                            borderColor="#FFF8E8"
                                            source={{uri: "https://github.com/hsiang2/movie_image/blob/main/avatar-dolphin.png?raw=true"}}
                                            alt="dolphin"
                                        />
                                    </Pressable>
                                    <Pressable
                                        p={2}
                                        onPress={() => {
                                            setIndex(4);
                                            setAvatar("https://github.com/hsiang2/movie_image/blob/main/avatar-shepherd.png?raw=true")
                                        }}
                                    >
                                        <Image 
                                            w={90} h={90} mb={4} borderRadius={50} mx={1}
                                            borderWidth={index === 4? 3: 0}
                                            borderColor="#FFF8E8"
                                            source={{uri: "https://github.com/hsiang2/movie_image/blob/main/avatar-shepherd.png?raw=true"}}
                                            alt="dolphin"
                                        />
                                    </Pressable>
                                    
                                </HStack>
                                <Button
                                    mt={10} h={60} w={200}
                                    _text={{color: "#445B6C", fontSize: "12"}} 
                                    bgColor="#FFDA7B"
                                    onPress={() => setModalVisible(!modalVisible)}
                                >完成</Button>
                            </Center>
                            
                        </Modal>
                        <Image 
                            w={108} h={108} borderRadius={50}
                            source={{uri: avatar}}
                            alt="avatar"
                        />
                        <Pressable 
                            borderRadius={50}  _dark={{backgroundColor: "#FFF8E8"}}
                            _light={{backgroundColor: "#445B6C"}}
                            position="absolute" right= '1' bottom= '0'
                            w={25} h={25} justifyContent="center" alignItems="center"
                            onPress={() => {
                                setModalVisible(true);
                            }}
                        >
                            <Foundation 
                                name="pencil" color= {colorMode == "dark"? "#445B6C": "#FFF8E8"}
                                size={15}
                            />
                        </Pressable>
                    </Box>
                <VStack space={2} mt={16} width="80%" alignSelf="center">
                    <FormControl mb={5}>
                    <FormControl.Label _text={formLabelStyle}>
                        使用者名稱
                    </FormControl.Label>
                    <Input
                        variant="underlined" _focus={focusInputStyle} value={name}
                        onChangeText={text => setName(text)}
                    />
                    </FormControl>
                    <FormControl mb={5}>
                    <FormControl.Label _text={formLabelStyle}>
                        備用信箱
                    </FormControl.Label>
                    <Input
                        variant="underlined" _focus={focusInputStyle} value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    </FormControl>

                    <Button _text={{color: "#445B6C", fontSize: "12"}} 
                        w={314} h={60} mt={44}
                        bgColor="#FFDA7B"
                        onPress={onUpdate}
                    >
                    更新
                    </Button>
                </VStack>
            </Center>
            
        </SafeAreaView>

    );
}

export default EditScreen;