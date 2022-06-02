import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    info: {
        name: "",
        email: "",
        password: "",
        avatar: ""
    },
    login: {
        hasLogin: false,
    },
    watchlist: []
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccountInfo: (state, action) => {
            state.info= action.payload;
            // state.info = { ...state.info, ...action.payload};
        },
        login: (state) => {
            state.login.hasLogin = true;
        },
        logout: (state) => {
            state.login.hasLogin = false;
        },
        addWatchlist: (state, action) => {
            const isSaved = (element) => {
                return element.title === action.payload.title;
            }
            if(state.watchlist.find(isSaved) === undefined){
                state.watchlist.push(action.payload);
                //console.log(state.watchlist)
            } else {
                //console.log(state.watchlist)
            }
            // if(state.watchlist.find(element => element.id === action.payload.id) === undefined){
            //     state.watchlist.push(action.payload);
            // }
        },
        removeWatchlist: (state, action) => {
            const isWanted = (element) => {
                return element.title !== action.payload.title;
            }
            state.watchlist = state.watchlist.filter(isWanted);
            //console.log(state.watchlist)
        },
        setWatchlist: (state, action) => {
            state.watchlist = action.payload;
        }
    }
});

export const selectInfo = (state) => state.account.info;
export const selectLogin = (state) => state.account.login.hasLogin;
export const selectWatchlist = (state) => state.account.watchlist;

export const { setAccountInfo, login, logout, addWatchlist, removeWatchlist,setWatchlist } = accountSlice.actions;

export default accountSlice.reducer;