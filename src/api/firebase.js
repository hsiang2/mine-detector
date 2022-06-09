import { getApps, getApp, initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    onSnapshot
} from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native';


const firebaseConfig = {
    apiKey: "AIzaSyDhfgndWdlbH-uWFplfqeuH2PekoZUZGe0",
    authDomain: "mine-detector-a7f29.firebaseapp.com",
    projectId: "mine-detector-a7f29",
    storageBucket: "mine-detector-a7f29.appspot.com",
    messagingSenderId: "291670315915",
    appId: "1:291670315915:web:7b1aaf61cd1b0c248a558e",
    measurementId: "G-75TEXWR8PH"
  };

const app_length = getApps().length > 0;

const app = app_length ? getApp() : initializeApp(firebaseConfig);

export const auth = app_length ? getAuth(app) : 
    initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

    export const login = async ({ email, password }) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    }

    export const register = async ({name, email, password, avatar}) => {
        try{
            const userCredential = 
                await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                name,
                email,
                avatar,
                watchlist: []
            });
            return user;
        } catch (e) {
            console.log(e)
        }
    }

    export const logout = () => {
        signOut(auth);
      }

    export const readUser = async () => {
        const { uid } = auth.currentUser;

        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                return "No such document!";
            }
        } catch (e) {
            console.log(e);
        }
    }

    export const updateUser = async (userInfo) => {
        const { uid } = auth.currentUser;
        try {
          const docRef = doc(db, "users", uid);
          await setDoc(docRef, userInfo, {merge: true});
          const docSnap = await getDoc(docRef);
          return docSnap.data();
        } catch(e) {
          console.log(e)
        }
      }

    // export const getComment = async ({movie, isSpoiler}) => {
    //     const dispatch = useDispatch();
    //     try {
            
    //         const commentRef = doc(db, "comments", movie);
    //         const commentSnap = await getDoc(commentRef);
    //         /*const unsubscribe = */onSnapshot(commentRef, (doc) => {
    //             if(isSpoiler){
    //                 if(commentSnap.data().spoiler){
                        
    //                     dispatch(setComment(doc.data().spoiler))
    //                 } else { dispatch(setComment([]))}
    //             } else {
                    
    //                 if(commentSnap.data().noSpoiler){
                        
    //                     dispatch(setComment(doc.data().noSpoiler))
    //                 } 
    //                 else{
    //                     dispatch(setComment([]))}
    //             } 
    //         });
    //     } catch (e) {
    //         console.log(e);
    //     }
    //     //unsubscribe();
    // }



  

  