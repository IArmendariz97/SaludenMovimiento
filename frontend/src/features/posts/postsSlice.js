// postsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (token) => {
    return postService.getPosts(token);
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (commentId) => {
    const userString = localStorage.getItem("User");
    const user = JSON.parse(userString);
    const token = user.token;
    console.log(commentId, "commentId");
    return postService.deleteComment(commentId, token);
  }
);

export const addOrUpdatePost = createAsyncThunk(
  "posts/addOrUpdatePost",
  async (post) => {
    if (post.idPost) {
      return postService.editPost(post.idPost, post);
    } else {
      return postService.addPost(post);
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (idPost) => {
    const userString = localStorage.getItem("User");

    const user = JSON.parse(userString);
    const token = user.token;
    await postService.deletePost(idPost, token);
    return idPost;
  }
);

export const addCommentToPost = createAsyncThunk(
  "posts/addCommentToPost",
  async ({ idPost, comment, idClient }) => {
    const userString = localStorage.getItem("User");

    const user = JSON.parse(userString);
    const token = user.token;
    const updatedPost = await postService.addCommentToPost(
      idPost,
      comment,
      idClient,
      token
    );
    return {
      idPost,
      comment: updatedPost.Comments[updatedPost.Comments.length - 1],
    };
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    comments: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addCommentToPost: (state, action) => {
      const { idPost, comment } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.idPost === idPost);

      if (postIndex !== -1) {
        state.posts[postIndex].Comments.push(comment);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addOrUpdatePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrUpdatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.push(action.payload);
      })
      .addCase(addOrUpdatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCommentToPost.fulfilled, (state, action) => {
        // Esta acción se manejará en el reducer para agregar comentarios localmente
        state.status = "succeeded";
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.filter((post) => post.idPost !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { idPost, commentId } = action.payload;
        const postIndex = state.posts.findIndex((post) => post.idPost === idPost);
        if (postIndex !== -1) {
          state.posts[postIndex].Comments = state.posts[
            postIndex
          ].Comments.filter((comment) => comment.idComment !== commentId);
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addCommentToLocalPost } = postsSlice.actions;
