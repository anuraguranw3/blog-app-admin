import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const CreatePost = ({ setMessage }) => {
  const [postForm, setPostForm] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handlePostFormChange = (e) => {
    setPostForm({ ...postForm, [e.target.name]: e.target.value });
  };

  const handlePostFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/admin/posts`, postForm, {
        withCredentials: true,
      });
      setMessage(response.data.message);
      setPostForm({
        title: "",
        description: "",
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      setMessage("Failed to create post");
    }
  };

  return (
    <div>
      <form onSubmit={handlePostFormSubmit}>
        <h3>Create Post</h3>
        <label htmlFor="title">Title</label>
        <input
          onChange={(handlePostFormChange)}
          type="text"
          name="title"
          id="title"
          placeholder="Enter title for the post"
          required
        />
        <label htmlFor="description">Description</label>
        <input
          onChange={(handlePostFormChange)}
          type="text"
          name="description"
          id="description"
          placeholder="Enter description of the post"
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;