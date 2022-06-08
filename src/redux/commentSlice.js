import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getComment } from '../api/firebase';
// import {readComment, updateComment } from '../api/firebase'


// const readCommentAsync = createAsyncThunk(
//     'account/readComment',
//     async (movie) => {
//        return await readComment(movie);
//     }
//  );
 
//  const updateCommentAsync = createAsyncThunk(
//     'account/updateComment',
//     async (movie, commentInfo) => {
//        return await updateComment(movie, commentInfo);
//     }
//  );

//const initialState = {commentUpdate: false };

const getCommentAsync = createAsyncThunk(
  'comment/getComment',
  async ({movie, isSpoiler}) => {
      
     return await getComment({movie, isSpoiler});
  }
);

const initialState = {
    comment: []
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
      setComment: (state, action) => {

        
          state.comment= action.payload;
      },
    },
    // reducers: {
      // update: (state) => {
      //   state.commentUpdate = !state.commentUpdate;
      //   console.log("更新")
      // },
      // finish: (state) => {
      //     state.commentUpdate = false;
      // }
    // },
    extraReducers: (builder) => {
      builder
         .addCase(getCommentAsync.fulfilled, (state, action) => {
            state.comment = action.payload;
            
         })
   },
  });

  export const selectComment = (state) => state.comment.comment;
  export const { setComment } = commentSlice.actions;
//export const selectComment = (state) => state.comment.commentUpdate;
//export const { update, finish } = commentSlice.actions;
//export { readCommentAsync, updateCommentAsync }
export { getCommentAsync }
export default commentSlice.reducer;