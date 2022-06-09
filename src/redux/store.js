import thunk from "redux-thunk";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accountSlice';
import sliderReducer from './sliderSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

export const store = configureStore({
    reducer: {
        account: accountReducer,
        slider: sliderReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

persistStore(store);
