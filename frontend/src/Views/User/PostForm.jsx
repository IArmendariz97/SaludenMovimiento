import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrUpdatePost } from "../../features/posts/postsSlice";

function PostForm({ selectedPost, onSubmit }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(selectedPost ? selectedPost.title : "");
  const [content, setContent] = useState(
    selectedPost ? selectedPost.content : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch de la acción addOrUpdatePost (a través de la acción thunk)
    dispatch(
      addOrUpdatePost({
        id: selectedPost ? selectedpost.idPost : null,
        title,
        content,
      })
    );

    // Limpia el formulario después de agregar o editar
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h2>{selectedPost ? "Editar Publicación" : "Nueva Publicación"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Contenido:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">{selectedPost ? "Editar" : "Agregar"}</button>
      </form>
    </div>
  );
}

export default PostForm;
