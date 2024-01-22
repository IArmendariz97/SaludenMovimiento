import React, { useState } from "react";

function Post({ post, onCommentSubmit }) {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() !== "") {
      // Llama a la acción para agregar el comentario al post
      await onCommentSubmit({ idPost: post.idPost, comment });
      setComment("");
    }
  };

  return (
    <div className="bg-white p-4 my-4 shadow-md rounded-md">
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-4">{post.content}</p>

      <form onSubmit={handleCommentSubmit} className="mb-4">
        <label className="block mb-2">
          <span className="text-gray-700">Comentario:</span>
          <input
            className="border border-gray-300 p-2 w-full"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          type="submit"
        >
          Comentar
        </button>
      </form>

      {post.Comments && post.Comments.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold mb-2">Comentarios:</h4>
          <ul className="list-disc pl-6">
            {post.Comments.map((comment) => (
              <li key={comment.idComment} className="mb-2">
                {comment.content}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Post;
