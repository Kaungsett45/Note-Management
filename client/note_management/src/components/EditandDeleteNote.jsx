import { useState } from "react";
import API from "../api/axiosConfig";

const EditandDeleteNote = ({ note, onClose, fetchNotes, token }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await API.put(`/notes/${note._id}`, 
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchNotes();
      onClose();
    } catch (err) {
      console.error("Failed to update note:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    
    try {
      await API.delete(`/notes/${note._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotes();
      onClose();
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-w-md">
        <h3 className="text-lg font-medium mb-4">Edit Note</h3>
        
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-2 border rounded mb-3"
            required
          />
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="w-full p-2 border rounded h-32 mb-4"
            required
          />
          
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Update"}
            </button>
            
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
            
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditandDeleteNote;