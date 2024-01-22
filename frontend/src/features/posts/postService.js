import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/posts";
const user = JSON.parse(localStorage.getItem("User"));

const postService = {
  getPosts: async (token) => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  addCommentToPost: async (idPost, comment, idClient, token) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/comments/${idPost}`,
        {
          content: comment,
          userId: idClient,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  },
  deleteComment: async (commentId, token) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  },
  deletePost: async (idPost, token) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/posts/${idPost}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  },

  addPost: async (newPost, token) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/posts",
        {
          ...newPost,
          userId: user.user,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding post:", error);
      throw error;
    }
  },

  editPost: async (idPost, updatedPost) => {
    try {
      const response = await axios.patch(`${API_URL}/${idPost}`, updatedPost);
      return response.data;
    } catch (error) {
      console.error("Error editing post:", error);
      throw error;
    }
  },
};

export default postService;
