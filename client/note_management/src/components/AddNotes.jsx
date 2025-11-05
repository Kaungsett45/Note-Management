import { useState } from "react";
import { API } from "../api/axiosConfig";


const AddNote = ({ fetchNotes, token }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        "/notes",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to add note");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md mb-4"
    >
      <h3 className="text-lg font-bold mb-2">Add New Note</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full rounded mb-2"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full rounded mb-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Note
      </button>
    </form>
  );
};

export default AddNote;