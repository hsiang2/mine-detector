import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, register, readUser, updateUser } from "../api/firebase";

const loginAsync = createAsyncThunk(
    'account/login',
    async ({ email, password }, { rejectWithValue } ) => {
       try {
          const user = await login({ email, password });
          // The value we return becomes the `fulfilled` action payload
          return user;
       } catch (err) {
          // The value we return becomes the `rejected` action payload
          return rejectWithValue(err)
       }
    }
 );

 const registerAsync = createAsyncThunk(
    'account/register',
    async ({ name, email, password, avatar }, { rejectWithValue }) => {
       try {
          const { data } = await register({ name, email, password, avatar });
          // The value we return becomes the `fulfilled` action payload
          return data; 
       } catch (err) {
          // The value we return becomes the `rejected` action payload
          return rejectWithValue(err)
       } 
    }
 );

 const readUserAsync = createAsyncThunk(
    'account/readUser',
    async () => {
       return await readUser();
    }
 );
 
 const updateUserAsync = createAsyncThunk(
    'account/updateUser',
    async (userInfo) => {
       return await updateUser(userInfo);
    }
 );

const initialState = {
    info: {
        name: "",
        email: "",
        //password: "",
        avatar: ""
    },
    login: {
        hasLogin: false,
        hasAccount: true
    },
    watchlist: [],
    status: 'idle',
    errMsg: '',
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccountInfo: (state, action) => {
            state.info= action.payload;
        },
        // login: (state) => {
        //     state.login.hasLogin = true;
        // },
        signOut: (state) => {
            logout();
            state.login.hasLogin = false;
         },
        // logout: (state) => {
        //     state.login.hasLogin = false;
        // },
        gotoRegister: (state) => {
            state.login.hasAccount = false;
        },
        gotoLogin: (state) => {
            state.login.hasAccount = true;
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
    },
    extraReducers: (builder) => {
        builder
           .addCase(loginAsync.pending, (state) => {
              state.status = 'loading';
              state.errMsg = '';
           })
           .addCase(loginAsync.fulfilled, (state, action) => {
              console.log('in extraReducer fulfilled payload ...')
              console.log(action.payload);
              state.status = 'idle';
              state.login.hasLogin = true;
           })
           .addCase(loginAsync.rejected, (state, action) => {
              state.status = 'error';
              state.login.hasLogin = false;
              state.errMsg = String(action.payload).slice(15);
           })
           .addCase(registerAsync.pending, (state) => {
              state.status = 'loading';
              state.errMsg = '';
           })
           .addCase(registerAsync.fulfilled, (state, action) => {
              state.status = 'idle';
              state.login.hasLogin = true;
           })
           .addCase(registerAsync.rejected, (state, action) => {
              state.status = 'error';
              state.login.hasLogin = false;
              state.errMsg = String(action.payload).slice(15);
           })
           .addCase(readUserAsync.fulfilled, (state, action) => {
              state.status = 'idle';
              state.info = { ...state.info, ...action.payload};
           })
           .addCase(updateUserAsync.fulfilled, (state, action) => {
              state.status = 'idle';
              state.info = { ...state.info, ...action.payload};
           })
     },
});

export const selectInfo = (state) => state.account.info;
export const selectLogin = (state) => state.account.login;
export const selectWatchlist = (state) => state.account.watchlist;

export const selectErrorMsg = (state) => state.account.errMsg;
export const selectStatus = (state) => state.account.status;

export const { gotoRegister, gotoLogin, setAccountInfo, signOut, /*login, logout,*/ addWatchlist, removeWatchlist,setWatchlist } = accountSlice.actions;

export { loginAsync, registerAsync, readUserAsync, updateUserAsync }

export default accountSlice.reducer;