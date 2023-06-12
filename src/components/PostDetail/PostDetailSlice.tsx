import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/comment';

interface initialStateType {
  comment: Comment[];
  likes: string[];
  reports: string[];
}

const initialState: initialStateType = {
  comment: [],
  likes: [],
  reports: [],
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
    setLikes(state, action: PayloadAction<string[]>) {
      state.likes = action.payload;
    },
    setReports(state, action: PayloadAction<string[]>) {
      state.reports = action.payload;
    },
  },
});

const PostDetailActions = PostDetailSlice.actions;
export { PostDetailActions };
export default PostDetailSlice.reducer;
