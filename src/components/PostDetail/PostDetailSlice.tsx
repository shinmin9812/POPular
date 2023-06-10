import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/comment';

interface initialStateType {
  comment: Comment[];
}

const initialState: initialStateType = {
  comment: [],
};

const PostDetailSlice = createSlice({
  name: 'PostDetail',
  initialState,
  reducers: {
    setComment(state, action: PayloadAction<Comment[]>) {
      state.comment = action.payload;
    },
    addComment(state, action: PayloadAction<Comment>) {
      state.comment = [...state.comment, action.payload];
    },
  },
});

const PostDetailActions = PostDetailSlice.actions;
export { PostDetailActions };
export default PostDetailSlice.reducer;
