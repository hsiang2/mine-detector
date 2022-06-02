import React, { useEffect, useState } from "react";
import * as firebase from 'firebase/app';
import { createUserWithEmailAndPassword } from "firebase/auth";
//import "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { TextInput, Modal } from "react-native";
import { Center, FormControl, Input, Text, WarningOutlineIcon, Button, Image,Box, Pressable, HStack } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from "react-native-vector-icons/Feather";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from "expo-linear-gradient";

import { addWatchlist, login, setAccountInfo } from "../redux/accountSlice";
import { selectInfo } from "../redux/accountSlice";
import { auth, db } from "../../App";
import Background from "../components/Background";

//console.log(firebase.auth);
// const auth = firebase.auth();
// export {auth}
require('firebase/firestore');

const RegisterScreen = ({ navigation }) => {
    //const info = useSelector(selectInfo);
    //console.log(info.avatar);
    const [hide, setHide] = useState(true);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false)
    const [index, setIndex] = useState(0);

    const [email, setEmail] = useState(null);
    //const [emailIsError, setEmailIsError] = useState(true);
    const [password, setPassword] = useState(null);
    //const [passwordIsError, setPasswordIsError] = useState(true);
    const [name, setName] = useState(null);
    const [avatar, setAvatar] = useState("https://github.com/hsiang2/movie_image/blob/main/avatar-rat.png?raw=true");
    //const [nameIsError, setNameIsError] = useState(true);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    // const onSignUp = async () => {
    //     setError(" ");
    //     try {
    //         await createUserWithEmailAndPassword(getAuth(), email, password);
    //         setEmail("");
    //         setPassword("");
    //         setName("");
    //         setError("");
    //       } catch (err2) {
    //         setError(err2.message);
    //       }
    // };

    const nameRegex = /^[a-zA-Z]+\w*$/;
    const emailRegex = /\w{3,}@[a-zA-Z_]+\.[a-zA-Z]{2,5}/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    // /^[a-zA-Z0-9]{8,}$/;

    // useEffect(() => {
    //     if (!nameIsError && !emailIsError && !passwordIsError)
    //         dispatch(setAccountInfo({ name, email, password }))

    //     if (email.match(emailRegex)) setEmailIsError(false)
    //     else setEmailIsError(true);

    //     if (name.match(nameRegex)) setNameIsError(false)
    //     else setNameIsError(true);

    //     if (password.match(passwordRegex)) setPasswordIsError(false)
    //     else setNameIsError(true);

    // }, [name, email, password])
    //const db = getFirestore();

    const onSignUp = async () => {
        setError(" ");
        if (!name) {
            setError("請輸入使用者名稱")
            return;
        }
        
        if (!email || !email.match(emailRegex)) {
            setError("請輸入有效信箱")
            return;
        }
        // else setEmailIsError(true);
            //setNameIsError(false)
        // else setNameIsError(true);

        if (!password || !password.match(passwordRegex)) {
            setError("請輸入至少8碼（包含英文和數字）")
            return;
        }
        setLoading(true);
        //setPasswordIsError(false)
        // else setNameIsError(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((result) => {
                    setDoc(doc(db, "users", auth.currentUser.uid),{
                        name: name,
                        email: email,
                        avatar: avatar, 
                        watchlist: []
                    });
                    // db.collection("users")
                    // .doc(auth.currentUser.uid)
                    // .set({
                    //     name,
                    //     email
                    // })
                })
                .catch((err) => {
                    setLoading(false);
                    setError(err.message);
                })
            dispatch(setAccountInfo({ name, email, password, avatar }))
            setError("");
            setEmail("");
            setPassword("");
            setName("");
            dispatch(login());
        } catch(err){
            setLoading(false);
            setError(err.message);
        } finally {
            setLoading(false);
        }
        
        // setEmail("");
        // setPassword("");
        // setName("");
        // setError("");
    }
    const renderButton = () => {
        return loading ? (
            <Button
                isLoading _loading={{
                    bgColor: "#FFDA7B",
                    w: '314', h:'60', mb:'4'
                }}
                _spinner={{color: "#445B6C"}}
                
            >註冊</Button>
        ) : (
            <Button
                onPress={onSignUp} 
                _text={{color: "#445B6C", fontSize: "12"}} 
                w={314} h={60} mb={4}
                bgColor="#FFDA7B"
            >註冊</Button>
        );
    };
    
    return(
        <Center flex={1} style={{backgroundColor: "#181B2A"}}>
            <Background />
            <Box  mb={58} mt={7}>
                <Modal 
                    visible={modalVisible}
                    transparent={true}
                >
                    <Center flex={1} background="#00000080">
                        <HStack>
                            <Pressable
                                p={2}
                                onPress={() => {
                                    setIndex(1);
                                    setAvatar("https://github.com/hsiang2/movie_image/blob/main/avatar-rat.png?raw=true")
                                }}
                            >
                                <Image 
                                    w={90} h={90} mb={4} borderRadius={50}
                                    borderWidth={index === 1? 1: 0}
                                    borderColor="black" 
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
                                    w={90} h={90} mb={4} borderRadius={50}
                                    borderWidth={index === 2? 1: 0}
                                    borderColor="black"
                                    source={{uri: "https://github.com/hsiang2/movie_image/blob/main/avatar-sealion.png?raw=true"}}
                                    alt="sealion"
                                />
                            </Pressable>
                        </HStack>
                        <Button
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
                    borderRadius={50} bgColor="#FFF8E8"
                    position="absolute" right= '1' bottom= '0'
                    w={25} h={25} justifyContent="center" alignItems="center"
                    onPress={() => {
                        setModalVisible(true);
                    }}
                >
                    <Foundation 
                        name="pencil" color="#445B6C" 
                        size={15}
                    />
                </Pressable>
            </Box>
            <Box alignItems="flex-end">
                <Text fontSize="28" mb="44" color="#FFF8E8" alignSelf="flex-start">
                註冊</Text>
                <LinearGradient
                    colors= {["#BBCEDF30", "#BBCEDF30", "#EAEAEA28", "#C6CED519", "#C8D4DF13"]}
                    start= {{x: 0, y: 0}}
                    end= {{x: 1, y: 0}}
                    locations= {[0, 0, 0.0001, 0.4844, 1]}
                    style={{ 
                        width: 314, height: 60, borderRadius: 5, 
                        borderColor: "#BBCEDF8C", borderWidth: 1, 
                        overflow: "hidden", marginBottom: 24
                    }}
                >
                    <HStack>
                        <AntDesign name="user" size={24} color="#FFF8E8" 
                            style={{ marginLeft: 16, marginRight: 13, alignSelf: "center" }}
                        />
                        <TextInput
                            style={{
                                width: 314, height: 60,
                                color: "#E2E0E0"
                            }}
                            placeholderTextColor="#B9B9B9"
                            value={name} placeholder="使用者名稱"
                            onChangeText={text => setName(text)}
                        />
                    </HStack>
                    
                </LinearGradient>
                <LinearGradient
                    colors= {["#BBCEDF30", "#BBCEDF30", "#EAEAEA28", "#C6CED519", "#C8D4DF13"]}
                    start= {{x: 0, y: 0}}
                        end= {{x: 1, y: 0}}
                        locations= {[0, 0, 0.0001, 0.4844, 1]}
                        style={{ 
                            width: 314, height: 60, borderRadius: 5, 
                            borderColor: "#BBCEDF8C", borderWidth: 1, 
                            overflow: "hidden", marginBottom: 24
                        }}
                    >
                    <HStack>
                        <AntDesign name="mail" size={24} color="#FFF8E8" 
                            style={{ marginLeft: 16, marginRight: 13, alignSelf: "center" }}
                        />
                        <TextInput
                            style={{
                                width: 314, height: 60,
                                color: "#E2E0E0"
                            }}
                            placeholderTextColor="#B9B9B9"
                            value={email} 
                            placeholder="example@email.com"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={text => setEmail(text)}
                        />
                    </HStack>
                </LinearGradient>
                <LinearGradient
                    colors= {["#BBCEDF30", "#BBCEDF30", "#EAEAEA28", "#C6CED519", "#C8D4DF13"]}
                    start= {{x: 0, y: 0}}
                    end= {{x: 1, y: 0}}
                    locations= {[0, 0, 0.0001, 0.4844, 1]}
                    style={{ 
                        width: 314, height: 60, borderRadius: 5, 
                        borderColor: "#BBCEDF8C", borderWidth: 1, 
                        overflow: "hidden", marginBottom: 84
                    }}
                >
                    <HStack>
                        <MaterialCommunityIcons name="lock-outline" size={24} color="#FFF8E8" 
                            style={{ marginLeft: 16, marginRight: 13, alignSelf: "center" }}
                        />
                        <TextInput
                            style={{
                                width: 314, height: 60, color: "#E2E0E0"
                            }}
                            placeholderTextColor="#B9B9B9"
                            placeholder="至少8碼須包含英文及數字"
                            secureTextEntry={hide?true: false}
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={password} 
                            onChangeText={text => setPassword(text)}
                        />
                        <Feather name={hide? "eye": "eye-off"} size={20} color="#B9B9B9" 
                            style={{position:"absolute", top: 20, right: 20}}
                            onPress={() => setHide(!hide)}
                        />
                    </HStack>
                    
                </LinearGradient>
                {renderButton()}
                <Text fontSize={12} color="#E48D8D">{error}</Text>
            </Box>
        </Center>
    )
}

export default RegisterScreen;