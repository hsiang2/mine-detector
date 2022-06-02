import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import * as firebase from 'firebase/app';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Center, FormControl, Input, Text, WarningOutlineIcon, Button, Image, Pressable, HStack, Box } from "native-base";
//import { TextInput, Button, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from "react-native-vector-icons/Feather";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { login, setAccountInfo, setWatchlist } from "../redux/accountSlice";
import { selectInfo } from "../redux/accountSlice";
import { auth, db } from "../../App";
import { async } from "@firebase/util";
import Background from "../components/Background"; 

const LoginScreen = ({ navigation }) => {
    //const info = useSelector(selectInfo);
    
    //const [name, setName] = useState(info.name);
    const [hide, setHide] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    // const onSignIn = async () => {
    //     setError(" ");
    //     try {
    //       await firebase.auth().signInWithEmailAndPassword(email, password);
    //     } catch (err2) {
    //         setError(err2.message);
    //     }
    // };
    // useEffect(() => {
    //     dispatch(setAccountInfo({ email, password }))
    // }, [ email, password])

    const onSignIn = async () => {
        //setLoading(true);
        setError(" ");
        if (!email) {
            setError("請輸入信箱");
            return;
        }
        if (!password) {
            setError("請輸入密碼");
            return;
        }
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then(async (result) => {
                    const docRef = doc(db, "users", auth.currentUser.uid);
                    const docSnap = await getDoc(docRef);
                    if(docSnap.exists()){
                        const name = docSnap.data().name;
                        const avatar = docSnap.data().avatar;
                        const watchlist = docSnap.data().watchlist;
                        dispatch(setAccountInfo({ name, email, password, avatar }));
                        dispatch(setWatchlist(watchlist));
                        //dispatch(setAccountInfo({ name, email, password}));
                    } else {
                        setLoading(false);
                        setError("錯誤");
                    }
                })
                setError("");
                setEmail("");
                setPassword("");
            dispatch(login());
        } catch (err){
            setLoading(false);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const renderButton = () => {
        return loading ? (
            <Button
                isLoading _loading={{
                    bgColor: "#FFDA7B",
                    w: '314', h:'60', mb:'4'
                }}
                _spinner={{color: "#445B6C"}}
                
            >登入</Button>
        ) : (
            <Button
                onPress={onSignIn} 
                _text={{color: "#445B6C", fontSize: "12"}} 
                w={314} h={60} mb={4}
                bgColor="#FFDA7B"
            >登入</Button>
        );
    };

    return(
        <Center flex={1} style={{backgroundColor: "#181B2A"}}>
            <Background />
            <Image 
                w={108} h={108} mb={55} borderRadius={50}
                source={{uri: "https://github.com/hsiang2/movie_image/blob/main/avatar-rat.png?raw=true"}}
                alt="avatar"
            />
            
            <Box alignItems="flex-end">
                <Text fontSize="28" mb="44" color="#FFF8E8" alignSelf="flex-start">
                登入</Text>
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
                        overflow: "hidden"
                    }}>
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
                <Pressable>
                    <Text color="#E2E0E0" fontSize={12} my={8}>忘記密碼？</Text>
                </Pressable>
                {renderButton()}
                {/* <Button
                    onPress={onSignIn}
                >登入</Button> */}
                {/* <Text style={{padding: 10}}>{error}</Text> */}
                <Button
                    _text={{color: "#445B6C", fontSize: "12"}} 
                    w={314} h={60} mb={4}
                    bgColor="#EFEFEF"
                    onPress={() => navigation.navigate("Register")}
                >註冊</Button>
                <Text fontSize={14} color="#E48D8D">{error}</Text>
            </Box>
            
            {/* <TextInput
                labelStyle={{ marginTop: 20 }}
                label="Email"
                placeholder="ntue@dtd.com"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={(email) => setEmail(email)}
            />
            <TextInput
                labelStyle={{ marginTop: 20 }}
                label="Password"
                placeholder="Must have at least 7 characters"
                secureTextEntry
                autoCorrect={false}
                autoCapitalize="none"
                value={password}
                onChangeText={(password) => setPassword(password)}
            />
            <Button
                title="Sign in"
                buttonStyle={{ backgroundColor: "#4AAF4C" }}
                containerStyle={{ padding: 5 }}
                onPress={onSignIn}
            />
            <Text style={{padding: 10}}>{error}</Text>
            <Button
                title="Sign up"
                buttonStyle={{ backgroundColor: "#39579A" }}
                containerStyle={{ padding: 5 }}
                onPress={() => navigation.navigate("Register")}
            /> */}
        </Center>
    )
}

export default LoginScreen;