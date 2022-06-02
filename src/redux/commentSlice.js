import { createSlice } from '@reduxjs/toolkit';

const initialState = {commentUpdate: false };

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
      update: (state) => {
        state.commentUpdate = !state.commentUpdate;
        console.log("更新")
      },
      finish: (state) => {
          state.commentUpdate = false;
      }
    },
  });

export const selectComment = (state) => state.comment.commentUpdate;
export const { update, finish } = commentSlice.actions;
export default commentSlice.reducer;